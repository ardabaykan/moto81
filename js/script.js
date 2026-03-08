/**
 * ABMOTOPARTS - Premium Motorcycle E-Commerce App
 * Version 3.2.0 - Data safety and accessibility improvements
 */
'use strict';

const CONFIG = {
    CART_KEY: 'moto81_cart_v3',
    DEBOUNCE_DELAY: 300,
    MAX_QUANTITY: 999
};

const CATEGORY_ORDER = ['nmax', 'pcx', 'xmax'];

const state = {
    currentCategory: 'all',
    searchQuery: '',
    isMobileCartOpen: false,
    lastFocusedElement: null
};

let PRODUCTS = [];
let cart = [];

const DOM = {
    productGrid: document.getElementById('productGrid'),
    cartCount: document.getElementById('cartCount'),
    cartItems: document.getElementById('cartItems'),
    cartTotal: document.getElementById('cartTotal'),
    cartToggle: document.getElementById('cartToggle'),
    mobileCart: document.getElementById('mobileCart'),
    mobileCartBackdrop: document.getElementById('mobileCartBackdrop'),
    mobileCartClose: document.getElementById('mobileCartClose'),
    mobileCartContent: document.getElementById('mobileCartContent'),
    mobileCheckoutBtn: document.getElementById('mobileCheckoutBtn'),
    searchInput: document.getElementById('searchInput'),
    categoryLinks: document.querySelectorAll('[data-category]'),
    navCategoryLinks: document.querySelectorAll('.nav-link[data-category]'),
    navbarToggler: document.getElementById('mobileMenuToggler'),
    navbarCollapse: document.getElementById('navbarNavAltMarkup'),
    heroCTA: document.getElementById('heroCTA')
};

const isValidPrice = (price) => typeof price === 'number' && Number.isFinite(price) && price > 0;

const formatCurrency = (amount) => {
    if (!isValidPrice(amount)) return '0,00 ₺';
    return amount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';
};

const calculateDiscountedPrice = (price, percentage) => {
    if (!isValidPrice(price) || !Number.isFinite(percentage) || percentage <= 0) return price;
    return Math.max(price * (1 - percentage / 100), 0);
};

const getCurrentPrice = (product) => {
    if (!product.hasPrice) return null;

    return product.isDiscounted && product.discountPercentage > 0
        ? calculateDiscountedPrice(product.price, product.discountPercentage)
        : product.price;
};

const debounce = (func, wait) => {
    let timeout;

    return function debounced(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

const escapeHtml = (value) => {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};

const normalizeProduct = (product) => {
    const rawPrice = Number(product.price);
    const hasPrice = isValidPrice(rawPrice);
    const rawDiscount = Number(product.discountPercentage);
    const discountPercentage = Number.isFinite(rawDiscount) ? Math.max(0, Math.min(rawDiscount, 99)) : 0;

    return {
        ...product,
        id: Number(product.id),
        name: String(product.name ?? '').trim(),
        brand: String(product.brand ?? ''),
        category: String(product.category ?? 'other').toLowerCase(),
        img: String(product.img ?? ''),
        price: hasPrice ? rawPrice : null,
        hasPrice,
        isDiscounted: Boolean(product.isDiscounted) && hasPrice && discountPercentage > 0,
        discountPercentage,
        outOfStock: Boolean(product.outOfStock)
    };
};

const sanitizeProducts = (rawProducts) => {
    if (!Array.isArray(rawProducts)) return [];

    return rawProducts
        .map(normalizeProduct)
        .filter((product) => Number.isInteger(product.id) && product.id > 0 && product.name.length > 0);
};

const loadProducts = async () => {
    try {
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        PRODUCTS = sanitizeProducts(data);
        return PRODUCTS;
    } catch (error) {
        console.error('Urunler yuklenirken hata olustu:', error);
        PRODUCTS = [];
        return PRODUCTS;
    }
};

const sortCategoryKeys = (left, right) => {
    const leftIndex = CATEGORY_ORDER.indexOf(left);
    const rightIndex = CATEGORY_ORDER.indexOf(right);
    const safeLeftIndex = leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex;
    const safeRightIndex = rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex;

    if (safeLeftIndex !== safeRightIndex) return safeLeftIndex - safeRightIndex;

    return left.localeCompare(right, 'tr');
};

const getCategoryLabel = (category) => {
    const categoryLabels = {
        nmax: 'NMAX',
        pcx: 'PCX',
        xmax: 'XMAX'
    };

    return categoryLabels[category] || category.toUpperCase();
};

const createCategorySeparator = (category) => {
    const separator = document.createElement('div');
    separator.className = 'col-span-full my-6 flex items-center gap-4';
    separator.innerHTML = `
        <div class="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#ff6b35] to-transparent"></div>
        <span class="text-[1.25rem] font-black text-gray-900 tracking-[0.15em] uppercase">${escapeHtml(getCategoryLabel(category))}</span>
        <div class="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#ff6b35] to-transparent"></div>
    `;

    return separator;
};

const createProductCard = (product) => {
    const price = getCurrentPrice(product);
    const imageSrc = encodeURI(product.img);
    const canBePurchased = product.hasPrice && !product.outOfStock;

    let priceHtml = '';
    if (!product.hasPrice) {
        priceHtml = '<p class="text-[0.85rem] lg:text-[1rem] font-semibold text-gray-500 m-0">Fiyat icin iletisime gecin</p>';
    } else if (product.isDiscounted) {
        priceHtml = `
            <p class="text-[0.7rem] lg:text-[0.85rem] line-through text-gray-400 font-bold mb-1 m-0">${formatCurrency(product.price)}</p>
            <p class="text-[1rem] lg:text-[1.25rem] font-extrabold text-accent m-0">${formatCurrency(price)}</p>
        `;
    } else {
        priceHtml = `<p class="text-[1rem] lg:text-[1.25rem] font-extrabold text-accent m-0">${formatCurrency(product.price)}</p>`;
    }

    const el = document.createElement('div');
    el.className = 'bg-white h-full flex flex-col justify-between rounded-[0.75rem] lg:rounded-[1rem] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] hover:border-transparent group';

    el.innerHTML = `
        <div class="aspect-square bg-white flex items-center justify-center p-4 lg:p-6 relative overflow-hidden ${product.outOfStock ? 'opacity-50' : ''}">
            <img src="${imageSrc}" alt="${escapeHtml(product.name)}" class="max-w-[85%] max-h-[85%] object-contain transition-transform duration-500 group-hover:scale-[1.08] group-hover:rotate-[2deg]" loading="lazy">
            ${product.outOfStock ? '<div class="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full text-[0.75rem] font-bold z-10 shadow-md">TUKENDI</div>' : ''}
            ${!product.outOfStock && product.isDiscounted ? `<div class="absolute top-4 right-4 bg-accent-gradient text-white px-3 py-1 rounded-full text-[0.75rem] font-extrabold z-10 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">-%${product.discountPercentage}</div>` : ''}
        </div>
        <div class="p-3 lg:p-5 flex-1 flex flex-col justify-between">
            <div>
                <h5 class="text-[0.85rem] lg:text-[1rem] font-bold text-gray-900 mb-1 line-clamp-2 min-h-[2.6em]">${escapeHtml(product.name)}</h5>
                <p class="text-[0.7rem] lg:text-[0.85rem] text-gray-500 mb-2">${escapeHtml(product.brand)}</p>
            </div>
            <div>${priceHtml}</div>
        </div>
        <div class="px-3 pb-3 lg:px-5 lg:pb-5">
            ${!product.hasPrice ? `
            <a href="https://wa.me/905312672081?text=Merhaba%2C%20${encodeURIComponent(product.name)}%20%C3%BCr%C3%BCn%C3%BC%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum" 
               target="_blank" 
               rel="noopener noreferrer"
               class="w-full p-2 lg:p-3 bg-gray-900 text-white rounded-[0.5rem] lg:rounded-[0.75rem] text-[0.75rem] lg:text-[1rem] font-bold transition-colors hover:bg-[#ff6b35] flex items-center justify-center gap-2 cursor-pointer border-none text-center no-underline"
               type="button">
                Fiyat sorunuz
            </a>
            ` : `
            <button class="add-to-cart-btn w-full p-2 lg:p-3 bg-gray-900 text-white rounded-[0.5rem] lg:rounded-[0.75rem] text-[0.75rem] lg:text-[1rem] font-bold transition-colors hover:bg-[#ff6b35] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-none"
                    type="button"
                    data-id="${product.id}"
                    ${product.outOfStock ? 'disabled' : ''}>
                ${product.outOfStock ? 'Stokta yok' : 'Sepete ekle'}
            </button>
            `}
        </div>
    `;

    return el;
};

const renderProducts = (products) => {
    if (!DOM.productGrid) return;

    DOM.productGrid.innerHTML = '';

    if (!Array.isArray(products) || products.length === 0) {
        DOM.productGrid.innerHTML = '<div class="col-span-full text-center py-12 text-gray-500 font-medium">Urun bulunamadi.</div>';
        return;
    }

    const groupedProducts = products.reduce((accumulator, product) => {
        if (!accumulator[product.category]) {
            accumulator[product.category] = [];
        }

        accumulator[product.category].push(product);
        return accumulator;
    }, {});

    const sortedCategories = Object.keys(groupedProducts).sort(sortCategoryKeys);

    sortedCategories.forEach((category) => {
        DOM.productGrid.appendChild(createCategorySeparator(category));
        groupedProducts[category].forEach((product) => {
            DOM.productGrid.appendChild(createProductCard(product));
        });
    });
};

const getVisibleProducts = () => {
    const query = state.searchQuery.trim().toLowerCase();

    return PRODUCTS.filter((product) => {
        const categoryMatch = state.currentCategory === 'all' || product.category === state.currentCategory;
        const searchMatch = query.length === 0
            || product.name.toLowerCase().includes(query)
            || product.brand.toLowerCase().includes(query)
            || product.category.toLowerCase().includes(query);

        return categoryMatch && searchMatch;
    });
};

const updateProductView = () => {
    renderProducts(getVisibleProducts());
};

const setActiveCategoryInNav = (category) => {
    DOM.navCategoryLinks.forEach((link) => {
        const isActive = link.dataset.category === category;
        link.classList.toggle('active', isActive);
    });
};

const syncBodyScrollLock = () => {
    const mobileMenuOpen = Boolean(DOM.navbarCollapse && DOM.navbarCollapse.classList.contains('show'));
    const shouldLockBody = mobileMenuOpen || state.isMobileCartOpen;

    document.body.style.overflow = shouldLockBody ? 'hidden' : '';
};

const closeMobileMenu = () => {
    if (!DOM.navbarCollapse || !DOM.navbarToggler) return;

    DOM.navbarCollapse.classList.remove('show');
    DOM.navbarToggler.classList.remove('menu-open');
    DOM.navbarToggler.setAttribute('aria-expanded', 'false');
    syncBodyScrollLock();
};

const toggleMobileMenu = () => {
    if (!DOM.navbarCollapse || !DOM.navbarToggler) return;

    const isOpen = DOM.navbarCollapse.classList.toggle('show');
    DOM.navbarToggler.classList.toggle('menu-open', isOpen);
    DOM.navbarToggler.setAttribute('aria-expanded', String(isOpen));
    syncBodyScrollLock();
};

const migrateLegacyCartStorage = () => {
    try {
        const modernCartValue = localStorage.getItem(CONFIG.CART_KEY);
        if (modernCartValue !== null) return;

        const legacyCartValue = localStorage.getItem('cart');
        if (legacyCartValue !== null) {
            localStorage.setItem(CONFIG.CART_KEY, legacyCartValue);
            localStorage.removeItem('cart');
        }
    } catch (error) {
        console.warn('Sepet migrasyonu yapilamadi:', error);
    }
};

const loadCart = () => {
    try {
        const rawCart = JSON.parse(localStorage.getItem(CONFIG.CART_KEY) || '[]');
        if (!Array.isArray(rawCart)) return [];

        return rawCart
            .map((item) => {
                const id = Number(item.id);
                const quantity = Number(item.quantity);
                const price = Number(item.price);

                if (!Number.isInteger(id) || id <= 0) return null;
                if (!isValidPrice(price)) return null;

                return {
                    id,
                    name: String(item.name ?? '').trim(),
                    price,
                    image: String(item.image ?? ''),
                    quantity: Number.isInteger(quantity)
                        ? Math.max(1, Math.min(quantity, CONFIG.MAX_QUANTITY))
                        : 1,
                    hasPrice: isValidPrice(price)
                };
            })
            .filter(Boolean);
    } catch (error) {
        console.warn('Sepet verisi okunamadi, sifirlandi:', error);
        return [];
    }
};

const saveCart = () => {
    localStorage.setItem(CONFIG.CART_KEY, JSON.stringify(cart));
};

const updateCartCount = () => {
    if (!DOM.cartCount) return;

    DOM.cartCount.textContent = String(cart.reduce((sum, item) => sum + item.quantity, 0));
};

const renderCart = () => {
    if (!DOM.cartItems || !DOM.cartTotal) return;

    if (cart.length === 0) {
        DOM.cartItems.innerHTML = '<p class="text-gray-500 mb-0">Sepetiniz bos</p>';
        DOM.cartTotal.textContent = '0,00';
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach((item) => {
        if (!isValidPrice(item.price)) return;

        const lineTotal = item.price * item.quantity;
        total += lineTotal;

        html += `
            <div class="flex gap-[15px] py-[15px] border-b border-[#f0f0f0] items-center">
                <img src="${encodeURI(item.image)}" alt="${escapeHtml(item.name)}" class="w-[60px] h-[60px] object-cover rounded-[8px]">
                <div class="flex-1">
                    <h4 class="m-0 mb-[5px] text-[14px] font-bold text-gray-900">${escapeHtml(item.name)}</h4>
                    <p class="m-0 text-[#ff6b00] font-bold">${formatCurrency(item.price)}</p>
                </div>
                <div class="flex items-center gap-2">
                    <button type="button" data-cart-action="decrease" data-id="${item.id}" class="w-8 h-8 rounded-full bg-gray-200 border-none cursor-pointer text-gray-700 font-bold hover:bg-gray-300">-</button>
                    <span class="font-bold text-gray-900 min-w-[20px] text-center">${item.quantity}</span>
                    <button type="button" data-cart-action="increase" data-id="${item.id}" class="w-8 h-8 rounded-full bg-gray-200 border-none cursor-pointer text-gray-700 font-bold hover:bg-gray-300">+</button>
                </div>
            </div>
        `;
    });

    DOM.cartItems.innerHTML = html;
    DOM.cartTotal.textContent = formatCurrency(total).replace(' ₺', '');
};

const increaseQuantity = (id) => {
    const item = cart.find((entry) => entry.id === id);
    if (!item) return;

    item.quantity = Math.min(item.quantity + 1, CONFIG.MAX_QUANTITY);
    saveCart();
    updateCartCount();
    renderCart();
};

const decreaseQuantity = (id) => {
    const index = cart.findIndex((entry) => entry.id === id);
    if (index === -1) return;

    cart[index].quantity -= 1;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    updateCartCount();
    renderCart();
};

const animateCartButton = () => {
    if (!DOM.cartToggle) return;

    DOM.cartToggle.classList.remove('bounce');
    void DOM.cartToggle.offsetWidth;
    DOM.cartToggle.classList.add('bounce');

    setTimeout(() => {
        DOM.cartToggle.classList.remove('bounce');
    }, 500);
};

const addToCart = (product) => {
    if (!product || !isValidPrice(product.price)) return;

    const existingItem = cart.find((entry) => entry.id === product.id);

    if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + 1, CONFIG.MAX_QUANTITY);
        existingItem.hasPrice = true;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            hasPrice: true
        });
    }

    saveCart();
    updateCartCount();
    animateCartButton();

    if (state.isMobileCartOpen) {
        renderCart();
    }
};

const openCart = () => {
    if (!DOM.mobileCart) return;

    state.lastFocusedElement = document.activeElement;
    state.isMobileCartOpen = true;
    DOM.mobileCart.classList.add('open');
    renderCart();
    syncBodyScrollLock();

    if (DOM.mobileCartClose) {
        DOM.mobileCartClose.focus();
    }
};

const closeCart = () => {
    if (!DOM.mobileCart) return;

    state.isMobileCartOpen = false;
    DOM.mobileCart.classList.remove('open');
    syncBodyScrollLock();

    if (state.lastFocusedElement && typeof state.lastFocusedElement.focus === 'function') {
        state.lastFocusedElement.focus();
    }
};

const trapCartFocus = (event) => {
    if (!state.isMobileCartOpen || event.key !== 'Tab' || !DOM.mobileCart) return;

    const focusableElements = DOM.mobileCart.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
    }
};

const handleGlobalKeydown = (event) => {
    if (event.key === 'Escape') {
        if (state.isMobileCartOpen) {
            closeCart();
            return;
        }

        if (DOM.navbarCollapse && DOM.navbarCollapse.classList.contains('show')) {
            closeMobileMenu();
            return;
        }
    }

    trapCartFocus(event);
};

const goToPayment = () => {
    window.location.href = 'odeme.html';
};

const handleCategoryLinkClick = (event) => {
    event.preventDefault();

    const selectedCategory = event.currentTarget.dataset.category;
    if (!selectedCategory) return;

    state.currentCategory = selectedCategory;
    setActiveCategoryInNav(selectedCategory);
    updateProductView();

    if (window.innerWidth < 1024) {
        closeMobileMenu();
    }
};

const handleProductGridClick = (event) => {
    const addButton = event.target.closest('.add-to-cart-btn');
    if (!addButton || addButton.disabled) return;

    const productId = Number(addButton.dataset.id);
    const product = PRODUCTS.find((entry) => entry.id === productId);
    if (!product) return;

    addToCart({
        id: product.id,
        name: product.name,
        price: getCurrentPrice(product),
        image: product.img
    });
};

const handleCartItemsClick = (event) => {
    const actionButton = event.target.closest('[data-cart-action]');
    if (!actionButton) return;

    const id = Number(actionButton.dataset.id);
    const action = actionButton.dataset.cartAction;

    if (!Number.isInteger(id) || id <= 0) return;

    if (action === 'increase') {
        increaseQuantity(id);
    } else if (action === 'decrease') {
        decreaseQuantity(id);
    }
};

const bindEventListeners = () => {
    if (DOM.productGrid) {
        DOM.productGrid.addEventListener('click', handleProductGridClick);
    }

    DOM.categoryLinks.forEach((link) => {
        link.addEventListener('click', handleCategoryLinkClick);
    });

    if (DOM.searchInput) {
        DOM.searchInput.addEventListener('input', debounce((event) => {
            state.searchQuery = event.target.value || '';
            updateProductView();
        }, CONFIG.DEBOUNCE_DELAY));
    }

    if (DOM.heroCTA && DOM.productGrid) {
        DOM.heroCTA.addEventListener('click', () => {
            DOM.productGrid.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (DOM.navbarToggler) {
        DOM.navbarToggler.addEventListener('click', toggleMobileMenu);
    }

    if (DOM.navbarCollapse) {
        DOM.navbarCollapse.addEventListener('click', (event) => {
            if (event.target.closest('a')) {
                closeMobileMenu();
            }
        });
    }

    if (DOM.cartToggle) {
        DOM.cartToggle.addEventListener('click', openCart);
    }

    if (DOM.mobileCartBackdrop) {
        DOM.mobileCartBackdrop.addEventListener('click', closeCart);
    }

    if (DOM.mobileCartClose) {
        DOM.mobileCartClose.addEventListener('click', closeCart);
    }

    if (DOM.mobileCheckoutBtn) {
        DOM.mobileCheckoutBtn.addEventListener('click', goToPayment);
    }

    if (DOM.cartItems) {
        DOM.cartItems.addEventListener('click', handleCartItemsClick);
    }

    document.addEventListener('keydown', handleGlobalKeydown);
};

const initializeCart = () => {
    migrateLegacyCartStorage();
    cart = loadCart();
    updateCartCount();
};

const init = async () => {
    initializeCart();
    await loadProducts();
    updateProductView();
    setActiveCategoryInNav(state.currentCategory);
    bindEventListeners();
};

document.addEventListener('DOMContentLoaded', init);

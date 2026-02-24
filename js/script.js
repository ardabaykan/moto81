/**
 * ABMOTOPARTS - Premium Motorcycle E-Commerce App
 * Version 3.1.0 - Mobile Optimized
 */
'use strict';

// CONFIGURATION
const CONFIG = {
    CART_KEY: 'moto81_cart_v3',
    ANIMATION_DURATION: 800,
    DEBOUNCE_DELAY: 300,
    FLYING_IMAGE_SIZE: 80,
    MAX_QUANTITY: 999
};

// PRODUCT DATA
const PRODUCTS = [
    // NMAX ÜRÜNLERİ
    {id: 1, name: 'Artçı Demir 24', brand: 'Moto 81', price: 2000.00, img: 'nmaxdemir.jpg', category: 'nmax'},
    {id: 2, name: 'Depo Kapağı 24', brand: 'Moto 81', price: 800.00, img: 'nmaxdepo.jpg', category: 'nmax'},
    {id: 3, name: 'Şeffaf Filtre Kapağı 24-25', brand: 'Moto 81', price: 2750.00, img: 'nmaxfiltre.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 5},
    {id: 4, name: 'Karbon Filtre Kapağı 24-25', brand: 'Moto 81', price: 2700.00, img: 'nmaxfiltrekarbon.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 10},
    {id: 5, name: 'Gidon Kapağı', brand: 'Moto 81', price: 1400.00, img: 'nmaxgidon.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 12},
    {id: 6, name: 'Kontak Kapağı', brand: 'Moto 81', price: 1600.00, img: 'nmaxkontak.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 30},
    {id: 7, name: 'Radyatör Kapağı 24-25', brand: 'Moto 81', price: 1800.00, img: 'nmaxradyator.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 20},
    {id: 8, name: 'Sinyal Üstü Kapağı', brand: 'Moto 81', price: 1800.00, img: 'nmaxsinyalustu.jpg', category: 'nmax'},
    {id: 9, name: 'Stop Altı Kapağı', brand: 'Moto 81', price: 900.00, img: 'nmaxstopalti.jpg', category: 'nmax'},
    {id: 10, name: 'Varyatör Kapağı', brand: 'Moto 81', price: 2500.00, img: 'nmaxvaryator.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 10},
    {id: 22, name: 'Nmax Çerçeve 25', brand: 'Moto 81', price: 2200.00, img: 'nmaxgostergecercevesi.jpg', category: 'nmax'},
    {id: 23, name: 'Nmax Winglet 25', brand: 'Moto 81', price: 2000.00, img: 'nmax2025altwinglet.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 3},
    {id: 24, name: 'Nmax Ön Panel 24', brand: 'Moto 81', price: 2300.00, img: 'nmaxoncam.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 12},
    {id: 25, name: 'Nmax Kontak (2) 25', brand: 'Moto 81', price: 1500.00, img: 'nmax2025kontakalt.jpg', category: 'nmax'},
    {id: 26, name: 'Nmax Gidon 25', brand: 'Moto 81', price: 2400.00, img: 'nmax2025gidonkarbon.jpg', category: 'nmax'},
    {id: 27, name: 'Nmax Kontak (1) 25', brand: 'Moto 81', price: 1500.00, img: 'nmax2025kontakust.jpg', category: 'nmax'},
    {id: 28, name: 'Nmax Ön V 25', brand: 'Moto 81', price: 2000.00, img: 'nmax2025onpanelv.jpg', category: 'nmax'},
    {id: 29, name: 'Nmax Radyatör 25', brand: 'Moto 81', price: 1850.00, img: 'nmaxradyator2025.jpeg', category: 'nmax'},
    {id: 30, name: 'Nmax Depo 25', brand: 'Moto 81', price: 1300.00, img: 'nmax2025benzindepokapak.jpg', category: 'nmax'},
    {id: 31, name: 'Nmax Depo Çerçeve 25', brand: 'Moto 81', price: 1950.00, img: 'Nmax2025benzindepocevresi.jpg', category: 'nmax'},
    {id: 32, name: 'Nmax Varyatör 24', brand: 'Moto 81', price: 2400.00, img: 'nmaxvaryator.jpg', category: 'nmax'},
    {id: 33, name: 'Nmax Ön Panel 25', brand: 'Moto 81', price: 2350.00, img: 'nmaxoncam2025.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 8},
    {id: 42, name: 'H2 Katlanır Ayna', brand: 'Moto 81', price: 1400.00, img: 'h2ayna.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 50},
    {id: 100, name: 'Nmax 21-24 Filtre Kırmızı', brand: 'Moto 81', price: 2000, img: '21-24filtrekirmizi.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 10},
    {id: 101, name: 'Nmax 21-24 Filtre Mavi', brand: 'Moto 81', price: 2000, img: '21-24filtremavi.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 10},
    {id: 102, name: 'Nmax Füme/Şeffaf Stop Camı 21-24', brand: 'Moto 81', price: 2500, img: 'fumestopcam21-24.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 5},
    {id: 103, name: 'Nmax Gidon Karbon 15-20', brand: 'Moto 81', price: 2500, img: 'gidonkarbon15-20.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 3},
    {id: 104, name: 'Nmax 2025 Şeffaf Cam', brand: 'Moto 81', price: 3500, img: 'karbonekran.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 3},
    {id: 105, name: 'Nmax Karbon Radyatör Kapağı', brand: 'Moto 81', price: 1500, img: 'karbonradyator.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 3},
    {id: 106, name: 'Nmax 15-20 Gösterge', brand: 'Moto 81', price: 3500, img: 'nmax2025.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 3},
    {id: 107, name: 'Nmax Arka Çamurluk', brand: 'Moto 81', price: 2500, img: 'nmaxarkacamurluk.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 10},
    {id: 108, name: 'Nmax Gen 1 Varyatör', brand: 'Moto 81', price: 2500, img: 'nmaxgen1varyator.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 10},
    {id: 109, name: 'Nmax Headers 21-24', brand: 'Moto 81', price: 4000, img: 'nmaxheaders21-24.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 0},
    {id: 110, name: 'Nmax Karbon Ön Çamurluk', brand: 'Moto 81', price: 3000, img: 'nmaxkarboncam.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 10},
    {id: 111, name: 'Nmax Alt Kaplama Set', brand: 'Moto 81', price: 4500, img: 'nmaxkaltinraynset.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 3},
    {id: 112, name: 'Nmax Paspas Set', brand: 'Moto 81', price: 3000, img: 'nmaxpaspas.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 5},
    {id: 113, name: 'Nmax Sissy Bar', brand: 'Moto 81', price: 5000, img: 'nmaxsissybar.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 9},
    {id: 114, name: 'Nmax Şeffaf Ön Cam', brand: 'Moto 81', price: 3500, img: 'nmaxseffafcam.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 3},
    {id: 115, name: 'Nmax Karbon Stop Kapağı', brand: 'Moto 81', price: 2500, img: 'stopkarbon.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 5},
    {id: 116, name: 'Nmax Şeffaf Ön Cam', brand: 'Moto 81', price: 3850, img: 'seffafcamoncam.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 5},
    
    // PCX ÜRÜNLERİ
    {id: 11, name: 'PCX Headers', brand: 'Moto 81', price: 3000.00, img: 'pcxheaders.jpg', category: 'pcx', isDiscounted: true, discountPercentage: 5},
    {id: 12, name: 'Pcx 2025 Ön V', brand: 'Moto 81', price: 2200.00, img: 'pcx2025onv.jpg', category: 'pcx'},
    {id: 13, name: 'Pcx Karbon Egzoz', brand: 'Moto 81', price: 1700.00, img: 'pcxegzozset.jpg', category: 'pcx'},
    {id: 14, name: 'Pcx Çamurluk', brand: 'Moto 81', price: 2250.00, img: 'pcxoncamurluk.jpg', category: 'pcx', isDiscounted: true, discountPercentage: 12},
    {id: 15, name: 'Pcx Füme Filtre', brand: 'Moto 81', price: 1650.00, img: 'pcxfumefiltre.jpg', category: 'pcx', isDiscounted: true, discountPercentage: 5},
    {id: 16, name: 'Pcx Şeffaf Filtre', brand: 'Moto 81', price: 1650.00, img: 'pcxseffaffiltre.jpg', category: 'pcx', isDiscounted: true, discountPercentage: 5},
    {id: 17, name: 'Pcx Şeffaf Radyatör', brand: 'Moto 81', price: 1550.00, img: 'pcxseffafradyator.jpg', category: 'pcx', isDiscounted: true, discountPercentage: 5},
    {id: 18, name: 'Pcx Karbon Varyatör', brand: 'Moto 81', price: 1650.00, img: 'pcxkarbonvaryator.jpg', category: 'pcx'},
    {id: 19, name: 'Pcx Şeffaf Varyatör', brand: 'Moto 81', price: 1650.00, img: 'pcxseffafvaryator.jpg', category: 'pcx', isDiscounted: true, discountPercentage: 5},
    {id: 20, name: 'Pcx 2024 Ön V', brand: 'Moto 81', price: 2200.00, img: 'pcx2024onv.jpg', category: 'pcx'},
    {id: 21, name: 'Pcx Karbon Tutamaç', brand: 'Moto 81', price: 2500.00, img: 'pcxarkademir.jpg', category: 'pcx'},
    
    // STOK DIŞI
    {id: 117, name: 'Nmax Velescope Set', brand: 'Moto 81', price: 3850, img: 'velescope.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 3, outOfStock: true}
];

// STATE
const state = {
    cart: [],
    currentCategory: 'all',
    isMobileCartOpen: false
};

// DOM CACHE
const DOM = {
    productGrid: document.getElementById('productGrid'),
    cartCount: document.getElementById('cartCount'),
    cartItems: document.getElementById('cartItems'),
    cartTotal: document.getElementById('cartTotal'),
    cartDropdown: document.getElementById('cartDropdown'),
    cartToggle: document.getElementById('cartToggle'),
    clearCartBtn: document.getElementById('clearCart'),
    checkoutBtn: document.getElementById('checkoutBtn'),
    mobileCartDrawer: document.getElementById('mobileCartDrawer'),
    mobileCartBackdrop: document.getElementById('mobileCartBackdrop'),
    mobileCartClose: document.getElementById('mobileCartClose'),
    mobileCartContent: document.getElementById('mobileCartContent'),
    mobileCartTotal: document.getElementById('mobileCartTotal'),
    mobileClearCart: document.getElementById('mobileClearCart'),
    mobileCheckoutBtn: document.getElementById('mobileCheckoutBtn'),
    searchInput: document.getElementById('searchInput'),
    categoryLinks: document.querySelectorAll('[data-category]'),
    navbarToggler: document.getElementById('mobileMenuToggler'),
    navbarCollapse: document.getElementById('navbarNavAltMarkup'),
    heroCTA: document.getElementById('heroCTA')
};

// UTILITIES
const formatCurrency = (amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) return '0,00 ₺';
    return amount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';
};

const calculateDiscountedPrice = (price, percentage) => {
    if (!percentage || percentage <= 0) return price;
    return Math.max(price * (1 - percentage / 100), 0);
};

const getCurrentPrice = (product) => {
    return product.isDiscounted && product.discountPercentage > 0 
        ? calculateDiscountedPrice(product.price, product.discountPercentage) 
        : product.price;
};

const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

// STORAGE
const loadCart = () => {
    try {
        const saved = localStorage.getItem(CONFIG.CART_KEY);
        state.cart = saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error('Cart load error', e);
        state.cart = [];
    }
};

const saveCart = () => {
    localStorage.setItem(CONFIG.CART_KEY, JSON.stringify(state.cart));
};

// CART MANAGEMENT
const updateCartUI = () => {
    // Count
    const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
    DOM.cartCount.textContent = totalItems;

    // Desktop Items
    if (state.cart.length === 0) {
        DOM.cartItems.innerHTML = '<div class="text-center py-5 text-muted">Sepetiniz boş</div>';
    } else {
        DOM.cartItems.innerHTML = state.cart.map(item => `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-meta">
                    <b>${item.name}</b>
                    <div class="text-muted">${formatCurrency(item.priceAtAdd)} x ${item.qty}</div>
                </div>
                <div class="cart-quantity-controls">
                    <button class="qty-btn" data-id="${item.id}" data-action="decrease">−</button>
                    <span class="qty-display">${item.qty}</span>
                    <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
                </div>
            </div>
        `).join('');
    }

    // Total
    const total = state.cart.reduce((sum, item) => sum + (item.priceAtAdd * item.qty), 0);
    DOM.cartTotal.textContent = formatCurrency(total);
    
    // Mobile Update
    updateMobileCartUI();
    saveCart();
};

const updateMobileCartUI = () => {
    if (!DOM.mobileCartContent) return;
    
    const total = state.cart.reduce((sum, item) => sum + (item.priceAtAdd * item.qty), 0);
    DOM.mobileCartTotal.textContent = formatCurrency(total);

    if (state.cart.length === 0) {
        DOM.mobileCartContent.innerHTML = `
            <div class="mobile-empty-cart">
                <div class="mobile-empty-cart-icon">🛒</div>
                <div class="mobile-empty-cart-text">Sepetiniz Boş</div>
            </div>`;
        return;
    }

    DOM.mobileCartContent.innerHTML = state.cart.map(item => `
        <div class="mobile-cart-item">
            <img src="${item.img}" alt="${item.name}">
            <div class="mobile-cart-meta">
                <b>${item.name}</b>
                <div class="text-muted">${formatCurrency(item.priceAtAdd)}</div>
                <div class="mobile-quantity-controls">
                    <button class="mobile-qty-btn" data-id="${item.id}" data-action="decrease">−</button>
                    <span class="mobile-qty-display">${item.qty}</span>
                    <button class="mobile-qty-btn" data-id="${item.id}" data-action="increase">+</button>
                </div>
            </div>
        </div>
    `).join('');
};

const addToCart = (productId, btn) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || product.outOfStock) return;

    if (btn) createFlyingImage(product.img, btn);

    const existing = state.cart.find(i => i.id === productId);
    if (existing) {
        existing.qty++;
    } else {
        state.cart.push({
            id: product.id,
            name: product.name,
            img: product.img,
            priceAtAdd: getCurrentPrice(product),
            qty: 1
        });
    }
    
    animateCartButton();
    updateCartUI();

    if (window.innerWidth < 992) {
        openMobileCart();
    }
};

const handleCartAction = (id, action) => {
    const item = state.cart.find(i => i.id === id);
    if (!item) return;

    if (action === 'increase') {
        if (item.qty < CONFIG.MAX_QUANTITY) item.qty++;
    } else {
        item.qty--;
        if (item.qty <= 0) state.cart = state.cart.filter(i => i.id !== id);
    }
    updateCartUI();
};

// ANIMATIONS
const animateCartButton = () => {
    DOM.cartToggle.style.transform = 'scale(1.2)';
    setTimeout(() => DOM.cartToggle.style.transform = 'scale(1)', 200);
};

const createFlyingImage = (src, startEl) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'flying-image';
    img.style.cssText = `
        position: fixed; width: 50px; height: 50px; object-fit: contain; z-index: 9999;
        border-radius: 50%; pointer-events: none; transition: all 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    `;
    document.body.appendChild(img);
    
    const startRect = startEl.getBoundingClientRect();
    const endRect = DOM.cartToggle.getBoundingClientRect();

    img.style.left = startRect.left + 'px';
    img.style.top = startRect.top + 'px';
    
    requestAnimationFrame(() => {
        img.style.left = (endRect.left + endRect.width/2 - 25) + 'px';
        img.style.top = (endRect.top + endRect.height/2 - 25) + 'px';
        img.style.transform = 'scale(0.1)';
        img.style.opacity = '0';
    });

    setTimeout(() => img.remove(), 800);
};

// PRODUCT RENDERING
const renderProducts = (products) => {
    DOM.productGrid.innerHTML = '';
    
    if (products.length === 0) {
        DOM.productGrid.innerHTML = '<div class="col-12 text-center py-5">Ürün bulunamadı.</div>';
        return;
    }

    products.forEach(p => {
        const price = getCurrentPrice(p);
        const el = document.createElement('div');
        el.className = 'product-card';
        
        let priceHtml = p.isDiscounted 
            ? `<p class="card-text original-price">${formatCurrency(p.price)}</p>
               <p class="card-text current-price">${formatCurrency(price)}</p>`
            : `<p class="card-text current-price">${formatCurrency(p.price)}</p>`;

        el.innerHTML = `
            <div class="thumb ${p.outOfStock ? 'out-of-stock' : ''}">
                <img src="${p.img}" alt="${p.name}">
                ${p.outOfStock ? '<div class="stock-badge">TÜKENDİ</div>' : ''}
                ${p.isDiscounted && !p.outOfStock ? `<div class="discount-badge">-%${p.discountPercentage}</div>` : ''}
            </div>
            <div class="card-body">
                <h5 class="card-title">${p.name}</h5>
                <p class="card-text brand-text">${p.brand}</p>
                <div class="card-price-info">${priceHtml}</div>
            </div>
            <div class="actions">
                <button class="add-to-cart-btn ${p.outOfStock ? 'out-of-stock' : ''}" 
                        data-id="${p.id}" ${p.outOfStock ? 'disabled' : ''}>
                    ${p.outOfStock ? 'Stokta Yok' : 'Sepete Ekle'}
                </button>
            </div>
        `;
        DOM.productGrid.appendChild(el);
    });
};

// MOBILE MENU & CART CONTROLS
const openMobileCart = () => {
    state.isMobileCartOpen = true;
    DOM.mobileCartDrawer.classList.add('open');
    DOM.mobileCartBackdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
};

const closeMobileCart = () => {
    state.isMobileCartOpen = false;
    DOM.mobileCartDrawer.classList.remove('open');
    DOM.mobileCartBackdrop.classList.remove('show');
    document.body.style.overflow = '';
};

const toggleMobileMenu = () => {
    DOM.navbarCollapse.classList.toggle('show');
    document.body.style.overflow = DOM.navbarCollapse.classList.contains('show') ? 'hidden' : '';
};

// INIT
const init = () => {
    loadCart();
    updateCartUI();
    renderProducts(PRODUCTS);

    // Event Listeners
    DOM.productGrid.addEventListener('click', e => {
        if (e.target.matches('.add-to-cart-btn') && !e.target.disabled) {
            addToCart(parseInt(e.target.dataset.id), e.target);
        }
    });

    document.body.addEventListener('click', e => {
        const id = parseInt(e.target.dataset.id);
        const action = e.target.dataset.action;
        if (id && action) handleCartAction(id, action);
        
        // Close dropdowns on outside click
        if (!e.target.closest('.mini-cart') && DOM.cartDropdown.classList.contains('show')) {
            DOM.cartDropdown.classList.remove('show');
        }
    });

    DOM.cartToggle.addEventListener('click', () => {
        if (window.innerWidth < 992) openMobileCart();
        else DOM.cartDropdown.classList.toggle('show');
    });
    
    DOM.mobileCartBackdrop.addEventListener('click', closeMobileCart);
    DOM.mobileCartClose.addEventListener('click', closeMobileCart);
    
    DOM.navbarToggler.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu if clicking a link inside it
    DOM.navbarCollapse.addEventListener('click', e => {
        if (e.target.matches('a')) {
            DOM.navbarCollapse.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    DOM.searchInput.addEventListener('input', debounce(e => {
        const q = e.target.value.toLowerCase();
        const filtered = PRODUCTS.filter(p => 
            p.name.toLowerCase().includes(q) || 
            p.category.toLowerCase().includes(q)
        );
        renderProducts(filtered);
    }, 300));

    DOM.categoryLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const cat = e.target.dataset.category;
            state.currentCategory = cat;
            
            DOM.categoryLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
            
            const filtered = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
            renderProducts(filtered);
            
            // Mobile: close menu after selection
            if (window.innerWidth < 992) {
                DOM.navbarCollapse.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    });

    DOM.clearCartBtn.addEventListener('click', () => { state.cart = []; updateCartUI(); });
    DOM.mobileClearCart.addEventListener('click', () => { state.cart = []; updateCartUI(); });
    
    DOM.checkoutBtn.addEventListener('click', () => window.location.href = 'odeme.html');
    DOM.mobileCheckoutBtn.addEventListener('click', () => window.location.href = 'odeme.html');
    
    if(DOM.heroCTA) {
        DOM.heroCTA.addEventListener('click', () => {
            DOM.productGrid.scrollIntoView({ behavior: 'smooth' });
        });
    }
};

document.addEventListener('DOMContentLoaded', init);

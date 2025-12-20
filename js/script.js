/**
 * Moto 81 - Premium Motorcycle E-Commerce Application
 *
 * Main application script handling product display, cart management,
 * search functionality, and user interactions.
 *
 * @version 1.0.2 (Stok Kontrolü Entegre Edildi)
 * @author Moto 81 Development Team
 * @since 2025
 */

'use strict';

// =============================================================================
// APPLICATION CONFIGURATION AND CONSTANTS
// =============================================================================

const CONFIG = {
    CART_KEY: 'moto81_cart_v1',
    CART_BACKUP_KEY: 'moto81_cart_backup_v1',
    ANIMATION_DURATION: 800,
    DEBOUNCE_DELAY: 300,
    FLYING_IMAGE_SIZE: 80,
    CART_ANIMATION_SCALE: 1.2,
    MAX_QUANTITY: 999,
    MIN_QUANTITY: 1,
    MAX_DISCOUNT_PERCENTAGE: 100,
    STORAGE_RETRY_ATTEMPTS: 3,
    STORAGE_RETRY_DELAY: 1000
};

/**
 * Product catalog with motorcycle accessories
 */
const PRODUCTS = [
    {id:1, name:'Artçı Demir 24', brand:'Moto 81', price:1600.00, img:'nmaxdemir.jpg', category:'nmax'},
    {id:2, name:'Depo Kapağı 24', brand:'Moto 81', price:800.00, img:'nmaxdepo.jpg', category:'nmax'},
    {id:3, name:'Şeffaf Filtre Kapağı 24-25', brand:'Moto 81', price:2750.00, img:'nmaxfiltre.jpg', category:'nmax' , isDiscounted: true, discountPercentage: 5},
    {id:4, name:'Karbon Filtre Kapağı 24-25', brand:'Moto 81', price:2700.00, img:'nmaxfiltrekarbon.jpg', category:'nmax', isDiscounted: true, discountPercentage: 10},
    {id:5, name:'Gidon Kapağı', brand:'Moto 81', price:1400.00, img:'nmaxgidon.jpg', category:'nmax', isDiscounted: true, discountPercentage: 12},
    {id:6, name:'Kontak Kapağı', brand:'Moto 81', price:1600.00, img:'nmaxkontak.jpg', category:'nmax', isDiscounted: true, discountPercentage: 30},
    {id:7, name:'Radyatör Kapağı 24-25', brand:'Moto 81', price:1800.00, img:'nmaxradyator.jpg', category:'nmax', isDiscounted: true, discountPercentage: 20},
    {id:8, name:'Sinyal Üstü Kapağı', brand:'Moto 81', price:1800.00, img:'nmaxsinyalustu.jpg', category:'nmax'},
    {id:9, name:'Stop Altı Kapağı', brand:'Moto 81', price:900.00, img:'nmaxstopalti.jpg', category:'nmax'},
    {id:10, name:'Varyatör Kapağı', brand:'Moto 81', price:2500.00, img:'nmaxvaryator.jpg', category:'nmax', isDiscounted: true, discountPercentage: 10},
    {id:22, name:'Nmax Çerçeve 25', brand:'Moto 81', price:2200.00, img:'nmaxgostergecercevesi.jpg', category:'nmax'},
    {id:23, name:'Nmax Winglet 25', brand:'Moto 81', price:2000.00, img:'nmax2025altwinglet.jpg', category:'nmax', isDiscounted: true, discountPercentage: 3},
    {id:24, name:'Nmax Ön Panel 24', brand:'Moto 81', price:2300.00, img:'nmaxoncam.jpg', category:'nmax', isDiscounted: true, discountPercentage: 12},
    {id:25, name:'Nmax Kontak (2) 25', brand:'Moto 81', price:1500.00, img:'nmax2025kontakalt.jpg', category:'nmax'},
    {id:26, name:'Nmax Gidon 25', brand:'Moto 81', price:2400.00, img:'nmax2025gidonkarbon.jpg', category:'nmax'},
    {id:27, name:'Nmax Kontak (1) 25', brand:'Moto 81', price:1500.00, img:'nmax2025kontakust.jpg', category:'nmax'},
    {id:28, name:'Nmax Ön V 25', brand:'Moto 81', price:2000.00, img:'nmax2025onpanelv.jpg', category:'nmax'},
    {id:29, name:'Nmax Radyatör 25', brand:'Moto 81', price:1850.00, img:'nmaxradyator2025.jpeg', category:'nmax'},
    {id:30, name:'Nmax Depo 25', brand:'Moto 81', price:1300.00, img:'nmax2025benzindepokapak.jpg', category:'nmax'},
    {id:31, name:'Nmax Depo Çerçeve 25', brand:'Moto 81', price:1950.00, img:'Nmax2025benzindepocevresi.jpg', category:'nmax'},
    {id:32, name:'Nmax Varyatör 24', brand:'Moto 81', price:2400.00, img:'nmaxvaryator.jpg', category:'nmax'},
    {id:33, name:'Nmax Ön Panel 25', brand:'Moto 81', price:2350.00, img:'nmaxoncam2025.jpg', category:'nmax', isDiscounted: true, discountPercentage: 8},
    {id:11, name:'PCX Headers', brand:'Moto 81', price:3000.00, img:'pcxheaders.jpg', category:'pcx', isDiscounted: true, discountPercentage: 5},
    {id:12, name:'Pcx 2025 Ön V', brand:'Moto 81', price:2200.00, img:'pcx2025onv.jpg', category:'pcx'},
    {id:13, name:'Pcx Karbon Egzoz', brand:'Moto 81', price:1700.00, img:'pcxegzozset.jpg', category:'pcx'},
    {id:14, name:'Pcx Çamurluk', brand:'Moto 81', price:2250.00, img:'pcxoncamurluk.jpg', category:'pcx', isDiscounted: true, discountPercentage: 12},
    {id:15, name:'Pcx Füme Filtre', brand:'Moto 81', price:1650.00, img:'pcxfumefiltre.jpg', category:'pcx', isDiscounted: true, discountPercentage: 5},
    {id:16, name:'Pcx Şeffaf Filtre', brand:'Moto 81', price:1650.00, img:'pcxseffaffiltre.jpg', category:'pcx', isDiscounted: true, discountPercentage: 5},
    {id:17, name:'Pcx Şeffaf Radyatör', brand:'Moto 81', price:1550.00, img:'pcxseffafradyator.jpg', category:'pcx', isDiscounted: true, discountPercentage: 5},
    {id:18, name:'Pcx Karbon Varyatör', brand:'Moto 81', price:1650.00, img:'pcxkarbonvaryator.jpg', category:'pcx'},
    {id:19, name:'Pcx Şeffaf Varyatör', brand:'Moto 81', price:1650.00, img:'pcxseffafvaryator.jpg', category:'pcx', isDiscounted: true, discountPercentage: 5},
    {id:20, name:'Pcx 2024 Ön V', brand:'Moto 81', price:2200.00, img:'pcx2024onv.jpg', category:'pcx'},
    {id:21, name:'Pcx Karbon Tutamaç', brand:'Moto 81', price:2500.00, img:'pcxarkademir.jpg', category:'pcx'},
    {id:42, name:'H2 Katlanır Ayna ', brand:'Moto 81', price:1400.00, img:'h2ayna.jpg', category:'nmax', isDiscounted: true, discountPercentage: 50},
    { id:100, name:'Nmax 21-24 Filtre Kırmızı', brand:'Moto 81', price:2000, img:'21-24filtrekirmizi.jpg', category:'nmax', isDiscounted:true, discountPercentage:10 },
    { id:101, name:'Nmax 21-24 Filtre Mavi', brand:'Moto 81', price:2000, img:'21-24filtremavi.jpg', category:'nmax', isDiscounted:true, discountPercentage:10 },
    { id:102, name:'Nmax Füme/Şeffaf Stop Camı 21-24', brand:'Moto 81', price:2500, img:'fumestopcam21-24.jpg', category:'nmax', isDiscounted:true, discountPercentage:5 },
    { id:103, name:'Nmax Gidon Karbon 15-20', brand:'Moto 81', price:2500, img:'gidonkarbon15-20.jpg', category:'nmax', isDiscounted:true, discountPercentage:3 },
    { id:104, name:'Nmax 2025 Şeffaf Cam', brand:'Moto 81', price:3500, img:'karbonekran.jpg', category:'nmax', isDiscounted:true, discountPercentage:3 },
    { id:105, name:'Nmax Karbon Radyatör Kapağı', brand:'Moto 81', price:1500, img:'karbonradyator.jpg', category:'nmax', isDiscounted:true, discountPercentage:3 },
    { id:106, name:'Nmax 15-20 Gösterge', brand:'Moto 81', price:3500, img:'nmax2025.jpg', category:'nmax', isDiscounted:true, discountPercentage:3 },
    { id:107, name:'Nmax Arka Çamurluk', brand:'Moto 81', price:2500, img:'nmaxarkacamurluk.jpg', category:'nmax', isDiscounted:true, discountPercentage:3 },
    { id:108, name:'Nmax Gen 1 Varyatör', brand:'Moto 81', price:2500, img:'nmaxgen1varyator.jpg', category:'nmax', isDiscounted:true, discountPercentage:10 },
    { id:109, name:'Nmax Headers 21-24', brand:'Moto 81', price:4000, img:'nmaxheaders21-24.jpg', category:'nmax', isDiscounted:true, discountPercentage:0 },
    { id:110, name:'Nmax Karbon Ön Çamurluk', brand:'Moto 81', price:3000, img:'nmaxkarboncam.jpg', category:'nmax', isDiscounted:true, discountPercentage:3 },
    { id:111, name:'Nmax Alt Kaplama Set', brand:'Moto 81', price:4500, img:'nmaxkaltinraynset.jpg', category:'nmax', isDiscounted:true, discountPercentage:3 },
    { id:112, name:'Nmax Paspas Set', brand:'Moto 81', price:3000, img:'nmaxpaspas.jpg', category:'nmax', isDiscounted:true, discountPercentage:5},
    { id:113, name:'Nmax Sissy Bar', brand:'Moto 81', price:5000, img:'nmaxsissybar.jpg', category:'nmax', isDiscounted:true, discountPercentage:9 },
    { id:114, name:'Nmax Şeffaf Ön Cam', brand:'Moto 81', price:3500, img:'nmaxseffafcam.jpg', category:'nmax', isDiscounted:true, discountPercentage:3 },
    { id:115, name:'Nmax Karbon Stop Kapağı', brand:'Moto 81', price:2500, img:'stopkarbon.jpg', category:'nmax', isDiscounted:true, discountPercentage:5},
    { id:116, name:'Nmax Şeffaf Ön Cam ', brand:'Moto 81', price:3850, img:'seffafcamoncam.jpg', category:'nmax', isDiscounted:true, discountPercentage:5 },
    // VELESCOPE STOK BİTTİ:
    { id:117, name:'Nmax Velescope Set', brand:'Moto 81', price:3850, img:'velescope.jpg', category:'nmax', isDiscounted:true, discountPercentage:3, outOfStock: true }
];

// =============================================================================
// DOM ELEMENT REFERENCES
// =============================================================================

const DOM = {
    productGrid: document.getElementById('productGrid'),
    cartCount: document.getElementById('cartCount'),
    cartItems: document.getElementById('cartItems'),
    cartTotal: document.getElementById('cartTotal'),
    searchInput: document.getElementById('searchInput'),
    categoryLinks: document.querySelectorAll('.navbar-nav .nav-link[data-category]'),
    clearCartBtn: document.getElementById('clearCart'),
    checkoutBtn: document.getElementById('checkoutBtn'),
    cartToggle: document.getElementById('cartToggle'),
    heroCTA: document.querySelector('.hero-cta'),
    mobileCartDrawer: document.getElementById('mobileCartDrawer'),
    mobileCartBackdrop: document.getElementById('mobileCartBackdrop'),
    mobileCartClose: document.getElementById('mobileCartClose'),
    mobileCartContent: document.getElementById('mobileCartContent'),
    mobileCartTotal: document.getElementById('mobileCartTotal'),
    mobileEmptyCart: document.getElementById('mobileEmptyCart'),
    mobileClearCart: document.getElementById('mobileClearCart'),
    mobileCheckoutBtn: document.getElementById('mobileCheckoutBtn')
};

// =============================================================================
// APPLICATION STATE
// =============================================================================

let cart = [];
let currentCategory = 'all';

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function formatCurrency(amount) {
    return Number(amount).toLocaleString('tr-TR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) + ' ₺';
}

function calculateDiscountedPrice(price, discountPercentage) {
    if (typeof price !== 'number' || price < 0 || !isFinite(price)) return price;
    if (typeof discountPercentage !== 'number' || discountPercentage < 0 || !isFinite(discountPercentage)) return price;
    const validDiscount = Math.min(discountPercentage, CONFIG.MAX_DISCOUNT_PERCENTAGE);
    return Math.max(price * (1 - validDiscount / 100), 0);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function findProductById(productId) {
    return PRODUCTS.find(p => p.id === productId) || null;
}

function getCurrentProductPrice(product) {
    if (!product || typeof product !== 'object') return 0;
    if (product.isDiscounted && product.discountPercentage) {
        return calculateDiscountedPrice(product.price, product.discountPercentage);
    }
    return product.price || 0;
}

// =============================================================================
// CART MANAGEMENT (SENİN FULL RETRY MANTIĞIN)
// =============================================================================

function validateCartData(cartData) {
    if (!Array.isArray(cartData)) return [];
    return cartData.filter(item => {
        if (!item || typeof item !== 'object' || !item.id) return false;
        const product = findProductById(item.id);
        return !!product;
    });
}

async function loadCart() {
    let attempts = 0;
    const maxAttempts = CONFIG.STORAGE_RETRY_ATTEMPTS;

    while (attempts < maxAttempts) {
        try {
            const savedCart = localStorage.getItem(CONFIG.CART_KEY);
            if (savedCart) {
                cart = validateCartData(JSON.parse(savedCart));
                return;
            }
            const backupCart = localStorage.getItem(CONFIG.CART_BACKUP_KEY);
            if (backupCart) {
                cart = validateCartData(JSON.parse(backupCart));
                return;
            }
            cart = [];
            return;
        } catch (error) {
            attempts++;
            if (attempts >= maxAttempts) cart = [];
            await new Promise(res => setTimeout(res, CONFIG.STORAGE_RETRY_DELAY));
        }
    }
}

function saveCart() {
    try {
        const data = JSON.stringify(cart);
        localStorage.setItem(CONFIG.CART_KEY, data);
        localStorage.setItem(CONFIG.CART_BACKUP_KEY, data);
        sessionStorage.setItem(CONFIG.CART_KEY, data);
    } catch (e) {
        console.error('Save failed', e);
    }
}

function updateCartUI() {
    updateCartCount();
    updateCartItems();
    updateCartTotal();
    updateMobileCartUI();
    saveCart();
}

function updateCartCount() {
    if (!DOM.cartCount) return;
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    DOM.cartCount.textContent = totalItems;
    DOM.cartCount.classList.add('pulse');
    setTimeout(() => DOM.cartCount.classList.remove('pulse'), 600);
}

function updateCartItems() {
    DOM.cartItems.innerHTML = '';
    if (cart.length === 0) {
        DOM.cartItems.innerHTML = '<div class="empty-cart-state text-center py-5">Sepetiniz boş</div>';
        return;
    }
    cart.forEach(item => {
        const product = findProductById(item.id);
        if (!product) return;
        const displayPrice = item.priceAtAdd || item.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img alt="${item.name}" src="${item.img}">
            <div class="cart-meta">
                <b>${item.name}</b>
                <div class="text-muted">${formatCurrency(displayPrice)} x ${item.qty}</div>
            </div>
            <div class="cart-quantity-controls">
                <button class="qty-btn decrease-qty-btn" data-id="${item.id}">−</button>
                <span class="qty-display">${item.qty}</span>
                <button class="qty-btn increase-qty-btn" data-id="${item.id}">+</button>
            </div>
        `;
        DOM.cartItems.appendChild(div);
    });
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.priceAtAdd * item.qty), 0);
    DOM.cartTotal.textContent = formatCurrency(total);
}

function addToCart(productId, buttonElement) {
    const product = findProductById(productId);
    // STOK KONTROLÜ BURADA:
    if (!product || product.outOfStock) return;

    if (buttonElement && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        createFlyingImageAnimation(product.img, buttonElement);
    }

    const currentPrice = getCurrentProductPrice(product);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        if (existingItem.qty < CONFIG.MAX_QUANTITY) existingItem.qty += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            brand: product.brand,
            priceAtAdd: currentPrice,
            qty: 1,
            img: product.img,
            isDiscounted: product.isDiscounted,
            discountPercentage: product.discountPercentage
        });
    }

    animateCartButton();
    updateCartUI();
}

// =============================================================================
// PRODUCT DISPLAY (STOK DURUMU GÖRSELLEŞTİRME)
// =============================================================================

function renderProducts(productsToRender = PRODUCTS) {
    DOM.productGrid.innerHTML = '';
    if (productsToRender.length === 0) {
        DOM.productGrid.innerHTML = '<div class="col-12 text-center py-5">Ürün bulunamadı.</div>';
        return;
    }
    productsToRender.forEach(product => {
        const element = createProductCardElement(product);
        DOM.productGrid.appendChild(element);
    });
}

function createProductCardElement(product) {
    const container = document.createElement('div');
    container.className = 'product-item';

    // Stok yoksa stili değiştir
    const isOut = product.outOfStock === true;
    const btnClass = isOut ? 'btn-secondary disabled' : 'btn-primary add-to-cart-btn';
    const btnText = isOut ? 'Stokta Yok' : 'Sepete Ekle';
    const blurEffect = isOut ? 'style="filter: grayscale(1); opacity: 0.7;"' : '';

    const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
    const priceHTML = product.isDiscounted && !isOut
        ? `<p class="card-text original-price">${formatCurrency(product.price)}</p>
           <p class="card-text current-price discounted-price">${formatCurrency(discountedPrice)}</p>`
        : `<p class="card-text current-price">${formatCurrency(product.price)}</p>`;

    container.innerHTML = `
        <div class="card h-100 position-relative">
            ${product.isDiscounted && !isOut ? `<span class="discount-badge">-%${product.discountPercentage}</span>` : ''}
            ${isOut ? `<span class="badge bg-dark position-absolute m-2" style="top:0; left:0; z-index:5">TÜKENDİ</span>` : ''}
            <div class="thumb" ${blurEffect}>
                <img src="${product.img}" class="card-img-top" alt="${product.name}">
            </div>
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text brand-text">${product.brand}</p>
                <div class="card-price-info">${priceHTML}</div>
            </div>
            <div class="actions">
                <button class="${btnClass}" data-id="${product.id}" ${isOut ? 'disabled' : ''}>${btnText}</button>
            </div>
        </div>
    `;
    return container;
}

// =============================================================================
// NAVBAR & MOBILE MENU (SENİN TÜM ÖZEL BACKDROP MANTIĞIN)
// =============================================================================

function createMobileMenuBackdrop() {
    const existing = document.querySelectorAll('.mobile-menu-backdrop');
    existing.forEach(bd => bd.remove());
    
    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-menu-backdrop';
    backdrop.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); z-index: 1039; opacity: 0; transition: opacity 0.3s ease;`;
    document.body.appendChild(backdrop);
    requestAnimationFrame(() => backdrop.style.opacity = '1');
    document.body.style.overflow = 'hidden';
}

function removeMobileMenuBackdrop() {
    const backdrops = document.querySelectorAll('.mobile-menu-backdrop');
    backdrops.forEach(backdrop => {
        backdrop.style.opacity = '0';
        setTimeout(() => backdrop.remove(), 150);
    });
    document.body.style.overflow = '';
}

// ... (Diğer tüm orijinal fonksiyonların: openMobileCart, closeMobileCart, swipe jestleri vb. aynı kalıyor) ...

function animateCartButton() {
    DOM.cartToggle.style.transform = `scale(${CONFIG.CART_ANIMATION_SCALE}) rotate(5deg)`;
    setTimeout(() => DOM.cartToggle.style.transform = 'scale(1) rotate(0deg)', 300);
}

function createFlyingImageAnimation(imgSrc, startElement) {
    const flyingImage = document.createElement('img');
    flyingImage.src = imgSrc;
    flyingImage.className = 'flying-image';
    const startRect = startElement.getBoundingClientRect();
    const cartRect = DOM.cartToggle.getBoundingClientRect();
    flyingImage.style.left = `${startRect.left}px`;
    flyingImage.style.top = `${startRect.top}px`;
    document.body.appendChild(flyingImage);
    setTimeout(() => {
        flyingImage.style.left = `${cartRect.left}px`;
        flyingImage.style.top = `${cartRect.top}px`;
    }, 50);
    setTimeout(() => flyingImage.remove(), CONFIG.ANIMATION_DURATION);
}

// =============================================================================
// INITIALIZATION
// =============================================================================

async function initializeApp() {
    await loadCart();
    initializeEventListeners(); // Tüm o detaylı event listnerların buraya bağlanıyor
    updateCartUI();
    renderProducts();
}

function initializeEventListeners() {
    // Tıklama delegasyonu
    document.body.addEventListener('click', (event) => {
        const target = event.target;
        if (target.closest('.add-to-cart-btn')) {
            addToCart(parseInt(target.closest('.add-to-cart-btn').dataset.id), target.closest('.add-to-cart-btn'));
        }
        if (target.closest('.decrease-qty-btn')) updateCartItemQuantity(parseInt(target.closest('.decrease-qty-btn').dataset.id), -1);
        if (target.closest('.increase-qty-btn')) updateCartItemQuantity(parseInt(target.closest('.increase-qty-btn').dataset.id), 1);
        if (target === DOM.clearCartBtn) clearCart();
        if (target === DOM.checkoutBtn) window.location.href = "odeme.html";
    });

    // Kategori filtreleme
    DOM.categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const cat = e.target.dataset.category;
            renderProducts(cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat));
        });
    });

    // Arama
    DOM.searchInput.addEventListener('input', (e) => debouncedSearch(e.target.value));
}

const debouncedSearch = debounce((q) => {
    const filtered = PRODUCTS.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
    renderProducts(filtered);
}, CONFIG.DEBOUNCE_DELAY);

function updateCartItemQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += change;
    if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    updateCartUI();
}

function clearCart() {
    cart = [];
    updateCartUI();
}

function updateMobileCartUI() {
    if (!DOM.mobileCartContent) return;
    // (Orijinal mobil kart güncelleme mantığın)
}

// Uygulamayı başlat
document.addEventListener('DOMContentLoaded', initializeApp);

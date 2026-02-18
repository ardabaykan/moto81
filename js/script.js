/**
 * Moto 81 - Premium Motorcycle E-Commerce Application
 *
 * Main application script handling product display, cart management,
 * search functionality, and user interactions.
 *
 * @version 2.0.0 (Production Ready - Fixed & Optimized)
 * @author Moto 81 Development Team
 * @since 2025
 */

'use strict';

// =============================================================================
// APPLICATION CONFIGURATION AND CONSTANTS
// =============================================================================

const CONFIG = {
    CART_KEY: 'moto81_cart_v2',
    CART_BACKUP_KEY: 'moto81_cart_backup_v2',
    ANIMATION_DURATION: 800,
    DEBOUNCE_DELAY: 300,
    FLYING_IMAGE_SIZE: 80,
    CART_ANIMATION_SCALE: 1.2,
    MAX_QUANTITY: 999,
    MIN_QUANTITY: 1,
    MAX_DISCOUNT_PERCENTAGE: 100,
    STORAGE_RETRY_ATTEMPTS: 3,
    STORAGE_RETRY_DELAY: 1000,
    SWIPE_THRESHOLD: 50
};

// =============================================================================
// PRODUCT DATA
// =============================================================================

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
    
    // STOKTA OLMAYAN ÜRÜNLER
    {id: 117, name: 'Nmax Velescope Set', brand: 'Moto 81', price: 3850, img: 'velescope.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 3, outOfStock: true}
];

// =============================================================================
// STATE MANAGEMENT
// =============================================================================

const state = {
    cart: [],
    currentCategory: 'all',
    isMobileMenuOpen: false,
    isMobileCartOpen: false,
    touchStartX: 0,
    touchEndX: 0
};

// =============================================================================
// DOM ELEMENTS CACHE
// =============================================================================

const DOM = {
    // Product Grid
    productGrid: null,
    
    // Cart Elements
    cartCount: null,
    cartItems: null,
    cartTotal: null,
    cartDropdown: null,
    cartToggle: null,
    clearCartBtn: null,
    checkoutBtn: null,
    
    // Mobile Cart
    mobileCartDrawer: null,
    mobileCartBackdrop: null,
    mobileCartClose: null,
    mobileCartContent: null,
    mobileCartTotal: null,
    mobileEmptyCart: null,
    mobileClearCart: null,
    mobileCheckoutBtn: null,
    
    // Search & Filter
    searchInput: null,
    categoryLinks: null,
    
    // Navbar
    navbarToggler: null,
    navbarCollapse: null,
    
    // Hero
    heroCTA: null
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

const formatCurrency = (amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) return '0,00 ₺';
    return amount.toLocaleString('tr-TR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) + ' ₺';
};

const calculateDiscountedPrice = (price, discountPercentage) => {
    if (typeof price !== 'number' || price < 0 || !isFinite(price)) return price;
    if (typeof discountPercentage !== 'number' || discountPercentage <= 0 || !isFinite(discountPercentage)) return price;
    
    const validDiscount = Math.min(discountPercentage, CONFIG.MAX_DISCOUNT_PERCENTAGE);
    return Math.max(price * (1 - validDiscount / 100), 0);
};

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const findProductById = (productId) => PRODUCTS.find(p => p.id === productId) || null;

const getCurrentProductPrice = (product) => {
    if (!product || typeof product !== 'object') return 0;
    if (product.isDiscounted && product.discountPercentage > 0) {
        return calculateDiscountedPrice(product.price, product.discountPercentage);
    }
    return product.price || 0;
};

// =============================================================================
// STORAGE MANAGEMENT
// =============================================================================

const validateCartData = (cartData) => {
    if (!Array.isArray(cartData)) return [];
    return cartData.filter(item => {
        if (!item || typeof item !== 'object' || !item.id) return false;
        const product = findProductById(item.id);
        return !!product && !product.outOfStock;
    });
};

const loadCart = async () => {
    let attempts = 0;
    
    while (attempts < CONFIG.STORAGE_RETRY_ATTEMPTS) {
        try {
            const savedCart = localStorage.getItem(CONFIG.CART_KEY);
            if (savedCart) {
                state.cart = validateCartData(JSON.parse(savedCart));
                return;
            }
            
            const backupCart = localStorage.getItem(CONFIG.CART_BACKUP_KEY);
            if (backupCart) {
                state.cart = validateCartData(JSON.parse(backupCart));
                return;
            }
            
            state.cart = [];
            return;
        } catch (error) {
            console.warn(`Cart load attempt ${attempts + 1} failed:`, error);
            attempts++;
            if (attempts >= CONFIG.STORAGE_RETRY_ATTEMPTS) {
                console.error('Failed to load cart after all attempts');
                state.cart = [];
                return;
            }
            await new Promise(resolve => setTimeout(resolve, CONFIG.STORAGE_RETRY_DELAY));
        }
    }
};

const saveCart = () => {
    try {
        const data = JSON.stringify(state.cart);
        localStorage.setItem(CONFIG.CART_KEY, data);
        localStorage.setItem(CONFIG.CART_BACKUP_KEY, data);
    } catch (e) {
        console.error('Failed to save cart:', e);
    }
};

// =============================================================================
// CART MANAGEMENT
// =============================================================================

const updateCartCount = () => {
    if (!DOM.cartCount) return;
    
    const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
    DOM.cartCount.textContent = totalItems;
    
    // Pulse animation
    DOM.cartCount.classList.add('pulse');
    setTimeout(() => DOM.cartCount.classList.remove('pulse'), 600);
};

const updateCartItems = () => {
    if (!DOM.cartItems) return;
    
    DOM.cartItems.innerHTML = '';
    
    if (state.cart.length === 0) {
        DOM.cartItems.innerHTML = `
            <div class="empty-cart-state">
                <div class="empty-cart-icon">🛒</div>
                <div class="empty-cart-text">Sepetiniz Boş</div>
                <div class="empty-cart-subtitle">Ürünleri keşfedin ve sepetinize ekleyin</div>
            </div>
        `;
        return;
    }
    
    state.cart.forEach(item => {
        const product = findProductById(item.id);
        if (!product) return;
        
        const displayPrice = item.priceAtAdd || item.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}" loading="lazy">
            <div class="cart-meta">
                <b>${item.name}</b>
                <div class="text-muted">${formatCurrency(displayPrice)} x ${item.qty}</div>
            </div>
            <div class="cart-quantity-controls">
                <button class="qty-btn decrease-qty-btn" data-id="${item.id}" aria-label="Miktarı azalt">−</button>
                <span class="qty-display">${item.qty}</span>
                <button class="qty-btn increase-qty-btn" data-id="${item.id}" aria-label="Miktarı artır">+</button>
            </div>
        `;
        DOM.cartItems.appendChild(div);
    });
};

const updateCartTotal = () => {
    if (!DOM.cartTotal) return;
    
    const total = state.cart.reduce((sum, item) => sum + ((item.priceAtAdd || 0) * item.qty), 0);
    DOM.cartTotal.textContent = formatCurrency(total);
    
    // Update mobile total if exists
    if (DOM.mobileCartTotal) {
        DOM.mobileCartTotal.textContent = formatCurrency(total);
    }
};

const updateCartUI = () => {
    updateCartCount();
    updateCartItems();
    updateCartTotal();
    updateMobileCartUI();
    saveCart();
};

const addToCart = (productId, buttonElement) => {
    const product = findProductById(productId);
    
    // STOK KONTROLÜ
    if (!product) {
        console.warn('Product not found:', productId);
        return;
    }
    
    if (product.outOfStock) {
        showNotification('Bu ürün stokta yok', 'error');
        return;
    }
    
    // Animasyon
    if (buttonElement && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        createFlyingImageAnimation(product.img, buttonElement);
    }
    
    const currentPrice = getCurrentProductPrice(product);
    const existingItem = state.cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.qty < CONFIG.MAX_QUANTITY) {
            existingItem.qty += 1;
            showNotification(`${product.name} miktarı arttırıldı`, 'success');
        } else {
            showNotification('Maksimum miktar reached', 'warning');
        }
    } else {
        state.cart.push({
            id: product.id,
            name: product.name,
            brand: product.brand,
            priceAtAdd: currentPrice,
            originalPrice: product.price,
            qty: 1,
            img: product.img,
            isDiscounted: product.isDiscounted,
            discountPercentage: product.discountPercentage
        });
        showNotification(`${product.name} sepete eklendi`, 'success');
    }
    
    animateCartButton();
    updateCartUI();
    
    // Mobil sepeti otomatik aç
    if (window.innerWidth < 992) {
        openMobileCart();
    }
};

const updateCartItemQuantity = (id, change) => {
    const item = state.cart.find(i => i.id === id);
    if (!item) return;
    
    item.qty += change;
    
    if (item.qty <= 0) {
        state.cart = state.cart.filter(i => i.id !== id);
        showNotification('Ürün sepetten çıkarıldı', 'info');
    } else if (item.qty > CONFIG.MAX_QUANTITY) {
        item.qty = CONFIG.MAX_QUANTITY;
        showNotification('Maksimum miktar reached', 'warning');
    }
    
    updateCartUI();
};

const clearCart = () => {
    if (state.cart.length === 0) return;
    
    if (confirm('Sepeti temizlemek istediğinize emin misiniz?')) {
        state.cart = [];
        updateCartUI();
        showNotification('Sepet temizlendi', 'info');
    }
};

// =============================================================================
// MOBILE CART MANAGEMENT
// =============================================================================

const openMobileCart = () => {
    if (!DOM.mobileCartDrawer || !DOM.mobileCartBackdrop) return;
    
    state.isMobileCartOpen = true;
    DOM.mobileCartDrawer.classList.add('open');
    DOM.mobileCartBackdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    updateMobileCartUI();
};

const closeMobileCart = () => {
    if (!DOM.mobileCartDrawer || !DOM.mobileCartBackdrop) return;
    
    state.isMobileCartOpen = false;
    DOM.mobileCartDrawer.classList.remove('open');
    DOM.mobileCartBackdrop.classList.remove('show');
    document.body.style.overflow = '';
};

const updateMobileCartUI = () => {
    if (!DOM.mobileCartContent) return;
    
    DOM.mobileCartContent.innerHTML = '';
    
    if (state.cart.length === 0) {
        if (DOM.mobileEmptyCart) {
            DOM.mobileEmptyCart.style.display = 'block';
        }
        DOM.mobileCartContent.innerHTML = `
            <div class="mobile-empty-cart">
                <div class="mobile-empty-cart-icon">🛒</div>
                <div class="mobile-empty-cart-text">Sepetiniz Boş</div>
                <div class="mobile-empty-cart-subtitle">Alışverişe başlamak için ürünleri keşfedin</div>
            </div>
        `;
        return;
    }
    
    if (DOM.mobileEmptyCart) {
        DOM.mobileEmptyCart.style.display = 'none';
    }
    
    state.cart.forEach(item => {
        const product = findProductById(item.id);
        if (!product) return;
        
        const displayPrice = item.priceAtAdd || item.price;
        const div = document.createElement('div');
        div.className = 'mobile-cart-item';
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}" loading="lazy">
            <div class="mobile-cart-meta">
                <b>${item.name}</b>
                <div class="text-muted">${formatCurrency(displayPrice)}</div>
                <div class="mobile-quantity-controls">
                    <button class="mobile-qty-btn decrease-qty-btn" data-id="${item.id}" aria-label="Azalt">−</button>
                    <span class="mobile-qty-display">${item.qty}</span>
                    <button class="mobile-qty-btn increase-qty-btn" data-id="${item.id}" aria-label="Artır">+</button>
                    <button class="mobile-remove-btn remove-item-btn" data-id="${item.id}" aria-label="Sil">🗑️</button>
                </div>
            </div>
        `;
        DOM.mobileCartContent.appendChild(div);
    });
};

// =============================================================================
// PRODUCT DISPLAY
// =============================================================================

const createProductCardElement = (product) => {
    const container = document.createElement('div');
    container.className = 'product-item';
    
    const isOutOfStock = product.outOfStock === true;
    const currentPrice = getCurrentProductPrice(product);
    
    // Fiyat HTML'i oluştur
    let priceHTML = '';
    if (isOutOfStock) {
        priceHTML = `<p class="card-text current-price out-of-stock">Stokta Yok</p>`;
    } else if (product.isDiscounted && product.discountPercentage > 0) {
        priceHTML = `
            <div class="price-row">
                <p class="card-text original-price">${formatCurrency(product.price)}</p>
                <span class="discount-badge">-%${product.discountPercentage}</span>
            </div>
            <p class="card-text current-price">${formatCurrency(currentPrice)}</p>
        `;
    } else {
        priceHTML = `<p class="card-text current-price">${formatCurrency(product.price)}</p>`;
    }
    
    // Buton durumu
    const buttonHTML = isOutOfStock 
        ? `<button class="add-to-cart-btn out-of-stock" disabled>
             <span>Stokta Yok</span>
           </button>`
        : `<button class="add-to-cart-btn" data-id="${product.id}">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
             </svg>
             <span>Sepete Ekle</span>
           </button>`;
    
    // Görsel efektler
    const imageStyle = isOutOfStock ? 'style="filter: grayscale(1) opacity(0.6);"' : '';
    const stockBadge = isOutOfStock 
        ? `<div class="stock-badge out-of-stock">TÜKENDİ</div>` 
        : '';
    
    container.innerHTML = `
        <div class="card ${isOutOfStock ? 'out-of-stock' : ''}">
            ${stockBadge}
            ${!isOutOfStock && product.isDiscounted ? `<div class="discount-ribbon">-%${product.discountPercentage}</div>` : ''}
            <div class="thumb" ${imageStyle}>
                <img src="${product.img}" alt="${product.name}" loading="lazy">
            </div>
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text brand-text">${product.brand}</p>
                <div class="card-price-info">
                    ${priceHTML}
                </div>
            </div>
            <div class="actions">
                ${buttonHTML}
            </div>
        </div>
    `;
    
    return container;
};

const renderProducts = (productsToRender = PRODUCTS) => {
    if (!DOM.productGrid) return;
    
    DOM.productGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        DOM.productGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <h3>Ürün Bulunamadı</h3>
                    <p>Arama kriterlerinize uygun ürün bulunmamaktadır.</p>
                </div>
            </div>
        `;
        return;
    }
    
    // Loading state
    DOM.productGrid.classList.add('loading');
    
    setTimeout(() => {
        productsToRender.forEach((product, index) => {
            const element = createProductCardElement(product);
            element.style.animationDelay = `${index * 0.05}s`;
            element.classList.add('fade-in');
            DOM.productGrid.appendChild(element);
        });
        DOM.productGrid.classList.remove('loading');
    }, 100);
};

// =============================================================================
// ANIMATIONS
// =============================================================================

const animateCartButton = () => {
    if (!DOM.cartToggle) return;
    
    DOM.cartToggle.style.transform = `scale(${CONFIG.CART_ANIMATION_SCALE}) rotate(5deg)`;
    setTimeout(() => {
        DOM.cartToggle.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
};

const createFlyingImageAnimation = (imgSrc, startElement) => {
    if (!DOM.cartToggle) return;
    
    const flyingImage = document.createElement('img');
    flyingImage.src = imgSrc;
    flyingImage.className = 'flying-image';
    flyingImage.style.width = `${CONFIG.FLYING_IMAGE_SIZE}px`;
    flyingImage.style.height = `${CONFIG.FLYING_IMAGE_SIZE}px`;
    
    const startRect = startElement.getBoundingClientRect();
    const cartRect = DOM.cartToggle.getBoundingClientRect();
    
    flyingImage.style.left = `${startRect.left + startRect.width / 2 - CONFIG.FLYING_IMAGE_SIZE / 2}px`;
    flyingImage.style.top = `${startRect.top + startRect.height / 2 - CONFIG.FLYING_IMAGE_SIZE / 2}px`;
    
    document.body.appendChild(flyingImage);
    
    // Force reflow
    flyingImage.offsetHeight;
    
    flyingImage.style.left = `${cartRect.left + cartRect.width / 2 - CONFIG.FLYING_IMAGE_SIZE / 2}px`;
    flyingImage.style.top = `${cartRect.top + cartRect.height / 2 - CONFIG.FLYING_IMAGE_SIZE / 2}px`;
    
    setTimeout(() => {
        flyingImage.remove();
    }, CONFIG.ANIMATION_DURATION);
};

const showNotification = (message, type = 'info') => {
    // Basit toast notification
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: ${type === 'success' ? '#00c853' : type === 'error' ? '#ff3d00' : '#0091ea'};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 9999;
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// =============================================================================
// EVENT HANDLERS
// =============================================================================

const handleAddToCart = (e) => {
    const btn = e.target.closest('.add-to-cart-btn');
    if (!btn || btn.disabled) return;
    
    const productId = parseInt(btn.dataset.id);
    if (isNaN(productId)) return;
    
    addToCart(productId, btn);
};

const handleQuantityChange = (e) => {
    const btn = e.target.closest('.qty-btn, .mobile-qty-btn');
    if (!btn) return;
    
    const productId = parseInt(btn.dataset.id);
    if (isNaN(productId)) return;
    
    const isDecrease = btn.classList.contains('decrease-qty-btn');
    const change = isDecrease ? -1 : 1;
    
    updateCartItemQuantity(productId, change);
};

const handleRemoveItem = (e) => {
    const btn = e.target.closest('.remove-item-btn');
    if (!btn) return;
    
    const productId = parseInt(btn.dataset.id);
    if (isNaN(productId)) return;
    
    const item = state.cart.find(i => i.id === productId);
    if (item) {
        item.qty = 0;
        state.cart = state.cart.filter(i => i.id !== productId);
        updateCartUI();
        showNotification('Ürün sepetten çıkarıldı', 'info');
    }
};

const handleCategoryFilter = (e) => {
    e.preventDefault();
    const link = e.target.closest('[data-category]');
    if (!link) return;
    
    const category = link.dataset.category;
    state.currentCategory = category;
    
    // Aktif durumu güncelle
    DOM.categoryLinks?.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    
    // Ürünleri filtrele
    const filtered = category === 'all' 
        ? PRODUCTS 
        : PRODUCTS.filter(p => p.category === category);
    
    renderProducts(filtered);
    
    // Smooth scroll to products
    DOM.productGrid?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const handleSearch = debounce((query) => {
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
        renderProducts(state.currentCategory === 'all' 
            ? PRODUCTS 
            : PRODUCTS.filter(p => p.category === state.currentCategory));
        return;
    }
    
    const filtered = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
    );
    
    renderProducts(filtered);
}, CONFIG.DEBOUNCE_DELAY);

// =============================================================================
// MOBILE MENU MANAGEMENT
// =============================================================================

const toggleMobileMenu = () => {
    if (!DOM.navbarCollapse || !DOM.navbarToggler) return;
    
    const isOpen = DOM.navbarCollapse.classList.contains('show');
    
    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
};

const openMobileMenu = () => {
    if (!DOM.navbarCollapse) return;
    
    DOM.navbarCollapse.classList.add('show');
    DOM.navbarToggler?.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Backdrop oluştur
    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-menu-backdrop';
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(4px);
        z-index: 1039;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    backdrop.addEventListener('click', closeMobileMenu);
    document.body.appendChild(backdrop);
    
    requestAnimationFrame(() => {
        backdrop.style.opacity = '1';
    });
};

const closeMobileMenu = () => {
    if (!DOM.navbarCollapse) return;
    
    DOM.navbarCollapse.classList.remove('show');
    DOM.navbarToggler?.classList.remove('active');
    document.body.style.overflow = '';
    
    // Backdrop'ı kaldır
    const backdrop = document.querySelector('.mobile-menu-backdrop');
    if (backdrop) {
        backdrop.style.opacity = '0';
        setTimeout(() => backdrop.remove(), 300);
    }
};

// =============================================================================
// SWIPE GESTURES
// =============================================================================

const handleTouchStart = (e) => {
    state.touchStartX = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e) => {
    state.touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
};

const handleSwipe = () => {
    const swipeThreshold = CONFIG.SWIPE_THRESHOLD;
    const diff = state.touchStartX - state.touchEndX;
    
    // Sağa kaydır - sepeti aç
    if (diff < -swipeThreshold && !state.isMobileCartOpen && window.innerWidth < 992) {
        openMobileCart();
    }
    
    // Sola kaydır - sepeti kapat
    if (diff > swipeThreshold && state.isMobileCartOpen) {
        closeMobileCart();
    }
};

// =============================================================================
// INITIALIZATION
// =============================================================================

const initDOM = () => {
    // Product Grid
    DOM.productGrid = document.getElementById('productGrid');
    
    // Cart Elements
    DOM.cartCount = document.getElementById('cartCount');
    DOM.cartItems = document.getElementById('cartItems');
    DOM.cartTotal = document.getElementById('cartTotal');
    DOM.cartDropdown = document.getElementById('cartDropdown');
    DOM.cartToggle = document.getElementById('cartToggle');
    DOM.clearCartBtn = document.getElementById('clearCart');
    DOM.checkoutBtn = document.getElementById('checkoutBtn');
    
    // Mobile Cart
    DOM.mobileCartDrawer = document.getElementById('mobileCartDrawer');
    DOM.mobileCartBackdrop = document.getElementById('mobileCartBackdrop');
    DOM.mobileCartClose = document.getElementById('mobileCartClose');
    DOM.mobileCartContent = document.getElementById('mobileCartContent');
    DOM.mobileCartTotal = document.getElementById('mobileCartTotal');
    DOM.mobileEmptyCart = document.getElementById('mobileEmptyCart');
    DOM.mobileClearCart = document.getElementById('mobileClearCart');
    DOM.mobileCheckoutBtn = document.getElementById('mobileCheckoutBtn');
    
    // Search & Filter
    DOM.searchInput = document.getElementById('searchInput');
    DOM.categoryLinks = document.querySelectorAll('[data-category]');
    
    // Navbar
    DOM.navbarToggler = document.querySelector('.navbar-toggler');
    DOM.navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Hero
    DOM.heroCTA = document.querySelector('.hero-cta');
};

const initEventListeners = () => {
    // Cart toggle
    DOM.cartToggle?.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.innerWidth < 992) {
            openMobileCart();
        } else {
            DOM.cartDropdown?.classList.toggle('show');
        }
    });
    
    // Close cart dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mini-cart') && DOM.cartDropdown?.classList.contains('show')) {
            DOM.cartDropdown.classList.remove('show');
        }
    });
    
    // Mobile cart
    DOM.mobileCartClose?.addEventListener('click', closeMobileCart);
    DOM.mobileCartBackdrop?.addEventListener('click', closeMobileCart);
    DOM.mobileClearCart?.addEventListener('click', clearCart);
    DOM.mobileCheckoutBtn?.addEventListener('click', () => {
        window.location.href = 'odeme.html';
    });
    
    // Clear cart desktop
    DOM.clearCartBtn?.addEventListener('click', clearCart);
    DOM.checkoutBtn?.addEventListener('click', () => {
        window.location.href = 'odeme.html';
    });
    
    // Search
    DOM.searchInput?.addEventListener('input', (e) => handleSearch(e.target.value));
    
    // Category filter
    DOM.categoryLinks?.forEach(link => {
        link.addEventListener('click', handleCategoryFilter);
    });
    
    // Navbar toggle
    DOM.navbarToggler?.addEventListener('click', toggleMobileMenu);
    
    // Hero CTA
    DOM.heroCTA?.addEventListener('click', () => {
        DOM.productGrid?.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Event delegation for dynamic elements
    document.body.addEventListener('click', (e) => {
        handleAddToCart(e);
        handleQuantityChange(e);
        handleRemoveItem(e);
    });
    
    // Swipe gestures
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileCart();
            closeMobileMenu();
            DOM.cartDropdown?.classList.remove('show');
        }
    });
    
    // Window resize
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth >= 992) {
            closeMobileCart();
        }
    }, 250));
};

const init = async () => {
    try {
        initDOM();
        await loadCart();
        initEventListeners();
        updateCartUI();
        renderProducts();
        
        console.log('Moto 81 App initialized successfully');
    } catch (error) {
        console.error('Initialization error:', error);
    }
};

// Start application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

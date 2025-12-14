/**
 * Moto 81 - Premium Motorcycle E-Commerce Application
 *
 * Main application script handling product display, cart management,
 * search functionality, and user interactions.
 *
 * @version 1.0.1 (Fixed & Updated)
 * @author Moto 81 Development Team
 * @since 2025
 */

'use strict';

// =============================================================================
// APPLICATION CONFIGURATION AND CONSTANTS
// =============================================================================

/**
 * Application configuration object
 */
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
 * Each product includes id, name, brand, price, image, category, and optional discount info
 */
const PRODUCTS = [
    // NMAX Products
    {id:1, name:'Artçı Demir 24', brand:'Moto 81', price:1600.00, img:'nmaxdemir.jpg', category:'nmax'},
    {id:2, name:'Depo Kapağı 24', brand:'Moto 81', price:800.00, img:'nmaxdepo.jpg', category:'nmax'},
    {id:3, name:'Şeffaf Filtre Kapağı 24-25', brand:'Moto 81', price:2700.00, img:'nmaxfiltre.jpg', category:'nmax'},
    {id:4, name:'Karbon Filtre Kapağı 24-25', brand:'Moto 81', price:2500.00, img:'nmaxfiltrekarbon.jpg', category:'nmax'},
    {id:5, name:'Gidon Kapağı', brand:'Moto 81', price:1400.00, img:'nmaxgidon.jpg', category:'nmax', isDiscounted: true, discountPercentage: 12},
    {id:6, name:'Kontak Kapağı', brand:'Moto 81', price:1600.00, img:'nmaxkontak.jpg', category:'nmax'},
    {id:7, name:'Radyatör Kapağı 24-25', brand:'Moto 81', price:1800.00, img:'nmaxradyator.jpg', category:'nmax'},
    {id:8, name:'Sinyal Üstü Kapağı', brand:'Moto 81', price:1800.00, img:'nmaxsinyalustu.jpg', category:'nmax'},
    {id:9, name:'Stop Altı Kapağı', brand:'Moto 81', price:900.00, img:'nmaxstopalti.jpg', category:'nmax'},
    {id:10, name:'Varyatör Kapağı', brand:'Moto 81', price:2500.00, img:'nmaxvaryator.jpg', category:'nmax'},
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

    // PCX Products
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
    {id:21, name:'Pcx Karbon Tutamaç', brand:'Moto 81', price:2500.00, img:'pcxarkademir.jpg', category:'pcx'}, // BURADAKİ VİRGÜL EKLENDİ (HATA BURADAYDI)
    {id:42, name:'Pcx Karbon ', brand:'Moto 81', price:2500.00, img:'pcxarkademir.jpg', category:'pcx'},

    // --- BURAYA YENİ BİR ÖRNEK ÜRÜN EKLİYORUM ---
    // Yeni ürün eklerken bu şablonu kullanabilirsiniz. ID'si benzersiz olmalı.
    {
        id: 100, 
        name: 'ÖRNEK YENİ ÜRÜN (NMAX)', 
        brand: 'Moto 81', 
        price: 1250.00, 
        img: 'resim_yok.jpg', 
        category: 'nmax',
        isDiscounted: true,
        discountPercentage: 10
    }
];

// =============================================================================
// DOM ELEMENT REFERENCES
// =============================================================================

/**
 * Cached DOM element references for performance
 */
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
    // Mobile cart elements
    mobileCartDrawer: document.getElementById('mobileCartDrawer'),
    mobileCartBackdrop: document.getElementById('mobileCartBackdrop'),
    mobileCartClose: document.getElementById('mobileCartClose'),
    mobileCartContent: document.getElementById('mobileCartContent'),
    mobileCartTotal: document.getElementById('mobileCartTotal'),
    mobileEmptyCart: document.getElementById('mobileEmptyCart'),
    mobileClearCart: document.getElementById('mobileClearCart'),
    mobileCheckoutBtn: document.getElementById('mobileCheckoutBtn')
};

// Debug: Check if cart count element exists
if (!DOM.cartCount) {
    console.error('Cart count element not found!');
} else {
    console.log('Cart count element found:', DOM.cartCount);
}

// =============================================================================
// APPLICATION STATE
// =============================================================================

/**
 * Global application state
 */
let cart = [];
let currentCategory = 'all';

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Format currency amount for Turkish Lira
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
    return Number(amount).toLocaleString('tr-TR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) + ' ₺';
}

/**
 * Calculate discounted price with validation
 * @param {number} price - Original price
 * @param {number} discountPercentage - Discount percentage
 * @returns {number} Discounted price or original price if invalid
 */
function calculateDiscountedPrice(price, discountPercentage) {
    // Validate inputs
    if (typeof price !== 'number' || price < 0 || !isFinite(price)) {
        console.warn('Invalid price detected:', price);
        return price;
    }

    if (typeof discountPercentage !== 'number' || discountPercentage < 0 || !isFinite(discountPercentage)) {
        console.warn('Invalid discount percentage detected:', discountPercentage);
        return price;
    }

    // Cap discount at maximum
    const validDiscount = Math.min(discountPercentage, CONFIG.MAX_DISCOUNT_PERCENTAGE);
    const discountedPrice = price * (1 - validDiscount / 100);

    // Ensure price doesn't become negative
    return Math.max(discountedPrice, 0);
}

/**
 * Debounce function to limit execution frequency
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
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

/**
 * Find product by ID
 * @param {number} productId - Product ID to find
 * @returns {Object|null} Product object or null if not found
 */
function findProductById(productId) {
    return PRODUCTS.find(p => p.id === productId) || null;
}

/**
 * Get current price for a product (handles discounts)
 * @param {Object} product - Product object
 * @returns {number} Current price after discount
 */
function getCurrentProductPrice(product) {
    if (!product || typeof product !== 'object') {
        console.warn('Invalid product object:', product);
        return 0;
    }

    if (product.isDiscounted && product.discountPercentage) {
        return calculateDiscountedPrice(product.price, product.discountPercentage);
    }

    // Validate regular price
    if (typeof product.price !== 'number' || product.price < 0 || !isFinite(product.price)) {
        console.warn('Invalid product price:', product.price);
        return 0;
    }

    return product.price;
}

// =============================================================================
// CART MANAGEMENT
// =============================================================================

/**
 * Validate cart data structure and integrity
 * @param {Array} cartData - Cart data to validate
 * @returns {Array} Validated and cleaned cart data
 */
function validateCartData(cartData) {
    if (!Array.isArray(cartData)) {
        console.warn('Cart data is not an array, using empty cart');
        return [];
    }

    return cartData.filter(item => {
        // Basic structure validation
        if (!item || typeof item !== 'object') {
            return false;
        }

        // Required fields validation
        if (!item.id || typeof item.id !== 'number') {
            return false;
        }

        if (!item.name || typeof item.name !== 'string') {
            return false;
        }

        // Quantity validation
        if (!item.qty || typeof item.qty !== 'number' || item.qty < CONFIG.MIN_QUANTITY || item.qty > CONFIG.MAX_QUANTITY) {
            return false;
        }

        // Check if product still exists
        const product = findProductById(item.id);
        if (!product) {
            console.warn('Product not found for cart item:', item.id);
            return false;
        }

        return true;
    });
}

/**
 * Load cart from localStorage with robust error handling and recovery
 */
async function loadCart() {
    let attempts = 0;
    const maxAttempts = CONFIG.STORAGE_RETRY_ATTEMPTS;

    const loadWithRetry = async () => {
        while (attempts < maxAttempts) {
            try {
                // Try primary storage
                const savedCart = localStorage.getItem(CONFIG.CART_KEY);
                if (savedCart) {
                    const parsedCart = JSON.parse(savedCart);
                    const validatedCart = validateCartData(parsedCart);

                    if (validatedCart.length > 0) {
                        cart = validatedCart;
                        console.log('Cart loaded successfully from primary storage');
                        return;
                    }
                }

                // Try backup storage if primary failed or was empty
                const backupCart = localStorage.getItem(CONFIG.CART_BACKUP_KEY);
                if (backupCart) {
                    const parsedBackup = JSON.parse(backupCart);
                    const validatedBackup = validateCartData(parsedBackup);

                    if (validatedBackup.length > 0) {
                        cart = validatedBackup;
                        console.log('Cart recovered from backup storage');
                        // Restore primary storage
                        saveCartToStorage(validatedBackup, CONFIG.CART_KEY);
                        return;
                    }
                }

                // No valid cart data found
                cart = [];
                console.log('No valid cart data found, starting with empty cart');
                return;

            } catch (error) {
                attempts++;
                console.error(`Cart load attempt ${attempts} failed:`, error);

                if (attempts >= maxAttempts) {
                    // Final fallback: try to recover from sessionStorage or reset
                    try {
                        const sessionCart = sessionStorage.getItem(CONFIG.CART_KEY);
                        if (sessionCart) {
                            const parsedSession = JSON.parse(sessionCart);
                            cart = validateCartData(parsedSession);
                            console.log('Cart recovered from sessionStorage backup');
                            return;
                        }
                    } catch (sessionError) {
                        console.error('SessionStorage recovery failed:', sessionError);
                    }

                    cart = [];
                    return;
                }

                // Wait before retry
                await new Promise(resolve => setTimeout(resolve, CONFIG.STORAGE_RETRY_DELAY));
            }
        }
    };

    await loadWithRetry();
}


/**
 * Save cart data to specified storage with error handling
 * @param {Array} cartData - Cart data to save
 * @param {string} storageKey - Storage key to use
 * @returns {boolean} Success status
 */
function saveCartToStorage(cartData, storageKey = CONFIG.CART_KEY) {
    try {
        const serializedData = JSON.stringify(cartData);
        localStorage.setItem(storageKey, serializedData);

        // Also save to sessionStorage as backup
        sessionStorage.setItem(CONFIG.CART_KEY, serializedData);

        // Create backup in secondary storage
        if (storageKey === CONFIG.CART_KEY) {
            localStorage.setItem(CONFIG.CART_BACKUP_KEY, serializedData);
        }

        return true;
    } catch (error) {
        console.error('Error saving cart to storage:', error);
        return false;
    }
}

/**
 * Save cart to localStorage with comprehensive error handling
 */
function saveCart() {
    // Validate cart before saving
    const validatedCart = validateCartData(cart);

    if (validatedCart.length !== cart.length) {
        console.warn('Cart data was validated and cleaned before saving');
        cart = validatedCart;
    }

    const success = saveCartToStorage(cart);

    if (!success) {
        // Try fallback to sessionStorage only
        try {
            sessionStorage.setItem(CONFIG.CART_KEY, JSON.stringify(cart));
        } catch (fallbackError) {
            console.error('Critical: Could not save cart to any storage:', fallbackError);
        }
    }
}

/**
 * Update cart UI elements
 */
function updateCartUI() {
    updateCartCount();
    updateCartItems();
    updateCartTotal();
    updateMobileCartUI(); // Update mobile cart UI
    saveCart();
}

/**
 * Update cart count badge
 */
function updateCartCount() {
    if (!DOM.cartCount) {
        console.error('Cart count element not found in updateCartCount!');
        return;
    }
    
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    console.log('Updating cart count to:', totalItems);
    DOM.cartCount.textContent = totalItems;
    DOM.cartCount.setAttribute('aria-label', `${totalItems} items in cart`);
    
    // Add pulse animation when count changes
    DOM.cartCount.classList.add('pulse');
    setTimeout(() => {
        DOM.cartCount.classList.remove('pulse');
    }, 600);
}

/**
 * Update cart items display using stored pricing
 */
function updateCartItems() {
    DOM.cartItems.innerHTML = '';

    if (cart.length === 0) {
        DOM.cartItems.innerHTML = '<div class="empty-cart-state text-center py-5"><div class="empty-cart-icon mb-3">🛒</div><div class="empty-cart-text">Sepetiniz boş</div><div class="empty-cart-subtitle">Harika ürünlerimizi keşfetmek için alışverişe devam edin!</div></div>';
        return;
    }

    cart.forEach(item => {
        const originalProduct = findProductById(item.id);
        if (!originalProduct) {
            console.warn('Product not found for cart item:', item.id);
            return;
        }

        // Use price from when item was added, not current market price
        const displayPrice = item.priceAtAdd || item.price || 0;

        // Apply discount if it was stored with the item
        const finalPrice = item.isDiscounted && item.discountPercentage
            ? calculateDiscountedPrice(displayPrice, item.discountPercentage)
            : displayPrice;

        const cartItemElement = createCartItemElement(item, finalPrice, originalProduct);
        DOM.cartItems.appendChild(cartItemElement);
    });
}

/**
 * Create cart item DOM element with improved accessibility and pricing
 * @param {Object} item - Cart item
 * @param {number} displayPrice - Price to display (stored price)
 * @param {Object} product - Original product object
 * @returns {HTMLElement} Cart item element
 */
function createCartItemElement(item, displayPrice, product) {
    const element = document.createElement('div');
    element.className = 'cart-item';
    element.setAttribute('data-product-id', item.id);

    // Check if price has changed since item was added
    const currentMarketPrice = getCurrentProductPrice(product);
    const priceChanged = Math.abs(currentMarketPrice - displayPrice) > 0.01;
    const priceIndicator = priceChanged ? ' ⚠️' : '';

    element.innerHTML = `
        <img alt="${item.name}" src="${item.img}" loading="lazy">
        <div class="cart-meta">
            <b>${item.name}</b>
            <div class="text-muted">${item.brand} · ${formatCurrency(displayPrice)} x ${item.qty}${priceIndicator}</div>
            ${priceChanged ? `<small class="text-warning" style="font-size: 11px;">Fiyat güncellendi</small>` : ''}
        </div>
        <div class="cart-quantity-controls">
            <button class="qty-btn decrease-qty-btn" data-id="${item.id}" aria-label="Decrease quantity">−</button>
            <span class="qty-display" aria-label="Quantity: ${item.qty}">${item.qty}</span>
            <button class="qty-btn increase-qty-btn" data-id="${item.id}" aria-label="Increase quantity">+</button>
            <button class="qty-btn remove-item-btn" data-id="${item.id}" style="background: var(--accent); color: white; margin-left: 0.5rem;" aria-label="Remove item">×</button>
        </div>
    `;
    return element;
}

/**
 * Update cart total display using stored prices (not current market prices)
 * This preserves the price the user originally agreed to pay
 */
function updateCartTotal() {
    const total = cart.reduce((sum, item) => {
        // Use stored price from when item was added to cart
        const itemPrice = item.priceAtAdd || item.price || 0;

        // If item has discount info stored, use that
        if (item.isDiscounted && item.discountPercentage) {
            return sum + (calculateDiscountedPrice(itemPrice, item.discountPercentage) * item.qty);
        }

        return sum + (itemPrice * item.qty);
    }, 0);

    DOM.cartTotal.textContent = formatCurrency(total);

    // Cart count is already updated in updateCartCount function
}

/**
 * Add product to cart with animation and comprehensive validation
 * @param {number} productId - Product ID to add
 * @param {HTMLElement} buttonElement - Button element that triggered the action
 */
function addToCart(productId, buttonElement) {
    // Validate product ID
    if (typeof productId !== 'number' || productId <= 0) {
        console.error('Invalid product ID:', productId);
        return;
    }

    const product = findProductById(productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    // Check if product is in stock (placeholder for future inventory system)
    if (product.outOfStock) {
        return;
    }

    // Create flying animation
    if (buttonElement && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        createFlyingImageAnimation(product.img, buttonElement);
    }

    // Get current price to preserve user's price
    const currentPrice = getCurrentProductPrice(product);
    const productPriceAtAdd = product.price;

    // Update cart
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        // Check if adding would exceed maximum quantity
        if (existingItem.qty >= CONFIG.MAX_QUANTITY) {
            return;
        }

        existingItem.qty += 1;
    } else {
        // Validate cart capacity (placeholder for cart size limits)
        if (cart.length >= 50) { // Prevent cart from becoming too large
            return;
        }

        cart.push({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: productPriceAtAdd, // Store original price
            priceAtAdd: currentPrice, // Store price at time of addition
            qty: 1,
            img: product.img,
            isDiscounted: product.isDiscounted,
            discountPercentage: product.discountPercentage,
            addedAt: new Date().toISOString() // Track when item was added
        });
    }

    // Animate cart button
    animateCartButton();

    // Update UI
    updateCartUI();
}

/**
 * Animate cart button when item is added
 */
function animateCartButton() {
    DOM.cartToggle.style.transform = `scale(${CONFIG.CART_ANIMATION_SCALE}) rotate(5deg)`;
    DOM.cartToggle.style.boxShadow = 'var(--shadow-glow)';

    setTimeout(() => {
        DOM.cartToggle.style.transform = 'scale(1) rotate(0deg)';
        DOM.cartToggle.style.boxShadow = 'var(--shadow-lg)';
    }, 300);
}

/**
 * Confirm and remove item from cart with user confirmation
 * @param {number} productId - Product ID to remove
 * @param {string} productName - Product name for confirmation
 */
function removeFromCart(productId, productName = null) {
    const item = cart.find(cartItem => cartItem.id === productId);
    if (!item) {
        console.warn('Item not found in cart:', productId);
        return;
    }

    const itemName = productName || item.name;

    cart = cart.filter(cartItem => cartItem.id !== productId);
    updateCartUI();
}

/**
 * Update item quantity in cart with validation and limits
 * @param {number} productId - Product ID
 * @param {number} change - Quantity change (+1 or -1)
 */
function updateCartItemQuantity(productId, change) {
    const item = cart.find(cartItem => cartItem.id === productId);
    if (!item) {
        console.warn('Item not found in cart:', productId);
        return;
    }

    const newQty = item.qty + change;
    const productName = item.name;

    // Validate new quantity
    if (newQty < CONFIG.MIN_QUANTITY) {
        // Ask for confirmation before removing
        removeFromCart(productId, productName);
        return;
    }

    if (newQty > CONFIG.MAX_QUANTITY) {
        return;
    }

    // Update quantity
    item.qty = newQty;
    updateCartUI();
}

/**
 * Clear all items from cart with user confirmation
 */
function clearCart() {
    if (cart.length === 0) {
        return;
    }

    const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
    cart = [];
    updateCartUI();
}

// =============================================================================
// MOBILE CART DRAWER FUNCTIONALITY
// =============================================================================

/**
 * Check if device is mobile based on viewport width
 * @returns {boolean} True if mobile device
 */
function isMobileDevice() {
    return window.innerWidth <= 991.98; // Bootstrap lg breakpoint
}

/**
 * Open mobile cart drawer
 */
function openMobileCart() {
    if (!DOM.mobileCartDrawer || !isMobileDevice()) return;

    DOM.mobileCartDrawer.classList.add('open');
    DOM.mobileCartBackdrop.classList.add('show');

    // Prevent body scroll when drawer is open
    document.body.style.overflow = 'hidden';

    // Focus management for accessibility
    DOM.mobileCartClose.focus();
}

/**
 * Close mobile cart drawer
 */
function closeMobileCart() {
    if (!DOM.mobileCartDrawer) return;

    DOM.mobileCartDrawer.classList.remove('open');
    DOM.mobileCartBackdrop.classList.remove('show');

    // Restore body scroll
    document.body.style.overflow = '';

    // Return focus to cart toggle button
    if (DOM.cartToggle) {
        DOM.cartToggle.focus();
    }
}

/**
 * Toggle mobile cart drawer
 */
function toggleMobileCart() {
    if (DOM.mobileCartDrawer.classList.contains('open')) {
        closeMobileCart();
    } else {
        openMobileCart();
    }
}

/**
 * Update mobile cart UI
 */
function updateMobileCartUI() {
    if (!DOM.mobileCartContent || !DOM.mobileCartTotal || !DOM.mobileEmptyCart) {
        return;
    }

    // Update mobile cart total
    const total = cart.reduce((sum, item) => {
        const itemPrice = item.priceAtAdd || item.price || 0;
        if (item.isDiscounted && item.discountPercentage) {
            return sum + (calculateDiscountedPrice(itemPrice, item.discountPercentage) * item.qty);
        }
        return sum + (itemPrice * item.qty);
    }, 0);

    DOM.mobileCartTotal.textContent = formatCurrency(total);

    // Update mobile cart items
    if (cart.length === 0) {
        showMobileEmptyCart();
    } else {
        showMobileCartItems();
    }
}

/**
 * Show empty mobile cart state
 */
function showMobileEmptyCart() {
    if (!DOM.mobileCartContent || !DOM.mobileEmptyCart) return;

    DOM.mobileCartContent.innerHTML = '';
    DOM.mobileCartContent.appendChild(DOM.mobileEmptyCart.cloneNode(true));
}

/**
 * Show mobile cart items
 */
function showMobileCartItems() {
    if (!DOM.mobileCartContent) return;

    DOM.mobileCartContent.innerHTML = '';

    cart.forEach(item => {
        const originalProduct = findProductById(item.id);
        if (!originalProduct) return;

        const displayPrice = item.priceAtAdd || item.price || 0;
        const finalPrice = item.isDiscounted && item.discountPercentage
            ? calculateDiscountedPrice(displayPrice, item.discountPercentage)
            : displayPrice;

        const mobileCartItem = createMobileCartItemElement(item, finalPrice, originalProduct);
        DOM.mobileCartContent.appendChild(mobileCartItem);
    });
}

/**
 * Create mobile cart item element
 * @param {Object} item - Cart item
 * @param {number} displayPrice - Price to display
 * @param {Object} product - Original product object
 * @returns {HTMLElement} Mobile cart item element
 */
function createMobileCartItemElement(item, displayPrice, product) {
    const element = document.createElement('div');
    element.className = 'mobile-cart-item';
    element.setAttribute('data-product-id', item.id);

    // Check if price has changed since item was added
    const currentMarketPrice = getCurrentProductPrice(product);
    const priceChanged = Math.abs(currentMarketPrice - displayPrice) > 0.01;

    element.innerHTML = `
        <img alt="${item.name}" src="${item.img}" loading="lazy">
        <div class="mobile-cart-meta">
            <b>${item.name}</b>
            <div class="text-muted">${item.brand} · ${formatCurrency(displayPrice)} x ${item.qty}</div>
            ${priceChanged ? '<small class="text-warning" style="font-size: 11px;">Fiyat güncellendi</small>' : ''}
            <div class="mobile-quantity-controls">
                <button class="mobile-qty-btn mobile-decrease-qty-btn" data-id="${item.id}" aria-label="Decrease quantity">
                    <span>−</span>
                </button>
                <span class="mobile-qty-display" aria-label="Quantity: ${item.qty}">${item.qty}</span>
                <button class="mobile-qty-btn mobile-increase-qty-btn" data-id="${item.id}" aria-label="Increase quantity">
                    <span>+</span>
                </button>
            </div>
        </div>
        <button class="mobile-remove-btn mobile-remove-item-btn" data-id="${item.id}" aria-label="Remove item">
            ×
        </button>
    `;

    return element;
}

/**
 * Initialize mobile cart event listeners
 */
function initializeMobileCartListeners() {
    // Mobile cart close button
    if (DOM.mobileCartClose) {
        DOM.mobileCartClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMobileCart();
        });
    }

    // Mobile cart backdrop
    if (DOM.mobileCartBackdrop) {
        DOM.mobileCartBackdrop.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMobileCart();
        });
    }

    // Mobile cart action buttons
    if (DOM.mobileClearCart) {
        DOM.mobileClearCart.addEventListener('click', (e) => {
            e.stopPropagation();
            clearCart();
            closeMobileCart();
        });
    }

    if (DOM.mobileCheckoutBtn) {
        DOM.mobileCheckoutBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMobileCart();
            window.location.href = "odeme.html";
        });
    }

    // Enhanced cart toggle for mobile detection
    if (DOM.cartToggle) {
        DOM.cartToggle.addEventListener('click', (e) => {
            if (isMobileDevice()) {
                e.preventDefault();
                e.stopPropagation();
                toggleMobileCart();
            }
            // Allow default Bootstrap dropdown behavior on desktop
        });
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        if (!isMobileDevice() && DOM.mobileCartDrawer.classList.contains('open')) {
            closeMobileCart();
        }
    });

    // Initialize mobile touch gestures
    initializeMobileGestures();
}

/**
 * Handle Escape key for mobile cart
 */
function handleMobileCartKeyboard(event) {
    if (event.key === 'Escape' && DOM.mobileCartDrawer.classList.contains('open')) {
        closeMobileCart();
    }
}

/**
 * Initialize mobile touch gestures for cart drawer
 */
function initializeMobileGestures() {
    if (!DOM.mobileCartDrawer) return;

    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    // Touch start event
    DOM.mobileCartDrawer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    // Touch move event (for potential future enhancements)
    DOM.mobileCartDrawer.addEventListener('touchmove', (e) => {
        // Could add real-time drawer animation here
    }, { passive: true });

    // Touch end event
    DOM.mobileCartDrawer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipeGesture(touchStartX, touchEndX, touchStartY, touchEndY);
    }, { passive: true });

    // Prevent default touch behaviors that interfere with our swipe detection
    DOM.mobileCartDrawer.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const drawerRect = DOM.mobileCartDrawer.getBoundingClientRect();

        // Only prevent default if we're swiping horizontally near the edge
        if (touch.clientX > drawerRect.width - 50) {
            e.preventDefault();
        }
    }, { passive: false });
}

/**
 * Handle swipe gesture for cart drawer
 * @param {number} startX - Starting X coordinate
 * @param {number} endX - Ending X coordinate
 * @param {number} startY - Starting Y coordinate
 * @param {number} endY - Ending Y coordinate
 */
function handleSwipeGesture(startX, endX, startY, endY) {
    const swipeDistanceX = endX - startX;
    const swipeDistanceY = endY - startY;
    const minSwipeDistance = 50; // Minimum distance for swipe gesture
    const maxVerticalDistance = 100; // Maximum vertical movement to consider as horizontal swipe

    // Check if it's a horizontal swipe (right to left)
    if (Math.abs(swipeDistanceX) > minSwipeDistance && Math.abs(swipeDistanceY) < maxVerticalDistance) {
        if (swipeDistanceX < 0) {
            // Swipe left - could trigger future functionality
            console.log('Swipe left detected');
        } else {
            // Swipe right - close drawer
            closeMobileCart();
        }
    }
}

/**
 * Add haptic feedback for mobile interactions
 */
function triggerHapticFeedback(type = 'light') {
    if ('vibrate' in navigator) {
        switch (type) {
            case 'light':
                navigator.vibrate(10);
                break;
            case 'medium':
                navigator.vibrate(25);
                break;
            case 'heavy':
                navigator.vibrate(50);
                break;
            case 'success':
                navigator.vibrate([10, 50, 10]);
                break;
            case 'error':
                navigator.vibrate([100, 50, 100]);
                break;
            default:
                navigator.vibrate(10);
        }
    }
}

/**
 * Enhanced mobile cart open with haptic feedback
 */
function openMobileCartWithFeedback() {
    openMobileCart();
    triggerHapticFeedback('light');
}

/**
 * Enhanced mobile cart close with haptic feedback
 */
function closeMobileCartWithFeedback() {
    closeMobileCart();
    triggerHapticFeedback('light');
}

// =============================================================================
// PRODUCT DISPLAY
// =============================================================================

/**
 * Render products in the grid
 * @param {Array} productsToRender - Products to display
 */
function renderProducts(productsToRender = PRODUCTS) {
    DOM.productGrid.innerHTML = '';

    if (productsToRender.length === 0) {
        showEmptyState();
        return;
    }

    productsToRender.forEach(product => {
        const productElement = createProductCardElement(product);
        DOM.productGrid.appendChild(productElement);
    });
}

/**
 * Create product card DOM element
 * @param {Object} product - Product object
 * @returns {HTMLElement} Product card element
 */
function createProductCardElement(product) {
    const container = document.createElement('div');
    container.className = 'product-item';

    const priceHTML = generatePriceHTML(product);
    const discountBadge = generateDiscountBadge(product);

    container.innerHTML = `
        <div class="card h-100">
            ${discountBadge}
            <div class="thumb">
                <img src="${product.img}" class="card-img-top" alt="${product.name}">
            </div>
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text brand-text">${product.brand}</p>
                <div class="card-price-info">
                    ${priceHTML}
                </div>
            </div>
            <div class="actions">
                <button class="btn add-to-cart-btn" data-id="${product.id}">Sepete Ekle</button>
            </div>
        </div>
    `;

    return container;
}

/**
 * Generate price HTML for product card
 * @param {Object} product - Product object
 * @returns {string} Price HTML string
 */
function generatePriceHTML(product) {
    if (product.isDiscounted && product.discountPercentage) {
        const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
        return `
            <p class="card-text original-price">${formatCurrency(product.price)}</p>
            <p class="card-text current-price discounted-price">${formatCurrency(discountedPrice)}</p>
        `;
    }
    return `<p class="card-text current-price">${formatCurrency(product.price)}</p>`;
}

/**
 * Generate discount badge HTML
 * @param {Object} product - Product object
 * @returns {string} Discount badge HTML or empty string
 */
function generateDiscountBadge(product) {
    if (product.isDiscounted && product.discountPercentage) {
        return `<span class="discount-badge">-%${product.discountPercentage}</span>`;
    }
    return '';
}

/**
 * Show empty state when no products found
 */
function showEmptyState() {
    DOM.productGrid.innerHTML = `
        <div class="col-12 text-center text-muted py-5">
            <h4>Üzgünüz, aradığınız kriterlere uygun ürün bulunamadı.</h4>
            <p>Farklı arama terimleri veya kategoriler deneyin.</p>
        </div>
    `;
}

// =============================================================================
// SEARCH FUNCTIONALITY
// =============================================================================

/**
 * Perform product search
 * @param {string} query - Search query
 */
function performSearch(query) {
    const normalizedQuery = query.toLowerCase().trim();

    if (!normalizedQuery) {
        renderProducts();
        return;
    }

    const filteredProducts = PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.brand.toLowerCase().includes(normalizedQuery)
    );

    renderProducts(filteredProducts);
    clearActiveCategory();
}

/**
 * Synchronized search between main and modal inputs
 */
const debouncedSearch = debounce(performSearch, CONFIG.DEBOUNCE_DELAY);


// =============================================================================
// CATEGORY FILTERING
// =============================================================================

/**
 * Filter products by category
 * @param {string} category - Category to filter by
 */
function filterByCategory(category) {
    currentCategory = category;

    // Update active state
    DOM.categoryLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`[data-category="${category}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Filter and render products
    let filteredProducts = PRODUCTS;
    if (category !== 'all') {
        filteredProducts = PRODUCTS.filter(product => product.category === category);
    }

    renderProducts(filteredProducts);

    // Clear search
    DOM.searchInput.value = '';
}

/**
 * Clear active category state
 */
function clearActiveCategory() {
    DOM.categoryLinks.forEach(link => link.classList.remove('active'));
}

// =============================================================================
// ANIMATIONS
// =============================================================================

/**
 * Create flying image animation
 * @param {string} imgSrc - Image source
 * @param {HTMLElement} startElement - Starting element for animation
 */
function createFlyingImageAnimation(imgSrc, startElement) {
    const flyingImage = document.createElement('img');
    flyingImage.src = imgSrc;
    flyingImage.className = 'flying-image';

    // Calculate starting position
    const startRect = startElement.getBoundingClientRect();
    const cartRect = DOM.cartToggle.getBoundingClientRect();

    // Set initial position
    flyingImage.style.left = `${startRect.left + startRect.width / 2 - CONFIG.FLYING_IMAGE_SIZE / 2}px`;
    flyingImage.style.top = `${startRect.top + startRect.height / 2 - CONFIG.FLYING_IMAGE_SIZE / 2}px`;

    document.body.appendChild(flyingImage);

    // Animate to cart position
    setTimeout(() => {
        flyingImage.style.left = `${cartRect.left + cartRect.width / 2 - CONFIG.FLYING_IMAGE_SIZE / 2}px`;
        flyingImage.style.top = `${cartRect.top + cartRect.height / 2 - CONFIG.FLYING_IMAGE_SIZE / 2}px`;
    }, 50);

    // Remove after animation
    setTimeout(() => {
        if (flyingImage.parentNode) {
            flyingImage.parentNode.removeChild(flyingImage);
        }
    }, CONFIG.ANIMATION_DURATION);
}

// =============================================================================
// EVENT HANDLERS
// =============================================================================

/**
 * Handle click events on the document
 * @param {Event} event - Click event
 */
function handleDocumentClick(event) {
    // Add to cart button
    const addToCartButton = event.target.closest('.add-to-cart-btn');
    if (addToCartButton) {
        const productId = parseInt(addToCartButton.dataset.id);
        addToCart(productId, addToCartButton);
        return;
    }

    // Clear cart button
    if (event.target === DOM.clearCartBtn) {
        clearCart();
        return;
    }

    // Checkout button
    if (event.target === DOM.checkoutBtn) {
        window.location.href = "odeme.html";
        return;
    }

    // Cart quantity controls
    const decreaseButton = event.target.closest('.decrease-qty-btn');
    if (decreaseButton) {
        event.stopPropagation(); // Prevent dropdown from closing
        const productId = parseInt(decreaseButton.dataset.id);
        updateCartItemQuantity(productId, -1);
        return;
    }

    const increaseButton = event.target.closest('.increase-qty-btn');
    if (increaseButton) {
        event.stopPropagation(); // Prevent dropdown from closing
        const productId = parseInt(increaseButton.dataset.id);
        updateCartItemQuantity(productId, 1);
        return;
    }

    const removeButton = event.target.closest('.remove-item-btn');
    if (removeButton) {
        event.stopPropagation(); // Prevent dropdown from closing
        const productId = parseInt(removeButton.dataset.id);
        removeFromCart(productId);
        return;
    }

    // Mobile cart quantity controls
    const mobileDecreaseButton = event.target.closest('.mobile-decrease-qty-btn');
    if (mobileDecreaseButton) {
        event.stopPropagation(); // Prevent drawer from closing
        const productId = parseInt(mobileDecreaseButton.dataset.id);
        updateCartItemQuantity(productId, -1);
        return;
    }

    const mobileIncreaseButton = event.target.closest('.mobile-increase-qty-btn');
    if (mobileIncreaseButton) {
        event.stopPropagation(); // Prevent drawer from closing
        const productId = parseInt(mobileIncreaseButton.dataset.id);
        updateCartItemQuantity(productId, 1);
        return;
    }

    const mobileRemoveButton = event.target.closest('.mobile-remove-item-btn');
    if (mobileRemoveButton) {
        event.stopPropagation(); // Prevent drawer from closing
        const productId = parseInt(mobileRemoveButton.dataset.id);
        removeFromCart(productId);
        return;
    }
}

/**
 * Handle category link clicks
 * @param {Event} event - Click event
 */
function handleCategoryClick(event) {
    event.preventDefault();
    const category = event.target.dataset.category;
    if (category) {
        filterByCategory(category);
    }
}

/**
 * Handle hero CTA click
 */
function handleHeroCTAClick() {
    DOM.productGrid.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

/**
 * Handle keyboard events
 * @param {Event} event - Keyboard event
 */
function handleKeyboardEvent(event) {

    // Escape key to close mobile menu
    if (event.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');

        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            console.log('Escape key pressed, closing mobile menu');

            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            } else {
                const bsCollapseNew = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapseNew.hide();
            }
        }

        // Escape key to close mobile cart drawer
        handleMobileCartKeyboard(event);
    }
}

// =============================================================================
// INITIALIZATION
// =============================================================================

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
    // Document click event delegation
    document.body.addEventListener('click', handleDocumentClick);

    // Category links
    DOM.categoryLinks.forEach(link => {
        link.addEventListener('click', handleCategoryClick);
    });

    // Enhanced navbar functionality
    initializeNavbar();

    // Search functionality
    DOM.searchInput.addEventListener('input', (event) => {
        debouncedSearch(event.target.value);
    });

    // Focus search input when user starts typing
    document.addEventListener('keydown', (event) => {
        // Only focus if not already in an input field and it's a character key
        if (document.activeElement.tagName !== 'INPUT' &&
            document.activeElement.tagName !== 'TEXTAREA' &&
            event.key.length === 1 &&
            !event.ctrlKey && !event.metaKey) {
            DOM.searchInput.focus();
        }
    });

    // Hero CTA
    if (DOM.heroCTA) {
        DOM.heroCTA.addEventListener('click', handleHeroCTAClick);
    }

    // Keyboard events
    document.addEventListener('keydown', handleKeyboardEvent);

    // Mobile cart functionality
    initializeMobileCartListeners();
}

/**
 * Initialize enhanced navbar functionality
 */
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Enhanced mobile menu toggle
    if (navbarToggler) {
        navbarToggler.addEventListener('click', () => {
            const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
            console.log('Navbar toggler clicked. isExpanded:', isExpanded);
            
            // Toggle animation class
            navbarToggler.classList.toggle('active');
            
            // Update ARIA attributes
            navbarToggler.setAttribute('aria-expanded', !isExpanded);
            console.log('ARIA expanded set to:', !isExpanded);
            
            // Add mobile menu backdrop
            if (!isExpanded) {
                console.log('Menu is opening, creating backdrop');
                createMobileMenuBackdrop();
            } else {
                console.log('Menu is closing, removing backdrop');
                removeMobileMenuBackdrop();
            }
        });
    }

    // Listen to Bootstrap collapse events for better synchronization
    if (navbarCollapse) {
        navbarCollapse.addEventListener('show.bs.collapse', () => {
            console.log('Bootstrap collapse: show event');
            navbarToggler.classList.add('active');
            navbarToggler.setAttribute('aria-expanded', 'true');
            createMobileMenuBackdrop();
        });

        navbarCollapse.addEventListener('hide.bs.collapse', () => {
            console.log('Bootstrap collapse: hide event');
            navbarToggler.classList.remove('active');
            navbarToggler.setAttribute('aria-expanded', 'false');
            removeMobileMenuBackdrop();
        });

        navbarCollapse.addEventListener('hidden.bs.collapse', () => {
            console.log('Bootstrap collapse: hidden event');
            // Double-check backdrop removal
            removeMobileMenuBackdrop();
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (navbarCollapse &&
            !navbarCollapse.contains(event.target) &&
            !navbarToggler.contains(event.target) &&
            navbarCollapse.classList.contains('show')) {
            
            console.log('Click outside detected, closing mobile menu');
            
            // Close menu using Bootstrap's method
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            } else {
                // Fallback: create new instance
                const bsCollapseNew = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapseNew.hide();
            }
        }
    });

    // Handle mobile menu item clicks
    const mobileNavLinks = navbar.querySelectorAll('.navbar-nav .nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Close mobile menu after navigation
            if (window.innerWidth < 992) {
                console.log('Mobile nav link clicked, closing menu');
                
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                } else {
                    // Fallback: create new instance
                    const bsCollapseNew = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapseNew.hide();
                }
            }
        });
    });
}

/**
 * Create mobile menu backdrop
 */
function createMobileMenuBackdrop() {
    // Log for debugging
    console.log('Creating mobile menu backdrop');
    
    // Remove any existing backdrops first
    const existingBackdrops = document.querySelectorAll('.mobile-menu-backdrop');
    console.log(`Found ${existingBackdrops.length} existing backdrops, removing them`);
    existingBackdrops.forEach(bd => bd.remove());
    
    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-menu-backdrop';
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        z-index: 1039;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(backdrop);
    console.log('Backdrop added to DOM');
    
    // Animate in
    requestAnimationFrame(() => {
        backdrop.style.opacity = '1';
        console.log('Backdrop opacity set to 1');
    });
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    console.log('Body scroll disabled');
}

/**
 * Remove mobile menu backdrop
 */
function removeMobileMenuBackdrop() {
    console.log('Attempting to remove mobile menu backdrop');
    
    // Remove ALL backdrops to prevent duplicates
    const backdrops = document.querySelectorAll('.mobile-menu-backdrop');
    console.log(`Found ${backdrops.length} backdrop(s) to remove`);
    
    if (backdrops.length > 0) {
        backdrops.forEach((backdrop, index) => {
            console.log(`Removing backdrop ${index + 1}`);
            backdrop.style.opacity = '0';
            
            // Remove immediately with a shorter timeout for better responsiveness
            setTimeout(() => {
                if (backdrop.parentNode) {
                    backdrop.remove();
                    console.log(`Backdrop ${index + 1} removed from DOM`);
                }
            }, 150); // Reduced from 300ms for better UX
        });
    } else {
        console.log('No backdrops found to remove');
    }
    
    // Restore body scroll immediately
    document.body.style.overflow = '';
    console.log('Body scroll restored');
    
    // Double-check after animation completes
    setTimeout(() => {
        const remainingBackdrops = document.querySelectorAll('.mobile-menu-backdrop');
        if (remainingBackdrops.length > 0) {
            console.warn(`Found ${remainingBackdrops.length} remaining backdrops, force removing`);
            remainingBackdrops.forEach(bd => bd.remove());
        }
    }, 200);
}

/**
 * Initialize the application
 */
async function initializeApp() {
    try {
        // Load saved cart (now async)
        await loadCart();

        // Setup event listeners
        initializeEventListeners();

        // Initialize UI
        updateCartUI();

        // Show all products initially
        filterByCategory('all');

        console.log('Moto 81 E-Commerce Application initialized successfully');

        // Debug: Force update cart count after initialization
        setTimeout(() => {
            updateCartCount();
            console.log('Cart count after initialization:', DOM.cartCount?.textContent);
        }, 100);

    } catch (error) {
        console.error('Application initialization failed:', error);
        handleError(error);
    }
}

// =============================================================================
// ERROR HANDLING AND PERFORMANCE MONITORING
// =============================================================================

/**
 * Global error handler
 * @param {Error} error - Error object
 */
function handleError(error) {
    console.error('Application Error:', error);

    // Here you could implement error reporting to a service
    // For now, we'll just log it
}

/**
 * Performance monitoring
 */
function logPerformanceMetrics() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            }, 0);
        });
    }
}

// =============================================================================
// APPLICATION STARTUP
// =============================================================================

/**
 * Start the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        initializeApp();
        logPerformanceMetrics();
    } catch (error) {
        handleError(error);
    }
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
    event.preventDefault();
});

// =============================================================================
// PUBLIC API (for potential future integration)
// =============================================================================

/**
 * Public API object for external integrations
 */
window.Moto81App = {
    cart: {
        getItems: () => [...cart],
        getTotal: () => cart.reduce((sum, item) => {
            const product = findProductById(item.id);
            return sum + (product ? getCurrentProductPrice(product) * item.qty : 0);
        }, 0),
        clear: clearCart,
        addItem: addToCart
    },
    products: {
        getAll: () => [...PRODUCTS],
        getByCategory: (category) => PRODUCTS.filter(p => p.category === category),
        search: performSearch
    },
    utils: {
        formatCurrency,
        calculateDiscountedPrice
    }
};

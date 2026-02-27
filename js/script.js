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

// STATE
const state = {
    currentCategory: 'all',
    isMobileCartOpen: false
};

// PRODUCT DATA
let PRODUCTS = [];

const loadProducts = async () => {
    try {
        const response = await fetch('products.json');
        PRODUCTS = await response.json();
        return PRODUCTS;
    } catch (error) {
        console.error('Ürünler yüklenirken hata oluştu:', error);
        return [];
    }
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
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};



// PRODUCT RENDERING
const renderProducts = (products) => {
    DOM.productGrid.innerHTML = '';

    if (products.length === 0) {
        DOM.productGrid.innerHTML = '<div class="col-span-full text-center py-12 text-gray-500 font-medium">Ürün bulunamadı.</div>';
        return;
    }

    let currentCategory = '';
    
    products.forEach(p => {
        if (p.category !== currentCategory) {
            currentCategory = p.category;
            const separator = document.createElement('div');
            separator.className = 'col-span-full my-6 flex items-center gap-4';
            const categoryLabels = { nmax: 'NMAX', pcx: 'PCX', xmax: 'XMAX' };
            const categoryLabel = categoryLabels[currentCategory] || currentCategory.toUpperCase();
            separator.innerHTML = `
                <div class="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#ff6b35] to-transparent"></div>
                <span class="text-[1.25rem] font-black text-gray-900 tracking-[0.15em] uppercase">${categoryLabel}</span>
                <div class="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#ff6b35] to-transparent"></div>
            `;
            DOM.productGrid.appendChild(separator);
        }
        
        const price = getCurrentPrice(p);
        const el = document.createElement('div');
        el.className = 'bg-white h-full flex flex-col justify-between rounded-[0.75rem] lg:rounded-[1rem] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] hover:border-transparent group';

        let priceHtml = p.isDiscounted
            ? `<p class="text-[0.7rem] lg:text-[0.85rem] line-through text-gray-400 font-bold mb-1 m-0">${formatCurrency(p.price)}</p>
               <p class="text-[1rem] lg:text-[1.25rem] font-extrabold text-accent m-0">${formatCurrency(price)}</p>`
            : `<p class="text-[1rem] lg:text-[1.25rem] font-extrabold text-accent m-0">${formatCurrency(p.price)}</p>`;

        el.innerHTML = `
            <div class="aspect-square bg-white flex items-center justify-center p-4 lg:p-6 relative overflow-hidden ${p.outOfStock ? 'opacity-50' : ''}">
                <img src="${p.img}" alt="${p.name}" class="max-w-[85%] max-h-[85%] object-contain transition-transform duration-500 group-hover:scale-[1.08] group-hover:rotate-[2deg]">
                ${p.outOfStock ? '<div class="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full text-[0.75rem] font-bold z-10 shadow-md">TÜKENDİ</div>' : ''}
                ${p.isDiscounted && !p.outOfStock ? `<div class="absolute top-4 right-4 bg-accent-gradient text-white px-3 py-1 rounded-full text-[0.75rem] font-extrabold z-10 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">-%${p.discountPercentage}</div>` : ''}
            </div>
            <div class="p-3 lg:p-5 flex-1 flex flex-col justify-between">
                <div>
                    <h5 class="text-[0.85rem] lg:text-[1rem] font-bold text-gray-900 mb-1 line-clamp-2 min-h-[2.6em]">${p.name}</h5>
                    <p class="text-[0.7rem] lg:text-[0.85rem] text-gray-500 mb-2">${p.brand}</p>
                </div>
                <div>${priceHtml}</div>
            </div>
            <div class="px-3 pb-3 lg:px-5 lg:pb-5">
                <button class="add-to-cart-btn w-full p-2 lg:p-3 bg-gray-900 text-white rounded-[0.5rem] lg:rounded-[0.75rem] text-[0.75rem] lg:text-[1rem] font-bold transition-colors hover:bg-[#ff6b35] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-none" 
                        data-id="${p.id}" ${p.outOfStock ? 'disabled' : ''}>
                    ${p.outOfStock ? 'Stokta Yok' : 'Sepete Ekle'}
                </button>
            </div>
        `;
        DOM.productGrid.appendChild(el);
    });
};



const toggleMobileMenu = () => {
    const isOpen = DOM.navbarCollapse.classList.toggle('show');
    DOM.navbarToggler.classList.toggle('menu-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
};

// INIT
const init = async () => {
    await loadProducts();
    renderProducts(PRODUCTS);

    // Event Listeners
    DOM.productGrid.addEventListener('click', e => {
        if (e.target.matches('.add-to-cart-btn') && !e.target.disabled) {
            const product = PRODUCTS.find(p => p.id === parseInt(e.target.dataset.id));
            if (product) {
                // Bridge to the user's addToCart
                addToCart({
                    id: product.id,
                    name: product.name,
                    price: getCurrentPrice(product),
                    image: product.img
                });
            }
        }
    });

    document.body.addEventListener('click', e => {
        // Close dropdowns on outside click
        if (!e.target.closest('.mini-cart') && DOM.cartDropdown && DOM.cartDropdown.classList.contains('show')) {
            DOM.cartDropdown.classList.remove('show');
        }
    });

    if (DOM.navbarToggler) {
        DOM.navbarToggler.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu if clicking a link inside it
    if (DOM.navbarCollapse) {
        DOM.navbarCollapse.addEventListener('click', e => {
            if (e.target.matches('a')) {
                DOM.navbarCollapse.classList.remove('show');
                if (DOM.navbarToggler) DOM.navbarToggler.classList.remove('menu-open');
                document.body.style.overflow = '';
            }
        });
    }

    if (DOM.searchInput) {
        DOM.searchInput.addEventListener('input', debounce(e => {
            const q = e.target.value.toLowerCase();
            const filtered = PRODUCTS.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            );
            renderProducts(filtered);
        }, 300));
    }

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
                if (DOM.navbarCollapse) DOM.navbarCollapse.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    });

    if (DOM.heroCTA) {
        DOM.heroCTA.addEventListener('click', () => {
            DOM.productGrid.scrollIntoView({ behavior: 'smooth' });
        });
    }
};

document.addEventListener('DOMContentLoaded', init);

// USER SIMPLE CART IMPLEMENTATION
let cart = JSON.parse(localStorage.getItem('cart')) || [];
function openCart() { document.getElementById('mobileCart').classList.add('open'); renderCart() }
function closeCart() { document.getElementById('mobileCart').classList.remove('open') }
function renderCart() { const c = document.getElementById('cartItems'), t = document.getElementById('cartTotal'); if (!cart.length) { c.innerHTML = '<p class="text-gray-500 mb-0">Sepetiniz boş</p>'; t.textContent = '0'; return } let h = '', total = 0; cart.forEach(i => { total += i.price * i.quantity; h += `<div class="flex gap-[15px] py-[15px] border-b border-[#f0f0f0] items-center"><img src="${i.image}" alt="${i.name}" class="w-[60px] h-[60px] object-cover rounded-[8px]"><div class="flex-1"><h4 class="m-0 mb-[5px] text-[14px] font-bold text-gray-900">${i.name}</h4><p class="m-0 text-[#ff6b00] font-bold">${i.price}₺</p></div><div class="flex items-center gap-2"><button onclick="decreaseQuantity(${i.id})" class="w-8 h-8 rounded-full bg-gray-200 border-none cursor-pointer text-gray-700 font-bold hover:bg-gray-300">-</button><span class="font-bold text-gray-900 min-w-[20px] text-center">${i.quantity}</span><button onclick="increaseQuantity(${i.id})" class="w-8 h-8 rounded-full bg-gray-200 border-none cursor-pointer text-gray-700 font-bold hover:bg-gray-300">+</button></div></div>` }); c.innerHTML = h; t.textContent = total.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
function increaseQuantity(id) { const item = cart.find(i => i.id === id); if (item) { item.quantity++; localStorage.setItem('cart', JSON.stringify(cart)); updateCartCount(); renderCart(); } }
function decreaseQuantity(id) { const idx = cart.findIndex(i => i.id === id); if (idx > -1) { cart[idx].quantity--; if (cart[idx].quantity <= 0) { cart.splice(idx, 1); } localStorage.setItem('cart', JSON.stringify(cart)); updateCartCount(); renderCart(); } }
function animateCartButton() { const b = document.getElementById('cartToggle'); b.classList.remove('bounce'); void b.offsetWidth; b.classList.add('bounce'); setTimeout(() => b.classList.remove('bounce'), 500); }
function addToCart(p) { const e = cart.find(i => i.id === p.id); e ? e.quantity++ : cart.push({ ...p, quantity: 1 }); localStorage.setItem('cart', JSON.stringify(cart)); updateCartCount(); animateCartButton(); }
function updateCartCount() { document.getElementById('cartCount').textContent = cart.reduce((s, i) => s + i.quantity, 0) }
function goToPayment() { window.location.href = 'odeme.html' }
document.getElementById('cartToggle').addEventListener('click', openCart);
updateCartCount();

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
    { id: 1, name: 'Artçı Demir 24', brand: 'Moto 81', price: 2000.00, img: 'nmaxdemir.jpg', category: 'nmax' },
    { id: 2, name: 'Depo Kapağı 24', brand: 'Moto 81', price: 800.00, img: 'nmaxdepo.jpg', category: 'nmax' },
    { id: 3, name: 'Şeffaf Filtre Kapağı 24-25', brand: 'Moto 81', price: 2750.00, img: 'nmaxfiltre.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 5 },
    { id: 4, name: 'Karbon Filtre Kapağı 24-25', brand: 'Moto 81', price: 2700.00, img: 'nmaxfiltrekarbon.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 10 },
    { id: 5, name: 'Gidon Kapağı', brand: 'Moto 81', price: 1400.00, img: 'nmaxgidon.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 12 },
    { id: 6, name: 'Kontak Kapağı', brand: 'Moto 81', price: 1600.00, img: 'nmaxkontak.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 30 },
    { id: 7, name: 'Radyatör Kapağı 24-25', brand: 'Moto 81', price: 1800.00, img: 'nmaxradyator.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 20 },
    { id: 8, name: 'Sinyal Üstü Kapağı', brand: 'Moto 81', price: 1800.00, img: 'nmaxsinyalustu.jpg', category: 'nmax' },
    { id: 9, name: 'Stop Altı Kapağı', brand: 'Moto 81', price: 900.00, img: 'nmaxstopalti.jpg', category: 'nmax' },
    { id: 10, name: 'Varyatör Kapağı', brand: 'Moto 81', price: 2500.00, img: 'nmaxvaryator.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 10 },
    { id: 22, name: 'Nmax Çerçeve 25', brand: 'Moto 81', price: 2200.00, img: 'nmaxgostergecercevesi.jpg', category: 'nmax' },
    { id: 23, name: 'Nmax Winglet 25', brand: 'Moto 81', price: 2000.00, img: 'nmax2025altwinglet.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 3 },
    { id: 24, name: 'Nmax Ön Panel 24', brand: 'Moto 81', price: 2300.00, img: 'nmaxoncam.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 12 },
    { id: 25, name: 'Nmax Kontak (2) 25', brand: 'Moto 81', price: 1500.00, img: 'nmax2025kontakalt.jpg', category: 'nmax' },
    { id: 26, name: 'Nmax Gidon 25', brand: 'Moto 81', price: 2400.00, img: 'nmax2025gidonkarbon.jpg', category: 'nmax' },
    { id: 27, name: 'Nmax Kontak (1) 25', brand: 'Moto 81', price: 1500.00, img: 'nmax2025kontakust.jpg', category: 'nmax' },
    { id: 28, name: 'Nmax Ön V 25', brand: 'Moto 81', price: 2000.00, img: 'nmax2025onpanelv.jpg', category: 'nmax' },
    { id: 29, name: 'Nmax Radyatör 25', brand: 'Moto 81', price: 1850.00, img: 'nmaxradyator2025.jpeg', category: 'nmax' },
    { id: 30, name: 'Nmax Depo 25', brand: 'Moto 81', price: 1300.00, img: 'nmax2025benzindepokapak.jpg', category: 'nmax' },
    { id: 31, name: 'Nmax Depo Çerçeve 25', brand: 'Moto 81', price: 1950.00, img: 'Nmax2025benzindepocevresi.jpg', category: 'nmax' },
    { id: 32, name: 'Nmax Varyatör 24', brand: 'Moto 81', price: 2400.00, img: 'nmaxvaryator.jpg', category: 'nmax' },
    { id: 33, name: 'Nmax Ön Panel 25', brand: 'Moto 81', price: 2350.00, img: 'nmaxoncam2025.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 8 },
    { id: 42, name: 'H2 Katlanır Ayna', brand: 'Moto 81', price: 1400.00, img: 'h2ayna.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 50 },
    { id: 100, name: 'Nmax 21-24 Filtre Kırmızı', brand: 'Moto 81', price: 2000, img: '21-24filtrekirmizi.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 10 },
    { id: 101, name: 'Nmax 21-24 Filtre Mavi', brand: 'Moto 81', price: 2000, img: '21-24filtremavi.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 10 },
    { id: 102, name: 'Nmax Füme/Şeffaf Stop Camı 21-24', brand: 'Moto 81', price: 2500, img: 'fumestopcam21-24.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 5 },
    { id: 103, name: 'Nmax Gidon Karbon 15-20', brand: 'Moto 81', price: 2500, img: 'gidonkarbon15-20.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 3 },
    { id: 104, name: 'Nmax 2025 Şeffaf Cam', brand: 'Moto 81', price: 3500, img: 'karbonekran.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 3 },
    { id: 105, name: 'Nmax Karbon Radyatör Kapağı', brand: 'Moto 81', price: 1500, img: 'karbonradyator.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 3 },
    { id: 106, name: 'Nmax 15-20 Gösterge', brand: 'Moto 81', price: 3500, img: 'nmax2025.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 3 },
    { id: 107, name: 'Nmax Arka Çamurluk', brand: 'Moto 81', price: 2500, img: 'nmaxarkacamurluk.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 10 },
    { id: 108, name: 'Nmax Gen 1 Varyatör', brand: 'Moto 81', price: 2500, img: 'nmaxgen1varyator.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 10 },
    { id: 109, name: 'Nmax Headers 21-24', brand: 'Moto 81', price: 4000, img: 'nmaxheaders21-24.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 0 },
    { id: 110, name: 'Nmax Karbon Ön Çamurluk', brand: 'Moto 81', price: 3000, img: 'nmaxkarboncam.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 10 },
    { id: 111, name: 'Nmax Alt Kaplama Set', brand: 'Moto 81', price: 4500, img: 'nmaxkaltinraynset.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 3 },
    { id: 112, name: 'Nmax Paspas Set', brand: 'Moto 81', price: 3000, img: 'nmaxpaspas.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 5 },
    { id: 113, name: 'Nmax Sissy Bar', brand: 'Moto 81', price: 5000, img: 'nmaxsissybar.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 9 },
    { id: 114, name: 'Nmax Şeffaf Ön Cam', brand: 'Moto 81', price: 3500, img: 'nmaxseffafcam.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 3 },
    { id: 115, name: 'Nmax Karbon Stop Kapağı', brand: 'Moto 81', price: 2500, img: 'stopkarbon.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 5 },
    { id: 116, name: 'Nmax Şeffaf Ön Cam', brand: 'Moto 81', price: 3850, img: 'seffafcamoncam.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 5 },

    // PCX ÜRÜNLERİ
    { id: 11, name: 'PCX Headers', brand: 'Moto 81', price: 3000.00, img: 'pcxheaders.jpg', category: 'pcx', isDiscounted: true, discountPercentage: 5 },
    { id: 12, name: 'Pcx 2025 Ön V', brand: 'Moto 81', price: 2200.00, img: 'pcx2025onv.jpg', category: 'pcx' },
    { id: 13, name: 'Pcx Karbon Egzoz', brand: 'Moto 81', price: 1700.00, img: 'pcxegzozset.jpg', category: 'pcx' },
    { id: 14, name: 'Pcx Çamurluk', brand: 'Moto 81', price: 2250.00, img: 'pcxoncamurluk.jpg', category: 'pcx', isDiscounted: true, discountPercentage: 12 },
    { id: 15, name: 'Pcx Füme Filtre', brand: 'Moto 81', price: 1650.00, img: 'pcxfumefiltre.jpg', category: 'pcx', isDiscounted: true, discountPercentage: 5 },
    { id: 16, name: 'Pcx Şeffaf Filtre', brand: 'Moto 81', price: 1650.00, img: 'pcxseffaffiltre.jpg', category: 'pcx', isDiscounted: true, discountPercentage: 5 },
    { id: 17, name: 'Pcx Şeffaf Radyatör', brand: 'Moto 81', price: 1550.00, img: 'pcxseffafradyator.jpg', category: 'pcx', isDiscounted: true, discountPercentage: 5 },
    { id: 18, name: 'Pcx Karbon Varyatör', brand: 'Moto 81', price: 1650.00, img: 'pcxkarbonvaryator.jpg', category: 'pcx' },
    { id: 19, name: 'Pcx Şeffaf Varyatör', brand: 'Moto 81', price: 1650.00, img: 'pcxseffafvaryator.jpg', category: 'pcx', isDiscounted: true, discountPercentage: 5 },
    { id: 20, name: 'Pcx 2024 Ön V', brand: 'Moto 81', price: 2200.00, img: 'pcx2024onv.jpg', category: 'pcx' },
    { id: 21, name: 'Pcx Karbon Tutamaç', brand: 'Moto 81', price: 2500.00, img: 'pcxarkademir.jpg', category: 'pcx' },

    // STOK DIŞI
    { id: 117, name: 'Nmax Velescope Set', brand: 'Moto 81', price: 3850, img: 'velescope.jpg', category: 'nmax', isDiscounted: true, discountPercentage: 3, outOfStock: true }
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

    products.forEach(p => {
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
const init = () => {
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

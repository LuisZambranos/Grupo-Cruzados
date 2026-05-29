// --- DATOS SIMULADOS ---
const PRODUCTS = [
  {
    id: 1,
    name: "Comedor Vidrio 4 Sillas",
    price: 1250000,
    description: "Elegante comedor con cubierta de cristal templado y cuatro sillas tapizadas en lino de alta calidad. Diseño minimalista que aporta amplitud y luminosidad a tu hogar.",
    image: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&q=80&w=800",
    isNew: true
  },
  {
    id: 2,
    name: "Sitial Siena",
    price: 345000,
    description: "Sitial de diseño ergonómico con estructura de madera de fresno y tapiz de terciopelo premium. El complemento perfecto para tu rincón de lectura o sala de estar.",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800",
    isNew: false
  },
  {
    id: 3,
    name: "Sofá Modular Lusso",
    price: 2100000,
    description: "Sofá modular expansivo, diseñado para el máximo confort. Asientos profundos y cojines rellenos de pluma sintética, tapizado en tela resistente a manchas.",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800",
    isNew: true
  },
  {
    id: 4,
    name: "Mesa de Centro Nogal",
    price: 450000,
    description: "Mesa de centro fabricada en madera maciza de nogal con un acabado natural mate. Sus líneas curvas y orgánicas la convierten en una pieza de arte funcional.",
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800",
    isNew: false
  }
];

// --- ESTADO ---
let currentView = 'home'; // 'home' | 'detail'
let selectedProduct = null;
let cart = [];
let isCartOpen = false;
let detailQuantity = 1;

// --- FORMATO ---
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

// --- RENDERIZADO DE VISTAS ---
function render() {
  const mainContent = document.getElementById('main-content');
  
  if (currentView === 'home') {
    mainContent.innerHTML = `
      <div class="animate-[fadeIn_0.5s_ease-out]">
        <!-- Hero Section -->
        <div class="bg-brand text-white rounded-b-[3rem] pb-24 pt-12 px-4 sm:px-8 text-center shadow-md mb-16 relative overflow-hidden">
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div class="relative z-10 max-w-3xl mx-auto">
            <h1 class="text-4xl sm:text-6xl font-light mb-6 tracking-wide leading-tight">
              El arte de vivir <br /> <span className="font-medium">con elegancia</span>
            </h1>
            <p class="text-white/90 text-lg sm:text-xl font-light mb-10">
              Explora nuestra exclusiva selección de mobiliario donde el diseño contemporáneo abraza la comodidad absoluta.
            </p>
            <button 
              id="btn-discover"
              class="bg-white text-brand px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform duration-300 shadow-lg cursor-pointer"
            >
              Descubrir Colección
            </button>
          </div>
        </div>

        <!-- Product Grid -->
        <div class="px-4 sm:px-8 max-w-7xl mx-auto mb-24">
          <div class="flex justify-between items-end mb-10">
            <h2 class="text-[#333333] text-3xl font-light tracking-wide">Nuevas <span class="font-medium">Llegadas</span></h2>
            <span class="text-brand cursor-pointer hover:text-[#333333] transition-colors hidden sm:block">Ver todo el catálogo →</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10" id="products-grid">
            ${PRODUCTS.map(product => `
              <div class="group flex flex-col cursor-pointer" onclick="handleViewDetail(${product.id})">
                <div class="relative aspect-[4/5] w-full overflow-hidden rounded-3xl mb-5 bg-[#f0f3f2] shadow-sm group-hover:shadow-xl transition-all duration-500">
                  ${product.isNew ? `
                    <span class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-brand text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm">
                      NUEVO
                    </span>
                  ` : ''}
                  <img 
                    src="${product.image}" 
                    alt="${product.name}" 
                    class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-multiply"
                  />
                </div>
                <div class="px-1 flex flex-col flex-grow">
                  <h3 class="text-[#333333] font-medium text-lg mb-1 group-hover:text-brand transition-colors">${product.name}</h3>
                  <p class="text-brand font-medium text-lg mb-4">${formatPrice(product.price)}</p>
                  <button 
                    class="mt-auto w-full py-3 rounded-2xl border border-brand text-brand group-hover:bg-brand group-hover:text-white transition-all duration-300 font-medium cursor-pointer"
                  >
                    Ver Detalle
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-discover')?.addEventListener('click', () => {
      window.scrollTo({ top: 500, behavior: 'smooth' });
    });

  } else if (currentView === 'detail' && selectedProduct) {
    mainContent.innerHTML = `
      <div class="animate-[fadeIn_0.5s_ease-out] pb-24">
        <!-- Banner superior -->
        <div class="bg-[#f0f3f2] pt-8 pb-12 px-4 sm:px-8 mb-12 rounded-b-[3rem]">
          <div class="max-w-7xl mx-auto">
            <button 
              onclick="handleBackToHome()"
              class="flex items-center text-brand hover:text-[#333333] transition-colors mb-8 group bg-white w-fit px-4 py-2 rounded-full shadow-sm cursor-pointer"
            >
              <i data-lucide="arrow-left" class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"></i>
              <span class="text-sm font-medium">Volver</span>
            </button>
          </div>
        </div>

        <div class="px-4 sm:px-8 max-w-7xl mx-auto -mt-24">
          <div class="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <!-- Imagen Grande -->
            <div class="w-full lg:w-1/2">
              <div class="aspect-square w-full rounded-[2.5rem] overflow-hidden bg-white shadow-2xl p-4">
                <img 
                  src="${selectedProduct.image}" 
                  alt="${selectedProduct.name}" 
                  class="w-full h-full object-cover rounded-[2rem]"
                />
              </div>
            </div>

            <!-- Info y Acciones -->
            <div class="w-full lg:w-1/2 pt-10 lg:pt-20">
              <div class="inline-block bg-[#f0f3f2] text-brand px-3 py-1 rounded-full text-sm font-medium mb-4">
                Colección Exclusiva
              </div>
              <h1 class="text-4xl sm:text-5xl font-light text-[#333333] mb-4 leading-tight">${selectedProduct.name}</h1>
              <p class="text-3xl text-brand font-medium mb-8">${formatPrice(selectedProduct.price)}</p>
              
              <p class="text-[#333333]/70 leading-relaxed mb-10 font-light text-lg">
                ${selectedProduct.description}
              </p>

              <div class="flex flex-col sm:flex-row gap-4 mb-10 items-start sm:items-center p-4 bg-[#f0f3f2] rounded-3xl">
                <!-- Selector de cantidad -->
                <div class="flex items-center bg-white rounded-2xl p-1 shadow-sm">
                  <button 
                    onclick="updateDetailQuantity(-1)"
                    class="w-12 h-12 flex items-center justify-center rounded-xl text-[#333333] hover:bg-[#f0f3f2] transition-colors cursor-pointer"
                  >
                    <i data-lucide="minus" class="w-5 h-5"></i>
                  </button>
                  <span class="w-12 text-center text-[#333333] font-medium text-lg">${detailQuantity}</span>
                  <button 
                    onclick="updateDetailQuantity(1)"
                    class="w-12 h-12 flex items-center justify-center rounded-xl text-[#333333] hover:bg-[#f0f3f2] transition-colors cursor-pointer"
                  >
                    <i data-lucide="plus" class="w-5 h-5"></i>
                  </button>
                </div>

                <!-- Botón CTA -->
                <button 
                  onclick="handleAddToCart()"
                  class="animate-soft-pulse flex-grow w-full sm:w-auto bg-brand hover:bg-brand-dark text-white py-4 px-8 rounded-2xl font-medium text-lg shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i data-lucide="shopping-cart" class="w-5 h-5"></i>
                  Añadir al carrito
                </button>
              </div>
              
              <!-- Beneficios Extra -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
                <div class="flex flex-col items-center text-center">
                  <div class="bg-[#f0f3f2] p-3 rounded-2xl text-brand mb-3">
                    <i data-lucide="truck" class="w-6 h-6"></i>
                  </div>
                  <span class="font-medium text-[#333333] text-sm">Envío Premium</span>
                  <span class="text-xs text-gray-500 mt-1">A todo el país</span>
                </div>
                <div class="flex flex-col items-center text-center">
                  <div class="bg-[#f0f3f2] p-3 rounded-2xl text-brand mb-3">
                    <i data-lucide="shield-check" class="w-6 h-6"></i>
                  </div>
                  <span class="font-medium text-[#333333] text-sm">Garantía Extendida</span>
                  <span class="text-xs text-gray-500 mt-1">2 años de cobertura</span>
                </div>
                <div class="flex flex-col items-center text-center">
                  <div class="bg-[#f0f3f2] p-3 rounded-2xl text-brand mb-3">
                    <i data-lucide="clock" class="w-6 h-6"></i>
                  </div>
                  <span class="font-medium text-[#333333] text-sm">Soporte 24/7</span>
                  <span class="text-xs text-gray-500 mt-1">Atención personalizada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Actualizar los iconos de Lucide renderizados dinámicamente
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// --- ACCIONES ---
window.handleViewDetail = (productId) => {
  selectedProduct = PRODUCTS.find(p => p.id === productId);
  detailQuantity = 1;
  currentView = 'detail';
  render();
  window.scrollTo(0, 0);
};

window.handleBackToHome = () => {
  currentView = 'home';
  selectedProduct = null;
  render();
  window.scrollTo(0, 0);
};

window.updateDetailQuantity = (amount) => {
  detailQuantity = Math.max(1, detailQuantity + amount);
  render();
};

window.handleAddToCart = () => {
  if (!selectedProduct) return;
  
  const existingItem = cart.find(item => item.product.id === selectedProduct.id);
  if (existingItem) {
    existingItem.quantity += detailQuantity;
  } else {
    cart.push({ product: selectedProduct, quantity: detailQuantity });
  }
  
  updateCartUI();
  openCart();
};

// --- ESTRUCTURA DEL CARRITO ---
window.removeFromCart = (productId) => {
  cart = cart.filter(item => item.product.id !== productId);
  updateCartUI();
};

// --- CARRITO UI ---
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartBadge = document.getElementById('cart-badge');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalContainer = document.getElementById('cart-total-container');

function openCart() {
  isCartOpen = true;
  cartDrawer.classList.remove('translate-x-full');
  cartOverlay.classList.remove('hidden');
  cartOverlay.classList.add('opacity-100');
}

function closeCart() {
  isCartOpen = false;
  cartDrawer.classList.add('translate-x-full');
  cartOverlay.classList.add('hidden');
  cartOverlay.classList.remove('opacity-100');
}

window.openCart = openCart;
window.closeCart = closeCart;

function updateCartUI() {
  // Cantidad total en badge
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  if (cartItemCount > 0) {
    cartBadge.textContent = cartItemCount;
    cartBadge.classList.remove('hidden');
  } else {
    cartBadge.classList.add('hidden');
  }

  // Items en el Drawer
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="h-full flex flex-col items-center justify-center text-brand">
        <div class="bg-[#f0f3f2] p-6 rounded-full mb-4">
          <i data-lucide="shopping-cart" class="w-12 h-12 opacity-80"></i>
        </div>
        <p class="text-lg font-medium text-[#333333]">Tu carrito está vacío</p>
        <p class="text-sm text-gray-500 mt-2">Agrega productos para comenzar</p>
      </div>
    `;
    cartTotalContainer.innerHTML = '';
  } else {
    cartItemsContainer.innerHTML = `
      <div class="flex flex-col gap-6">
        ${cart.map(item => `
          <div class="flex gap-4 items-center bg-white p-3 rounded-3xl shadow-sm border border-gray-100 animate-[fadeIn_0.3s_ease-out]">
            <div class="w-24 h-24 rounded-2xl overflow-hidden bg-[#f0f3f2] flex-shrink-0 p-1">
              <img src="${item.product.image}" alt="${item.product.name}" class="w-full h-full object-cover rounded-xl" />
            </div>
            <div class="flex-grow">
              <h4 class="text-[#333333] font-medium text-sm sm:text-base leading-tight mb-1">${item.product.name}</h4>
              <p class="text-brand text-xs font-medium mb-1">Cant: ${item.quantity}</p>
              <p class="text-[#333333] font-semibold">${formatPrice(item.product.price * item.quantity)}</p>
            </div>
            <button 
              onclick="removeFromCart(${item.product.id})"
              class="p-2 mr-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
            >
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>
        `).join('')}
      </div>
    `;

    const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    cartTotalContainer.innerHTML = `
      <div class="p-6 sm:p-8 bg-white border-t border-gray-100 rounded-bl-[2rem]">
        <div class="flex justify-between items-center mb-2 text-sm text-gray-500">
          <span>Envío</span>
          <span>Calculado en el checkout</span>
        </div>
        <div class="flex justify-between items-end mb-6">
          <span class="text-brand text-lg font-medium">Subtotal</span>
          <span class="text-[#333333] text-3xl font-light">${formatPrice(cartTotal)}</span>
        </div>
        <button class="animate-soft-pulse w-full bg-brand text-white py-5 rounded-2xl font-medium text-xl shadow-lg hover:bg-brand-dark transition-colors flex justify-center items-center gap-2 cursor-pointer">
          Proceder al pago
        </button>
      </div>
    `;
  }

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
  render();
  updateCartUI();
});

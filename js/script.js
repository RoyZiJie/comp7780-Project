// COMP 7780 Author: Zhang Zijie (Roy) 2026

// Shopping cart data
let cart = [];

// Element
const openCartBtn = document.getElementById('openCart');
const closeCartBtn = document.getElementById('closeCart');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsContainer = document.getElementById('cartItems');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Open shopping cart
openCartBtn.addEventListener('click', () => {
  cartSidebar.classList.add('active');
  cartOverlay.classList.add('active');
});

// Close shopping cart
closeCartBtn.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
  cartOverlay.classList.remove('active');
});

// Click on the mask layer to close the shopping cart
cartOverlay.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
  cartOverlay.classList.remove('active');
});

// Button event for adding to the shopping cart
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart-btn') || e.target.closest('.add-to-cart-btn')) {
    const button = e.target.classList.contains('add-to-cart-btn') ? e.target : e.target.closest('.add-to-cart-btn');
    addToCart(button);
  }
  
  // Increase the quantity
  if (e.target.classList.contains('increase-btn')) {
    const id = parseInt(e.target.dataset.id);
    increaseQuantity(id);
  }
  
  // Decrease the quantity
  if (e.target.classList.contains('decrease-btn')) {
    const id = parseInt(e.target.dataset.id);
    decreaseQuantity(id);
  }
  
  // Remove item from cart
  const removeBtn = e.target.closest('.remove-item');
  if (removeBtn) {
  const id = parseInt(removeBtn.dataset.id);
  removeFromCart(id);
  }
});

// Function for adding to the shopping cart
function addToCart(button) {
  const id = parseInt(button.dataset.id);
  const name = button.dataset.name;
  const price = parseFloat(button.dataset.price);
  const image = button.dataset.image;
  const icon = button.dataset.icon;
  
  // Check if the product is already in the shopping cart
  const existingItem = cart.find(item => item.id === id);
  
  if (existingItem) {
    // If the product already exists, increase the quantity
    existingItem.quantity += 1;
  } else {
    // Otherwise, add a new product
    cart.push({
      id,
      name,
      price,
      image,
      icon,
      quantity: 1
    });
  }
  
  // Update shopping cart display
  updateCartDisplay();
  
  // Display the success message
  showMessage(`${name} added to cart!`);
}

// Increase the quantity of goods
function increaseQuantity(id) {
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity += 1;
    updateCartDisplay();
  }
}

// Decrease the quantity of goods
function decreaseQuantity(id) {
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      updateCartDisplay();
    }
  }
}

// Remove items from the shopping cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartDisplay();
}

// Update shopping cart display
function updateCartDisplay() {
  // Update the quantity in the shopping cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  
  // Update the total price of the shopping cart
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = totalPrice.toFixed(2);
  
  // Enable/disable checkout button and update its data-href
  if (totalPrice > 0) {
    checkoutBtn.disabled = false;
    checkoutBtn.setAttribute('aria-disabled', 'false');
    checkoutBtn.dataset.href = `https://www.paypal.com/checkout?amount=${totalPrice.toFixed(2)}&currency=HKD`;
  } else {
    checkoutBtn.disabled = true;
    checkoutBtn.setAttribute('aria-disabled', 'true');
    checkoutBtn.removeAttribute('data-href');
  }
  
  // Clear the shopping cart item container
  cartItemsContainer.innerHTML = '';
  
  // Check if the shopping cart is empty
  if (cart.length === 0) {
    emptyCartMessage.style.display = 'block';
    return;
  }
  
  // Hide the message about the empty shopping cart
  emptyCartMessage.style.display = 'none';
  
  // Add to Shopping Cart Item
  cart.forEach(item => {
    const cartItemElement = document.createElement('div');
    cartItemElement.className = 'cart-item';
    
    // Check if we have an icon or should try to load an image
    let imageElement = '';
    if (item.icon) {
      imageElement = `<div class="cart-item-img cart-item-icon-container"><i class="${item.icon}"></i></div>`;
    } else {
      imageElement = `<img src="images/${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"80\" height=\"80\" viewBox=\"0 0 80 80\"><rect width=\"80\" height=\"80\" fill=\"%2337404a\"/><text x=\"40\" y=\"40\" font-family=\"Arial\" font-size=\"14\" fill=\"%2318aa5a\" text-anchor=\"middle\" dy=\".3em\">No Image</text></svg>'">`;
    }
    
    cartItemElement.innerHTML = `
      ${imageElement}
      <div class="cart-item-details">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <div class="cart-item-controls">
          <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
          <span class="item-quantity">${item.quantity}</span>
          <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
          <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(cartItemElement);
  });
}

// Display message
function showMessage(text) {
  // Create message elements
  const message = document.createElement('div');
  message.textContent = text;
  message.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #18aa5a;
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    font-family: 'Press Start 2P', cursive;
    font-size: 0.8rem;
    z-index: 2000;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    animation: fadeInOut 3s ease;
  `;
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInOut {
      0% { opacity: 0; transform: translateY(-20px); }
      15% { opacity: 1; transform: translateY(0); }
      85% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-20px); }
    }
  `;
  document.head.appendChild(style);
  
  // Add to the page
  document.body.appendChild(message);
  
  // Remove in 3 seconds
  setTimeout(() => {
    message.remove();
  }, 3000);
}

// Initialize shopping cart display
updateCartDisplay();

// Open PayPal in new tab when checkout button clicked (only when enabled)
checkoutBtn.addEventListener('click', (e) => {
  if (checkoutBtn.disabled) return;
  const url = checkoutBtn.dataset.href || 'https://www.paypal.com/signin';
  window.open(url, '_blank');
});
// Shopping Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = document.querySelector('.header-user-actions .count');

// Update cart count in the header
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.header-user-actions .count');
    cartCountElements.forEach(element => {
        element.textContent = cart.length;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(productId, name, price, image) {
    const item = {
        id: productId,
        name: name,
        price: parseFloat(price),
        image: image,
        quantity: 1
    };
    
    const existingItem = cart.find(cartItem => cartItem.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(item);
    }
    
    updateCartCount();
    showNotification('Item added to cart successfully!');
}

// Show notification
function showNotification(message) {
    const toast = document.querySelector('[data-toast]');
    const toastMessage = toast.querySelector('.toast-message');
    toastMessage.textContent = message;
    toast.classList.remove('closed');
    setTimeout(() => {
        toast.classList.add('closed');
    }, 3000);
}

// Calculate total price
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Initialize product IDs and cart functionality
function initializeProducts() {
    let productCounter = 1;
    const showcases = document.querySelectorAll('.showcase');
    
    showcases.forEach(showcase => {
        // Skip if already has an ID
        if (showcase.dataset.productId) return;
        
        const title = showcase.querySelector('.showcase-title');
        if (!title) return;
        
        const productName = title.textContent.trim().toLowerCase().replace(/\s+/g, '-');
        const productId = `${productName}-${productCounter++}`;
        showcase.dataset.productId = productId;
        
        // Find the add to cart button within this showcase
        const addToCartBtn = showcase.querySelector('.add-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const price = showcase.querySelector('.price').textContent.replace('$', '');
                const image = showcase.querySelector('img').src;
                const name = title.textContent;
                
                addToCart(productId, name, price, image);
            });
        }
    });
}

// Initialize cart count and product functionality on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    initializeProducts();
}); 
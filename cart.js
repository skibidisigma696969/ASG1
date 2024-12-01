// Retrieve cart data from localStorage or initialize it
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update cart in localStorage and display the current items in the cart
function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<tr><td colspan="5">Your cart is empty</td></tr>';
        return;
    }

    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name} (${item.color}, ${item.size})</td>
            <td><img src="${item.image}" alt="${item.name}" width="100" height="auto"></td> <!-- Display Image -->
            <td>$${item.price} USD</td>
            <td>${item.quantity}</td>
            <td><button class="remove-btn" data-index="${index}">Remove</button></td>
        `;
        cartItemsElement.appendChild(row);
    });

    // Attach event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach((button) => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        });
    });
}

// Function to add items to the cart
function addToCart(product) {
    const existingProductIndex = cart.findIndex(
        (item) => item.name === product.name && item.color === product.color && item.size === product.size
    );

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart!');
}

// Event listener for adding to cart on product pages
document.getElementById('addToCart')?.addEventListener('click', () => {
    const name = document.querySelector('h1').textContent;
    const price = 40; // Update price dynamically if needed
    const quantity = parseInt(document.getElementById('quantity').value);
    const color = document.getElementById('color').value;
    const size = document.getElementById('size').value;
    const image = document.querySelector('img.product-image').src; // Get the image from the product page

    const product = { name, price, quantity, color, size, image };
    addToCart(product);
});

// Update the cart display on the cart page
if (document.getElementById('cart-items')) {
    updateCartDisplay();
}

// Function to calculate the total price of the cart
function calculateTotalPrice() {
    let totalPrice = 0;
    cart.forEach((item) => {
        totalPrice += item.price * item.quantity;
    });
    return totalPrice;
}
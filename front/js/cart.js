document.addEventListener('DOMContentLoaded', async function () {
    const cartItemsContainer = document.getElementById('cart__items');
    const totalQuantityDisplay = document.getElementById('totalQuantity');
    const totalPriceElement = document.getElementById('totalPrice');
    const orderForm = document.getElementById('orderForm');
    const orderBtn = document.getElementById('order');

    // Log to check if elements are correctly selected
    console.log({ cartItemsContainer, totalQuantityDisplay, totalPriceElement, orderForm, orderBtn });

    async function fetchProductDetails(productId) {
        try {
            const response = await fetch(`http://localhost:3000/api/products/${productId}`);
            const product = await response.json();
            return product;
        } catch (error) {
            console.error('Error fetching product details:', error);
            return null;
        }
    }

    async function updateCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('localCart')) || [];

        // Initialize total quantity and price
        let totalQuantity = 0;
        let totalPrice = 0;

        // Clear previous cart items
        cartItemsContainer.innerHTML = '';

        // Loop through cart items and create cart item elements
        for (const item of cartItems) {
            const product = await fetchProductDetails(item.productId);
            if (product) {
                totalQuantity += item.quantity;
                totalPrice += item.quantity * product.price;

                const cartItem = createCartElement(item, product);
                cartItemsContainer.appendChild(cartItem);
            }
        }

        // Update total quantity and price on the page
        totalQuantityDisplay.innerText = totalQuantity;
        totalPriceElement.innerText = totalPrice.toFixed(2);
    }

    // Function to create a cart item element
    function createCartElement(item, product) {
        const cartItemEl = document.createElement('div');
        cartItemEl.classList.add('cart__item');
        cartItemEl.innerHTML = `
            <div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${product.altTxt}" class="productImage" />
            </div>
            <div class="cart__item__content">
                <h2>${product.name}</h2>
                <p>Color: ${item.color}</p>
                <p>Price: €${product.price}</p>
                <div class="item__content__settings__quantity">
                    <label for="itemQuantity-${item.productId}">Quantity:</label>
                    <input
                        type="number"
                        name="itemQuantity"
                        min="0"
                        max="100"
                        value="${item.quantity}"
                        id="itemQuantity-${item.productId}"
                        data-product-id="${item.productId}"
                        class="itemQuantityInput"
                    />
                </div>
            </div>
        `;
        return cartItemEl;
    }

    // Call updateCartItems when the page loads
    updateCartItems();

    // Event listener for quantity changes
    cartItemsContainer.addEventListener(
        'blur',
        function (event) {
            if (event.target.classList.contains('itemQuantityInput')) {
                // Save the updated quantity to local storage
                const productId = event.target.dataset.productId;
                const newQuantity = parseInt(event.target.value);
                updateCartItemQuantity(productId, newQuantity);
            }
        },
        true // Set to false if you prefer event bubbling instead of capturing phase
    );

    function updateCartItemQuantity(productId, newQuantity) {
        const cartItems = JSON.parse(localStorage.getItem('localCart')) || [];

        // Find the item in the cart and update its quantity
        cartItems.forEach((item) => {
            if (item.productId === productId) {
                item.quantity = newQuantity;
            }
        });

        localStorage.setItem('localCart', JSON.stringify(cartItems));

        // Update cart items and totals
        updateCartItems();
    }

    // Function to generate a random order ID
    function generateOrderId() {
        return Math.floor(Math.random() * 100000000); // Example random ID generation
    }

    // Event listener for order form submission
    orderForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Perform the order submission logic here (e.g., send data to the server)
        // This example just logs the form data to console
        const formData = new FormData(orderForm);
        const orderData = {};
        formData.forEach((value, key) => {
            orderData[key] = value;
        });
        console.log('Order data:', orderData);

        // Simulate order confirmation and redirect to confirmation page
        const orderId = generateOrderId();
        window.location.href = `confirmation.html?orderId=${orderId}`;
    });
});

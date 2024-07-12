document.addEventListener('DOMContentLoaded', function () {
    const orderIdElement = document.getElementById('orderId');

    // Function to get the order ID from the query parameter
    function getOrderIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('orderId');
    }

    // Get the order ID from the URL
    const orderId = getOrderIdFromURL();

    // Display the order ID on the page
    if (orderIdElement && orderId) {
        const cartItems = JSON.parse(localStorage.getItem('localCart')) || [];
        let totalPrice = 0;

        // Calculate total price and generate receipt rows
        const receiptRows = cartItems.map(item => {
            const itemTotal = item.quantity * item.price;
            totalPrice += itemTotal;

            return `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>$${itemTotal.toFixed(2)}</td>
                </tr>
            `;
        }).join('');

        orderIdElement.innerHTML = `
            <div class="receipt">
                <div class="receipt-header">
                   <strong> <h2>Confirmation Number: <span id="confirmation-number">${orderId}</span></strong></h2>
                </div>
                <table class="receipt-table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody id="receipt-body">
                        ${receiptRows}
                    </tbody>
                </table>
                <div class="receipt-total">
                    Total Price: $<span id="total-price">${totalPrice.toFixed(2)}</span>
                </div>
            </div>
        `;
    } else {
        console.log('Order ID element or order ID not found.');
    }
});

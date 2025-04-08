document.addEventListener("DOMContentLoaded", () => {
    const checkoutSection = document.querySelector('.checkoutItems');
    const totalPriceElement = document.querySelector('.totalPrice');
    const totalQuantityElement = document.querySelector('.totalQuantity');
    let listCart = {};

    // Load cart from local storage
    function loadCart() { 
        try {
            const savedCart = localStorage.getItem('listCart');
            if (savedCart) {
                listCart = JSON.parse(savedCart);

                // Ensure `listCart` is valid
                if (typeof listCart !== 'object' || Array.isArray(listCart)) {
                    listCart = {};
                }
            }
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            listCart = {};
        }
    }
    loadCart();

    // Render cart items on the checkout page
    function renderCheckoutItems() {
        if (!checkoutSection) return;

        checkoutSection.innerHTML = '';

        let totalPrice = 0;
        let totalQuantity = 0;

        if (Object.keys(listCart).length > 0) {
            Object.values(listCart).forEach(product => {
                if (product) {
                    // Calculate total price and quantity
                    totalPrice += product.price * product.quantity;
                    totalQuantity += product.quantity;

                    // Create and append the checkout item element
                    let checkoutItem = document.createElement('div');
                    checkoutItem.classList.add('checkoutItem');
                    checkoutItem.innerHTML = `
                        <div class="item">
                            <img src="${product.image}" alt="${product.name}">
                            <div class="details">
                                <h3>${product.name}</h3>
                                <p>Price: $${product.price.toFixed(2)}</p>
                                <p>Quantity: ${product.quantity}</p>
                                <p>Total: $${(product.price * product.quantity).toFixed(2)}</p>
                            </div>
                        </div>`;
                    checkoutSection.appendChild(checkoutItem);
                }
            });
        } else {
            // If cart is empty, display a message
            checkoutSection.innerHTML = `<p>Your cart is empty. Please add items to the cart.</p>`;
        }

        // Update total price and total quantity in the DOM
        if (totalPriceElement) totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
        if (totalQuantityElement) totalQuantityElement.textContent = `Total Quantity: ${totalQuantity}`;
    }

    // Generate the bill content as a string
    function generateBillContent() {
        // Get user info
        const fullName = document.getElementById('fullName').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const address = document.getElementById('address').value;

        //Generate a random invoice number between 1 to 2000
        const invoiceNumber = Math.floor(Math.random() * 2000) + 1;

        let billContent = `Invoice Number: ${invoiceNumber}\n\n`;//Add invoice number to the content
        billContent += `Full Name: ${fullName}\nPhone Number: ${phoneNumber}\nAddress: ${address}\n\n`;
        billContent += `---------------------------------------------------------------\n`;//Divider below the address section

        let totalPrice = 0;
        let totalQuantity = 0;

        Object.values(listCart).forEach(product => {
            if (product) {
                totalPrice += product.price * product.quantity;
                totalQuantity += product.quantity;
                billContent += `${product.name}\nPrice: $${product.price.toFixed(2)}\nQuantity: ${product.quantity}\nTotal: $${(product.price * product.quantity).toFixed(2)}\n\n`;
            }
        });

        //Add a divider above the totals
        billContent += `-----------------------------------------------------------------\n`;
        billContent += `Total Quantity: ${totalQuantity}\nTotal Price: $${totalPrice.toFixed(2)}`;
        return billContent;
    }

    // Download the bill as a text file
    function downloadBill() {
        const billContent = generateBillContent();
        const blob = new Blob([billContent], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'bill.txt';
        link.click();
    }

    // Add event listener for checkout button to generate and download the bill
    const checkoutButton = document.getElementById('checkoutButton');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', downloadBill);
    }

    // Render the checkout items
    renderCheckoutItems();
});

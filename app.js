document.addEventListener("DOMContentLoaded", () => {
    let iconCart = document.querySelector('.iconCart');
    let cart = document.querySelector('.cart');
    let container = document.querySelector('.container');
    let close = document.querySelector('.close');

    // Open and close cart
    iconCart.addEventListener('click', () => {
        if (cart.style.right === '-100%') {
            cart.style.right = '0';
            container.style.transform = 'translateX(-400px)';
        } else {
            cart.style.right = '-100%';
            container.style.transform = 'translateX(0)';
        }
    });

    close.addEventListener('click', () => {
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    });

    let products = null;
    let listCart = {};

    // Fetch product data
    fetch('./product.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            addDataToHTML();
        })
        .catch(error => console.error('Error fetching product data:', error));

    // Populate product data in the HTML
    function addDataToHTML() {
        let listProductHTML = document.querySelector('.listProduct');
        listProductHTML.innerHTML = '';

        if (products !== null) {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.classList.add('item');
                newProduct.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <div class="price">$${product.price}</div>
                    <button onclick="addCart(${product.id})">Add To Cart</button>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }

    // Load cart from local storage
    function loadCart() {
        try {
            const savedCart = localStorage.getItem('listCart');
            if (savedCart) {
                listCart = JSON.parse(savedCart);
                if (typeof listCart !== 'object' || Array.isArray(listCart)) {
                    listCart = {}; // Reset to an empty object if invalid data is found
                }
            }
        } catch (error) {
            console.error('Error loading cart data:', error);
            listCart = {};
        }
    }
    loadCart();

    // Save cart to local storage
    function saveCart() {
        try {
            localStorage.setItem('listCart', JSON.stringify(listCart));
        } catch (error) {
            console.error('Error saving cart data:', error);
        }
    }

    // Add product to cart
    window.addCart = function (idProduct) {
        if (!listCart[idProduct]) {
            let dataProduct = products.find(product => product.id === idProduct);

            if (dataProduct) {
                listCart[idProduct] = { ...dataProduct, quantity: 1 };
            }
        } else {
            listCart[idProduct].quantity++;
        }

        saveCart();
        addCartToHTML();
    };

    // Render cart items to the cart panel
    function addCartToHTML() {
        let listCartHTML = document.querySelector('.listCart');
        listCartHTML.innerHTML = '';

        let totalHTML = document.querySelector('.totalQuantity');
        let totalQuantity = 0;

        if (listCart) {
            Object.values(listCart).forEach(product => {
                if (product) {
                    let newCart = document.createElement('div');
                    newCart.classList.add('item');
                    newCart.innerHTML = `
                        <img src="${product.image}">
                        <div class="content">
                            <div class="name">${product.name}</div>
                            <div class="price">$${product.price} / 1 product</div>
                        </div>
                        <div class="quantity">
                            <button onclick="updateQuantity(${product.id}, -1)">-</button>
                            <span class="value">${product.quantity}</span>
                            <button onclick="updateQuantity(${product.id}, 1)">+</button>
                        </div>`;
                    listCartHTML.appendChild(newCart);

                    totalQuantity += product.quantity;
                }
            });
        }

        totalHTML.textContent = totalQuantity;
    }

    // Update product quantity in cart
    window.updateQuantity = function (idProduct, delta) {
        if (listCart[idProduct]) {
            listCart[idProduct].quantity += delta;

            if (listCart[idProduct].quantity <= 0) {
                delete listCart[idProduct];
            }

            saveCart();
            addCartToHTML();
        }
    };

    // Load and render cart initially
    addCartToHTML();

    // Logout functionality
    document.querySelector(".logout").addEventListener("click", () => {
        const confirmLogout = confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            // Redirect to login page
            window.location.href = "user.html";
        }
    });
});

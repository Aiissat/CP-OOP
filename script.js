class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

class ShoppingCartItem {
    constructor(product, quantity = 1) {
        this.product = product;
        this.quantity = quantity;
    }

    calculateTotal() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity = 1) {
        const cartItem = this.items.find(item => item.product.id === product.id);
        if (cartItem) {
            cartItem.quantity = Math.max(0, cartItem.quantity + quantity);
        } else {
            if (quantity > 0) {
                this.items.push(new ShoppingCartItem(product, quantity));
            }
        }
        this.displayCart();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.displayCart();
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.calculateTotal(), 0);
    }

    displayCart() {
        let cartDisplay = document.querySelector('.container');
        cartDisplay.innerHTML = '';

        this.items.forEach(item => {
            let itemDiv = document.createElement('div');
            itemDiv.classList.add('col-4', 'article');
            itemDiv.setAttribute('data-product-id', item.product.id);
            itemDiv.innerHTML = `
                <img src="${item.product.image}" alt="">
                <p>${item.product.name}</p>
                <h2 class="prix">${item.product.price}</h2>
                <i class="far fa-heart liked"></i>
                <button type="button" class="btn btn-outline-success btnPlus">+</button>
                <input type="text" class="quantite" value="${item.quantity}" disabled>
                <button type="button" class="btn btn-outline-warning">-</button>
                <button type="button" class="btn btn-outline-danger">Supprimer</button>
                <h6>Total : <span class="total">${item.calculateTotal()}</span> FCFA</h6>
            `;
            cartDisplay.appendChild(itemDiv);
        });

        let totalDisplay = document.querySelector('.Prixtotal');
        totalDisplay.value = this.getTotal();
    }
}

// Create products
const product1 = new Product(1, 'Bracelet en Or', 95000, '/res/or.jpeg');
const product2 = new Product(2, 'Collier en Or Blanc', 100000, '/res/orblanc.png');
const product3 = new Product(3, 'Bague en Or Rose', 60000, '/res/orrose.jpeg');

// Create shopping cart
const cart = new ShoppingCart();
cart.addItem(product1);
cart.addItem(product2);
cart.addItem(product3);

// Add event listeners for buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btnPlus')) {
        let productId = parseInt(e.target.closest('.article').dataset.productId);
        let product = [product1, product2, product3].find(p => p.id === productId);
        cart.addItem(product);
    }
    if (e.target.classList.contains('btn-outline-warning')) {
        let productId = parseInt(e.target.closest('.article').dataset.productId);
        let product = [product1, product2, product3].find(p => p.id === productId);
        const cartItem = cart.items.find(item => item.product.id === productId);
        if (cartItem.quantity > 0) {
            cart.addItem(product, -1);
        }
    }
    if (e.target.classList.contains('btn-outline-danger')) {
        let productId = parseInt(e.target.closest('.article').dataset.productId);
        cart.removeItem(productId);
    }
    if (e.target.classList.contains('fa-heart')) {
        e.target.classList.toggle('liked');
    }
});

// Initial display of the cart
document.addEventListener('DOMContentLoaded', function() {
    cart.displayCart();
});

document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();
    displayCartItems();

    function displayCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(product => {
            const item = document.createElement('div');
            item.classList.add('cart-item');
            item.innerHTML = `
                <div class="cart-item-image">
                    <img src="${product.image}" alt="${product.name}" />
                </div>
                <div class="cart-item-details">
                    <h3>${product.name}</h3>
                    <p>Preis: ${parseFloat(product.price).toFixed(2)} €</p>
                    <p>Menge: ${product.quantity}</p>
                    <button class="button remove-from-cart" data-id="${product.id}">Entfernen</button>
                </div>
            `;
            cartItemsContainer.appendChild(item);
        
            const productTotal = parseFloat(product.price) * product.quantity;
            console.log(`Produkt: ${product.name}, Preis: ${product.price}, Menge: ${product.quantity}, Zwischensumme: ${productTotal}`);
            total += productTotal;
        });
        
        console.log(`Gesamtpreis: ${total}`);
        cartTotal.innerText = `Gesamt: ${total.toFixed(2)} €`;
        

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }

    function removeFromCart(event) {
        const productId = event.target.dataset.id;
        const productIndex = cart.findIndex(product => product.id === productId);

        if (productIndex > -1) {
            cart.splice(productIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            displayCartItems();
        }
    }

    function updateCartCount() {
        const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
        document.getElementById('cart-count').innerText = cartCount;
    }

    document.getElementById('checkout').addEventListener('click', () => {
        alert('Vielen Dank für Ihren Einkauf!');
        localStorage.removeItem('cart');
        updateCartCount();
        displayCartItems();
    });
});

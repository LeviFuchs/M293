document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scrolled');
            }
        });
    }, {
        threshold: 0.6
    });

    productCards.forEach(card => {
        observer.observe(card);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const productCard = event.target.closest('.product-card');
        const productId = productCard.dataset.id;
        const productName = productCard.dataset.name;
        const productPrice = parseFloat(productCard.dataset.price);

        const existingProduct = cart.find(product => product.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
        document.getElementById('cart-count').innerText = cartCount;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Diese Variablen mit Ihren tatsächlichen Service-ID und Template-ID aus Ihrem EmailJS-Konto ersetzen
        const serviceID = 'service_8ghupsi';
        const templateID = 'template_qsqds94';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                alert('Ihre Nachricht wurde gesendet!');
                document.getElementById('contact-form').reset();
            }, (error) => {
                console.error('FEHLER:', error);
                alert('Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
            });
    });
});


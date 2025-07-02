document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalElement = document.getElementById('cart-total');
    const cartHeader = document.querySelector('.cart-header');
    const checkoutButton = document.querySelector('.checkout-button');

    function updateQuantity(productId, change) {
        let cart = JSON.parse(localStorage.getItem('futeCart')) || [];
        const itemIndex = cart.findIndex(item => item.id === productId);

        if (itemIndex > -1) {
            cart[itemIndex].quantity += change;


            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
        }

        localStorage.setItem('futeCart', JSON.stringify(cart));
        renderizarCarrinho();
    }

    function removerDoCarrinho(productId) {
        let cart = JSON.parse(localStorage.getItem('futeCart')) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('futeCart', JSON.stringify(cart));
        renderizarCarrinho();
    }

    function renderizarCarrinho() {
        const cart = JSON.parse(localStorage.getItem('futeCart')) || [];
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align: center; padding: 2rem;">Seu carrinho está vazio.</p>';
            cartTotalElement.textContent = 'R$ 0,00';
            cartHeader.style.display = 'none';
            return;
        }

        cartHeader.style.display = 'grid';

        cart.forEach(item => {
            const itemPrice = parseFloat(item.value.replace(',', '.'));
            const subtotal = itemPrice * item.quantity;
            total += subtotal;

            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';

           
            cartItemElement.innerHTML = `
                <div class="cart-item-product">
                    <img src="${item.image.startsWith('data:image') ? item.image : 'images/cards/' + item.image}" alt="${item.name}">
                    <span>${item.name}</span>
                </div>
                <div>R$ ${item.value}</div>
                <div class="quantity-selector">
                    <button class="quantity-btn decrease-btn" data-id="${item.id}" title="Diminuir">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn increase-btn" data-id="${item.id}" title="Aumentar">+</button>
                </div>
                <div>R$ ${subtotal.toFixed(2).replace('.', ',')}</div>
                <div>
                    <button class="remove-item-btn" data-id="${item.id}" title="Remover item">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        cartTotalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }


    cartItemsContainer.addEventListener('click', (event) => {
        const target = event.target;
        const productId = Number(target.closest('[data-id]')?.dataset.id);

        if (!productId) return;

        if (target.closest('.increase-btn')) {
            updateQuantity(productId, 1); 
        } else if (target.closest('.decrease-btn')) {
            updateQuantity(productId, -1); 
        } else if (target.closest('.remove-item-btn')) {
            removerDoCarrinho(productId);
        }
    });

    checkoutButton.addEventListener('click', () => {
        
        const carrinho = JSON.parse(localStorage.getItem('futeCart')) || [];
        let minhasCartas = JSON.parse(localStorage.getItem('meusCards')) || [];

        
        carrinho.forEach(itemDoCarrinho => {
            const cartaExistente = minhasCartas.find(carta => carta.id === itemDoCarrinho.id);

            if (cartaExistente) {
                cartaExistente.quantity += itemDoCarrinho.quantity;
            } else {
                minhasCartas.push(itemDoCarrinho);
            }
        });

        localStorage.setItem('meusCards', JSON.stringify(minhasCartas));

        localStorage.removeItem('futeCart');

        alert('Compra finalizada! Suas cartas foram adicionadas à sua coleção.');
        window.location.href = 'minhasCartas.html';
    });


    renderizarCarrinho();
});
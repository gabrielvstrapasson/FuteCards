

document.addEventListener('DOMContentLoaded', () => {

    const myCardsGrid = document.getElementById('my-cards-grid');


    const minhasCartas = JSON.parse(localStorage.getItem('meusCards')) || [];

 
    if (minhasCartas.length === 0) {
        myCardsGrid.innerHTML = '<p style="text-align: center; color: #ccc; grid-column: 1 / -1;">Sua coleção está vazia. Compre novas cartas na loja!</p>';
        return;
    }


    minhasCartas.forEach(card => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';

        cardContainer.innerHTML = `
            <img class="card-image" src="${card.image.startsWith('data:image') ? card.image : 'images/cards/' + card.image}" alt="${card.name}">
            <div class="card-info">
                <p><strong>JOGADOR:</strong> ${card.name}</p>
                <p><strong>RARIDADE:</strong> ${card.rarity}</p>
                <p style="font-size: 1rem; color: #007bff;"><strong>QUANTIDADE: ${card.quantity}</strong></p>
            </div>
        `;

        myCardsGrid.appendChild(cardContainer);
    });
});
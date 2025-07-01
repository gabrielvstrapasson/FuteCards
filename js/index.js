
document.addEventListener('DOMContentLoaded', () => {
    

    const searchInput = document.querySelector('.search-text');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const allCards = JSON.parse(localStorage.getItem('futeCards')) || [];
        const filteredCards = allCards.filter(card => {
            return card.name.toLowerCase().includes(searchTerm) ||
                     card.level.toLowerCase().includes(searchTerm) ||
                     card.rarity.toLowerCase().includes(searchTerm)
        });
        renderCards(filteredCards);
    });


    const initialCards = [
        { id: 1, name: 'ALISSON', level: '95', rarity: 'Ultra Raro', value: '49,99', image: 'cardAlisson.png' },
        { id: 2, name: 'Cristiano Ronaldo', level: '92', rarity: 'Ultra Raro', value: '79,99', image: 'cardCR7.png' },
        { id: 3, name: 'Ángel Di María', level: '87', rarity: 'Raro', value: '39,99', image: 'cardDimaria.png' },
        { id: 4, name: 'HAKIMI', level: '93', rarity: 'RARA', value: '59,99', image: 'cardHakimi.png' },
        { id: 5, name: 'HAALAND', level: '96', rarity: 'Épico', value: '89,99', image: 'cardHaland.png' },
        { id: 6, name: 'MESSI', level: '92', rarity: 'Ultra Raro', value: '99,99', image: 'cardMessi.png' },
        { id: 7, name: 'MODRIC', level: '97', rarity: 'Épico', value: '109,99', image: 'cardModric.png' },
        { id: 8, name: 'RODRYGO', level: '90', rarity: 'Raro', value: '49,99', image: 'cardRodrygo.png' },
        { id: 9, name: 'Vinícius Jr.', level: '96', rarity: 'Ultra Raro', value: '89,99', image: 'cardViniJR.png' },
        { id: 10, name: 'MBAPPÉ', level: '93', rarity: 'Ultra Raro', value: '99,99', image: 'cardMbappe.png' }
    ];
    

    function renderCards(cardsToRender) {
        const cardGrid = document.querySelector('.card-grid');
        if (!cardGrid) return; 

        cardGrid.innerHTML = '';

        cardsToRender.forEach(card => {
            const cardContainer = document.createElement('div');
            cardContainer.className = 'card-container';

            cardContainer.innerHTML = `
                <img class="card-image" src="${card.image.startsWith('data:image') ? card.image : 'images/cards/' + card.image}" alt="${card.name}">
                <div class="card-info">
                    <p><strong>JOGADOR:</strong> ${card.name}</p>
                    <p><strong>NÍVEL:</strong> ${card.level}</p>
                    <p><strong>RARIDADE:</strong> ${card.rarity}</p>
                    <button class="buy-button">R$ ${card.value}</button>
                </div>
            `;

            cardGrid.appendChild(cardContainer);
        });
    }

    let cards = JSON.parse(localStorage.getItem('futeCards'));


    if (!cards || cards.length === 0) {

        localStorage.setItem('futeCards', JSON.stringify(initialCards));
        cards = initialCards; 
    }

    renderCards(cards);

});
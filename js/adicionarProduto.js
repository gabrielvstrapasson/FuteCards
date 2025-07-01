
const CARDS_KEY = 'futeCards';

function getCards() {

    return JSON.parse(localStorage.getItem(CARDS_KEY)) || [];
}

function setCards(cards) {

    localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
}


function renderTable() {
    const tableBody = document.querySelector('.items-table tbody');
    const cards = getCards();


    tableBody.innerHTML = '';

    cards.forEach((card, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${card.name}</td>
            <td>${card.rarity}</td>
            <td>${card.level}</td>
            <td>R$ ${card.value}</td>
                <td><img src="${card.image.startsWith('data:image') ? card.image : 'images/cards/' + card.image}" alt="${card.name}" class="product-image"></td>
            <td>
                <button class="btn-edit" onclick="editCard(${index})">Editar</button>
            </td>
            <td>
                <button class="btn-delete" onclick="deleteCard(${index})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}



function handleFormSubmit(event) {
    event.preventDefault(); 


    const name = document.getElementById('player-name').value;
    const level = document.getElementById('player-level').value;
    const rarity = document.getElementById('player-rarity').value;
    const value = document.getElementById('player-value').value;
    const imageInput = document.getElementById('upload-anexo');
    const editingIndex = document.getElementById('editing-index').value;


    const reader = new FileReader();


    if (imageInput.files.length > 0) {
        reader.onload = function(e) {
            const newCard = { name, level, rarity, value, image: e.target.result };
            saveCard(newCard, editingIndex);
        };
        reader.readAsDataURL(imageInput.files[0]); 
    } else {

        const cards = getCards();

        if (editingIndex !== '') {
            const oldImage = cards[editingIndex].image;
            const updatedCard = { name, level, rarity, value, image: oldImage };
            saveCard(updatedCard, editingIndex);
        } else {
            alert('Por favor, selecione uma imagem para o novo card.');
        }
    }
}


function saveCard(card, editingIndex) {
    const cards = getCards();
    
    if (editingIndex === '') {

        cards.push(card);
    } else {

        cards[editingIndex] = card;
    }

    setCards(cards); 
    renderTable();
    resetForm();
}


function deleteCard(index) {
    if (confirm('Tem certeza que deseja excluir este card?')) {
        const cards = getCards();
        cards.splice(index, 1); 
        setCards(cards);
        renderTable();
    }
}


function editCard(index) {
    const cards = getCards();
    const cardToEdit = cards[index];


    document.getElementById('player-name').value = cardToEdit.name;
    document.getElementById('player-level').value = cardToEdit.level;
    document.getElementById('player-rarity').value = cardToEdit.rarity;
    document.getElementById('player-value').value = cardToEdit.value;
    

    document.getElementById('editing-index').value = index;


    document.querySelector('.btn-primary').textContent = 'Salvar';
}

function resetForm() {
    document.querySelector('.add-product-form').reset();
    document.getElementById('editing-index').value = ''; 
    document.querySelector('.btn-primary').textContent = 'Adicionar';
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.add-product-form');


    if (!document.getElementById('editing-index')) {
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.id = 'editing-index';
        hiddenInput.value = '';
        form.appendChild(hiddenInput);
    }
    

    form.addEventListener('submit', handleFormSubmit);
    form.addEventListener('reset', resetForm);


    window.editCard = editCard;
    window.deleteCard = deleteCard;

    renderTable();
});
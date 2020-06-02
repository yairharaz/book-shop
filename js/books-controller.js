'use strict'

function onInit() {
    // debugger
    createBooks()
    renderBooks()
}

function renderBooks() {
    var books = getBooks();
    var strHTMLs = books.map(function (book) {
        return `
        <tr>    
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td><span class="local-currency">${convertUsdToIls(book.price)}</span> <span data-trans="currency">$</span></td>
            <td>${book.rate}</td>
            <td><a class="read-book" data-trans="read" href="#" onclick="onReadBook('${book.id}')">Read</a></td>
            <td><a class="update-book" href="#" data-trans="update" onclick="onUpdateBook('${book.id}')">Update</a></td>
            <td><a class="delete-book" href="#" data-trans="delete" onclick="onRemoveBook('${book.id}')">Delete</a></td>
        </tr>
        `
    })
    document.querySelector('.shop-table tbody').innerHTML = strHTMLs.join('')
}


function onReadBook(bookId) {
    var book = getBookById(bookId);
    var elModal = document.querySelector('.modal');
    elModal.querySelector('h5').innerText = book.title;
    elModal.querySelector('h6').innerText = '$' + book.price;
    elModal.querySelector('p').innerText = book.desc;
    elModal.hidden = false;
    renderModal(book)
    renderBooks()
}

function renderModal(book) {
    var elModal = document.querySelector('.modal div');
    var strHTML = `<input name="rating" type="number" min="0" max="10" data-trans="rating" placeholder="Rating" onclick="stopPropagation(event)"/ >
    <button class="set-rating" data-trans="set-rating" onclick="onSetRating(${book.id},event)">Set Rating</button>`
    // <button class="close" data-trans="close" onclick="onCloseModal(event)">Close</button>`;
    elModal.innerHTML = strHTML;
}

function onCloseModal(e) {
    document.querySelector('.modal').hidden = true;
    document.querySelector('.set-rating').hidden = true;
    e.stopPropagation();
}

function onUpdateBook(bookId) {
    var newPrice = +prompt('price?');
    updateBook(bookId, newPrice);
    renderBooks();

}

function onSetRating(bookId, e) {
    var elRate = document.querySelector('[name=rating');
    var rate = elRate.value;
    setRating(bookId, rate);
    elRate.value = '';
    e.stopPropagation;
    renderBooks();
}

function onAddBook() {
    var elName = document.querySelector('[name=book-name');
    var elPrice = document.querySelector('[name=book-price');
    var name = elName.value;
    var price = elPrice.value;
    addBook(name, price);
    elName.value = '';
    elPrice.value = '';
    document.querySelector('.delete-all').hidden = false
    renderBooks();
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onRemoveAll() {
    if (confirm(getTrans('sure'))) {
        removeAll();
        document.querySelector('.delete-all').hidden = true
        renderBooks()
    } else return
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl');
        var vals = document.querySelectorAll('.local-currency');
    }
    else document.body.classList.remove('rtl');
    renderBooks()
    doTrans();
}

function convertUsdToIls(num) {
    var lang = getLang();    
    if (lang === 'he') return num * 3.6;
    else return num;
}
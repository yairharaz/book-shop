'use strict'

function onInit() {
    // debugger
    createBooks()
    console.log(gBooks);
    
    renderBooks()
}

function renderBooks() {
    var books = getBooks();
    console.log(books);
    
    var strHTMLs = books.map(function (book) {
        return `
        <tr>    
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>${book.rate}</td>
            <td><a class="read-book" href="#" onclick="onReadBook('${book.id}')">Read</a></td>
            <td><a class="update-book" href="#" onclick="onUpdateBook('${book.id}')">Update</a></td>
            <td><a class="delete-book" href="#" onclick="onRemoveBook('${book.id}')">Delete</a></td>
        <tr/>
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

function renderModal(book){
    var elModal = document.querySelector('.modal div');
    var strHTML = `<input name="rating" type="number" min="0" max="10" placeholder="Rating" onclick="stopPropagation(event)"/ >
    <button class="set-rating" onclick="onSetRating(${book.id},event)">Set Rating</button>
    <button class="close" onclick="onCloseModal(event)">Close</button>`;
    elModal.innerHTML += strHTML;
}

function onCloseModal(e){
    document.querySelector('.modal').hidden = true;
    e.stopPropagation();
}

function onUpdateBook(bookId) {
    var newPrice = +prompt('price?');
    updateBook(bookId,newPrice);
    renderBooks();

}

function onSetRating(bookId,e){
    var elRate = document.querySelector('[name=rating');
    var rate = elRate.value;    
    setRating(bookId,rate);
    elRate.value='';
    e.stopPropagation;
    renderBooks();
}

function onAddBook(){
    var elName = document.querySelector('[name=book-name');
    var elPrice = document.querySelector('[name=book-price');
    var name = elName.value;
    var price = elPrice.value;
    addBook(name,price);
    elName.value = '';
    elPrice.value = '';
    document.querySelector('.delete-all').hidden = false
    renderBooks();
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onRemoveAll(){
    var confirmDeletingAll = confirm('Are You Sure?');
    if (!confirmDeletingAll) return;
    removeAll();
    document.querySelector('.delete-all').hidden = true
    renderBooks()
}
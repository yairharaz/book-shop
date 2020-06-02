'use strict'
const KEY = 'books';
const PAGE_SIZE = 10;
var gBooksTitles = ['Moby Dick', 'Lolita', 'War And Peace', 'Hamlet', 'Harry Potter', 'The Lord Of The Rings'];
var gNextId = loadFromStorage('id');
var gBooks;

function getBooks() {
    var gPageIdx = 0;
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function createBooks() {
    var books = loadFromStorage(KEY);
    if (!books || !books.length) {
        gNextId = 100
        var books = [];
        for (let i = 0; i < gBooksTitles.length; i++) {
            var book = _createBook(gBooksTitles[i])
            books.push(book)
        }
    }
    gBooks = books;
    saveToStorage(KEY, books);
}

function _createBook(title, price) {
    if (!price) var price = getRandomFloat(15, 40, 2);
    var book = {
        id: ++gNextId,
        title: title,
        price: price,
        desc: makeLorem(),
        rate: 0
    }
    saveToStorage('id', gNextId)
    return book
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return +bookId === book.id
    })
    return book
}

function updateBook(bookId, newPrice) {
    var book = gBooks.find(book => +bookId === book.id);
    book.price = newPrice;
    saveToStorage(KEY, gBooks);
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(book => +bookId === book.id);
    gBooks.splice(bookIdx, 1);
    saveToStorage(KEY, gBooks);

}

function addBook(bookName, price) {
    var book = _createBook(bookName, price);
    gBooks.unshift(book);
    saveToStorage(KEY, gBooks);
}

function setRating(elId, rate) {
    var book = gBooks.find(book => +elId === book.id);
    book.rate = rate;
    saveToStorage(KEY, gBooks);
}

function removeAll() {
    gBooks = [];
    saveToStorage(KEY, gBooks);
}
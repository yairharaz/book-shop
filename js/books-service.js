'use strict'
const KEY = 'books';
const PAGE_SIZE = 10;
var gBooks;
var gNextId = 1;


function getBooks() {
    var gPageIdx = 0;
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function createBooks() {
    var books = loadFromStorage(KEY);
    console.log(books);

    if (!books || !books.length) {
        var books = [];
        for (let i = 0; i < 13; i++) {
            books.push(_createBook())
        }
    }
    gBooks = books;

    saveToStorage(KEY, books);
}

function _createBook(title, price) {
    var nouns = ['JavaScrypt', 'HTML', 'CSS', 'Python', 'C++'];
    if (!title) var title = makeBookTitle(nouns[getRandomIntInclusive(0, nouns.length - 1)]);
    if (!price) var price = getRandomFloat(15, 40, 2);
    return {
        id: gNextId++,
        title: title,
        price: price,
        desc: makeLorem(),
        rate: 0 //getRandomIntInclusive(0, 10)
    }

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
    console.log(elId);
    console.log(rate);
    var book = gBooks.find(book => +elId === book.id);
    book.rate = rate;
    saveToStorage(KEY, gBooks);
}

function removeAll() {
    gBooks = [];
    saveToStorage(KEY, gBooks);
}

// function saveToStorage(KEY,gBooks)() {
//     saveToStorage(KEY, gBooks)
// }
// loadFromStorage(KEY);
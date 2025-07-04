const myLibrary = [];
const bookshelf = document.querySelector('.bookshelf');
const addBtn = document.querySelector('.add-btn');

function Book(title, author, pages, isRead) {
  if(!new.target) {
    throw Error('must use the "new" operator to call the constructor')
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = crypto.randomUUID();
};

function addBookToLibrary(title, author, pages, isRead) {
  let bookObj = new Book(title, author, pages, isRead);
  myLibrary.push(bookObj);
  displayBook(createBookContainter(bookObj));
};

function displayBook(book) {
  bookshelf.appendChild(book);
}

function createBookContainter(bookObj) {
  const book = document.createElement('div')
  book.className = 'book';
  book.id = bookObj.id
  for(prop in bookObj) {
    const txt = document.createElement('div');
    txt.className = prop;
    txt.textContent = bookObj[prop];
    if(bookObj[prop] === 'Read') {
      txt.classList.add('is-read');
    }
    book.appendChild(txt);
  }
  return book;
}
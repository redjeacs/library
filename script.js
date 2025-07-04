const myLibrary = [];
const bookshelf = document.querySelector('.bookshelf');
const addBtn = document.querySelector('.add-btn');
const newBookDialog = document.querySelector('#new-book-dialog');
const submitBtn = document.querySelector('#submit-btn');

function Book(title, author, pages, isRead) {
  if(!new.target) {
    throw Error('must use the "new" operator to call the constructor');
  };
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
};

function createBookContainter(bookObj) {
  const book = document.createElement('div');
  book.className = 'book';
  book.id = bookObj.id;
  for(prop in bookObj) {
    const txt = document.createElement('div');
    txt.className = prop;
    txt.textContent = bookObj[prop];
    if(bookObj[prop] === 'Read') {
      txt.classList.add('is-read');
    };
    book.appendChild(txt);
  };


  const removeBtn = document.createElement('button');
  removeBtn.innerHTML = 'Remove';
  removeBtn.className = 'remove-btn';
  removeBtn.setAttribute('data-id', book.id);
  book.appendChild(removeBtn);
  return book;
};

addBtn.addEventListener('click', () => {
  newBookDialog.showModal();
});

submitBtn.addEventListener('click', () => {
  const title = document.querySelector('#title-form').value;
  const author = document.querySelector('#author-form').value;
  const pages = document.querySelector('#pages-form').value;
  const isRead = document.querySelector('#isRead-form');
  let read = '';
  if(isRead.checked) {
    read = 'Read';
  }
  else {
    read = 'Not read';
  }
  addBookToLibrary(title, author, pages, read);
});
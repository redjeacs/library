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
    if(prop == 'isRead') {
      const btn = document.createElement('button');
      btn.className = prop;
      if(bookObj[prop] == 'Read') {
        btn.classList.add('yes');
      } else if(bookObj[prop] == 'Not read') {
        btn.classList.add('no');
      };
      btn.innerHTML = bookObj[prop];
      book.appendChild(btn);

      btn.addEventListener('click', () => {
        if(btn.classList.contains('yes')) {
          btn.classList.replace('yes', 'no');
          btn.innerHTML = 'Not read';
        } else if(btn.classList.contains('no')) {
          btn.classList.replace('no', 'yes');
          btn.innerHTML = 'Read';
        };
      });
      continue;
    }
    else if(prop == 'id') {
      continue;
    }
    const txt = document.createElement('div');
    txt.className = prop;
    txt.textContent = bookObj[prop];
    book.appendChild(txt);
  };


  const removeBtn = document.createElement('button');


  removeBtn.innerHTML = 'Remove';
  removeBtn.className = 'remove-btn';
  removeBtn.setAttribute('data-id', book.id);
  book.appendChild(removeBtn);


  removeBtn.addEventListener('click', () => {
    const bookIndex = myLibrary.findIndex(function(book) {
      return book.id == removeBtn.getAttribute('data-id');
    })
    myLibrary.splice(bookIndex, 1);
    const bookToRemove = document.getElementById(removeBtn.getAttribute('data-id'));
    bookshelf.removeChild(bookToRemove);
  });




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




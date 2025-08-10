const myLibrary = [];
const bookshelf = document.querySelector(".bookshelf");
const addBtn = document.querySelector(".add-btn");
const newBookDialog = document.querySelector("#new-book-dialog");
const submitBtn = document.querySelector("#submit-btn");

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
  }
}

function addBookToLibrary(title, author, pages, isRead) {
  let bookObj = new Book(title, author, pages, isRead);
  myLibrary.push(bookObj);
  displayBook(createBookContainter(bookObj));
}

function displayBook(book) {
  bookshelf.appendChild(book);
}

function createBookContainter(bookObj) {
  const book = document.createElement("div");
  book.className = "book";
  book.id = bookObj.id;
  for (prop in bookObj) {
    if (prop == "isRead") {
      const btn = document.createElement("button");
      btn.className = prop;
      if (bookObj[prop] == "Read") {
        btn.classList.add("yes");
      } else if (bookObj[prop] == "Not read") {
        btn.classList.add("no");
      }
      btn.innerHTML = bookObj[prop];
      book.appendChild(btn);

      btn.addEventListener("click", () => {
        if (btn.classList.contains("yes")) {
          btn.classList.replace("yes", "no");
          btn.innerHTML = "Not read";
          const readStatusId = btn.parentNode.id;
          const readStatusIndex = myLibrary.findIndex(
            (book) => book.id == readStatusId
          );
          myLibrary[readStatusIndex].isRead = "Not read";
        } else if (btn.classList.contains("no")) {
          btn.classList.replace("no", "yes");
          btn.innerHTML = "Read";
          const readStatusId = btn.parentNode.id;
          const readStatusIndex = myLibrary.findIndex(
            (book) => book.id == readStatusId
          );
          myLibrary[readStatusIndex].isRead = "Read";
        }
      });
      continue;
    } else if (prop == "id") {
      continue;
    }
    const txt = document.createElement("div");
    txt.className = prop;
    txt.textContent = bookObj[prop];
    book.appendChild(txt);
  }

  const removeBtn = document.createElement("button");

  removeBtn.innerHTML = "Remove";
  removeBtn.className = "remove-btn";
  removeBtn.setAttribute("data-id", book.id);
  book.appendChild(removeBtn);

  removeBtn.addEventListener("click", () => {
    const bookIndex = myLibrary.findIndex(function (book) {
      return book.id == removeBtn.getAttribute("data-id");
    });
    myLibrary.splice(bookIndex, 1);
    const bookToRemove = document.getElementById(
      removeBtn.getAttribute("data-id")
    );
    bookshelf.removeChild(bookToRemove);
  });

  return book;
}

addBtn.addEventListener("click", () => {
  newBookDialog.showModal();
});

// Check validity of all fields
const form = document.querySelector("#new-book-form");
const titleForm = document.querySelector("#title-form");
const authorForm = document.querySelector("#author-form");
const pagesForm = document.querySelector("#pages-form");
const titleError = document.querySelector("#title-error");
const authorError = document.querySelector("#author-error");
const pagesError = document.querySelector("#pages-error");

titleForm.addEventListener("input", () => {
  if (titleForm.validity.valid) {
    titleError.textContent = "";
    titleError.className = "error-message";
  } else {
    showError(titleForm, titleError, "Please enter a title");
  }
});

authorForm.addEventListener("input", () => {
  if (authorForm.validity.valid) {
    authorError.textContent = "";
    authorError.className = "error-message";
  } else {
    showError(authorForm, authorError, "Please enter an author");
  }
});

pagesForm.addEventListener("input", () => {
  if (pagesForm.validity.valid) {
    pagesError.textContent = "";
    pagesError.className = "error-message";
  } else {
    showError(pagesForm, pagesError, "Please enter a valid number of pages");
  }
});

form.addEventListener("submit", (e) => {
  if (!titleForm.validity.valid) {
    showError(titleForm, titleError, "Please enter a title");
    e.preventDefault();
  }
  if (!authorForm.validity.valid) {
    showError(authorForm, authorError, "Please enter an author");
    e.preventDefault();
  }
  if (!pagesForm.validity.valid) {
    showError(pagesForm, pagesError, "Please enter a valid number of pages");
    e.preventDefault();
  }
});

submitBtn.addEventListener("click", () => {
  const title = document.querySelector("#title-form").value;
  const author = document.querySelector("#author-form").value;
  const pages = document.querySelector("#pages-form").value;
  const isRead = document.querySelector("#isRead-form");
  let read = "";
  if (isRead.checked) {
    read = "Read";
  } else {
    read = "Not read";
  }
  addBookToLibrary(title, author, pages, read);
});

function showError(input, errorElement, message) {
  errorElement.textContent = message;
  errorElement.className = "error-message active";
  input.setCustomValidity(message);
  input.reportValidity();
}

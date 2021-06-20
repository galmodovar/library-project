class Book {
  constructor(title, author, numOfPages, haveRead = false) {
    this.title = title
    this.author = author
    this.numOfPages = numOfPages
    this.haveRead = haveRead
  }
}

class UI {
  static displayedBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToLibrary(book));
  }

  static addBookToLibrary(book) {
    const list = document.querySelector('#library-container');

    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.numOfPages}</td>
    <td>${book.haveRead}</td>
    <td><a href="#" class="btn btn-danger btn-sm
    delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.getElementById('read').checked = false;
  }
}

//store class: localStorage
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(numOfPages) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.numOfPages === numOfPages) {
        books.splice(index, 1);
      }
    });
    
    localStorage.setItem('books', JSON.stringify(books));
  }
}


//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayedBooks)

//Event: Add a book
document.querySelector('#book-form').addEventListener('submit', (e)=> {
  //prevent actual submit
  e.preventDefault();
  // get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const numOfPages = document.querySelector('#pages').value;
  const haveRead = document.querySelector('#read').checked;

  //validate
 

  // instantiate book
  const book = new Book(title, author, numOfPages, haveRead);

  // Add book to UI
  UI.addBookToLibrary(book);

  // Add book to store
  Store.addBook(book)

  //clear fields
  UI.clearFields();

});

// Event: Delete book
document.querySelector('#library-container').addEventListener('click', (e) => {
  
UI.deleteBook(e.target);


// Remove book from store
Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

});






console.log('Library');

const myBooks = [
  {title:"Determined", author:"Robert M Sapolsky", numberOfPages:528, wasRead: false},
  {title:"Behave", author:"Robert M Sapolsky", numberOfPages:800, wasRead: true},
  {title:"Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones", author:"James Clear", numberOfPages:800, wasRead: true}
];

function Library(books = []) {
  this.books = books.map(book => new Book(book.title, book.author, book.numberOfPages, book.wasRead));
}

Library.prototype.addBook = function(book) {
  this.books.push(book);
}

Library.prototype.getBooks = function() {
  return this.books;
}

function Book(title, author, numberOfPages, wasRead=false) {
  this.title = title;
  this.author = author;
  this.nunberOfPages = numberOfPages;
  this.wasRead = wasRead;
}

Book.prototype.info = function() {
  let readInfo = this.wasRead ? 'read it' : 'not read yet';
  return `${this.title} by ${this.author}, ${this.nunberOfPages} pages ${readInfo}`;
}

Book.prototype.createTooltipElement = function() {
  let tooltipElem = document.createElement('span');
  tooltipElem.classList.add('tooltiptext');
  let titleElem = document.createElement('h3');
  titleElem.textContent = this.title;
  let authorElem = document.createElement('address');
  authorElem.textContent = this.author;

  tooltipElem.appendChild(titleElem);
  tooltipElem.appendChild(authorElem);
  return tooltipElem;
}

Book.prototype.createBookWasReadElement = function() {
  let subElem = document.createElement('sub');
  subElem.textContent = 'Read:';
  let iconElem = document.createElement('i');
  let classAttr = this.wasRead ? 'check-circle' : 'circle';
  iconElem.classList.add(classAttr);
  iconElem.setAttribute('data-feather', classAttr);
  subElem.appendChild(iconElem);
  return subElem;
}

Book.prototype.createHeaderElem = function(maxTitleLength = 50) {
  let headerElem = document.createElement('header');
  
  let titleElem = document.createElement('h3');
  if(this.title.length > maxTitleLength) {
    titleElem.textContent = this.title.substr(0, maxTitleLength) + '...';
    
    let tooltipElem = this.createTooltipElement();
    headerElem.appendChild(tooltipElem);
  } else {
    titleElem.textContent = this.title;
  }
  headerElem.appendChild(titleElem);
  
  let addressElem = document.createElement('address');
  addressElem.classList.add('author');
  addressElem.textContent = 'By '
  
  let aElement = document.createElement('a');
  aElement.rel = 'author';
  aElement.href = '#';
  aElement.textContent = this.author;
  addressElem.appendChild(aElement);
  headerElem.appendChild(addressElem);

  return headerElem;
}

Book.prototype.createBookElement = function() {
  let bookElem = document.createElement('article');
  
  let headerElem = this.createHeaderElem();
  bookElem.appendChild(headerElem);
 
  let articleContentElem = document.createElement('div');
  articleContentElem.classList.add('article-content');
  
  let bookWasReadElem = this.createBookWasReadElement();
  articleContentElem.appendChild(bookWasReadElem);

  bookElem.appendChild(articleContentElem);
  
  console.log(this, bookElem);
  return bookElem;
}

Library.prototype.displayBooks = function(shelfId) {
  let booksElement = document.querySelector(shelfId);
  this.books.forEach(book => {
    let bookContainerElem = document.createElement('li');
    let bookElem = book.createBookElement();
    bookContainerElem.appendChild(bookElem);
    booksElement.appendChild(bookContainerElem);
    feather.replace({class: 'secondary-icons book-status'});
  });
}

let myLibrary = new Library(myBooks);

let theHobbit = new Book('The Hobbit', "J.R.R. Tolkein", 295);
console.log(theHobbit.info());

myLibrary.addBook(theHobbit)
console.log(myBooks);

myLibrary.displayBooks('#books');
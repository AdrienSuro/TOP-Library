//Create and store the book objects :
function Book(title, author, year, rating, bookNr) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.rating = rating;
  this.bookNr = bookNr;
}

const constructorsArray = [];

function addConstructorToArray(constructor) {
  constructorsArray.push(constructor);
};

let numberOfBooks = -1;

//Create DOM Elements : 
const mainContainer = document.getElementById("main-container");
const addForm = document.getElementById("add-form");
const addButton = document.getElementById("add-button");
const closeForm = document.getElementById("close-form");
const addToMyBooksButton = document.getElementById("addToMyBooks");

//Function to display a book on the page : 
function displayBook(array) {
  mainContainer.innerHTML += 
  `<div id='book-container${array.bookNr}' >
      <img src="img/close.png" id="remove-book${array.bookNr}" title="Remove book">
      <p>Title : ${array.title}</p>
      <p>Author : ${array.author}</p>
      <p>Year : ${array.year}</p>
      <p>Rating : ${array.rating}</p>
  </div>`
};

//Function creating an event listener that removes the book from the page and from the constructors array : 
function addRemoverLoop() {
  for (let i=0; i<constructorsArray.length; i++) {
  let removeBtn = document.getElementById(`remove-book${i}`);
  let targetContainer = document.getElementById(`book-container${i}`);
  removeBtn.addEventListener("click", function() {
    if (removeBtn) {
    constructorsArray.splice(i, 1);
    targetContainer.remove();
    numberOfBooks -= 1;
    }})};
};

//Display and hide the form on the page
addButton.addEventListener("click", function showForm() {
  addForm.style.display = 'grid';
});

closeForm.addEventListener("click", function hideForm() {
  addForm.style.display = 'none';
});

//Function that adds a book from the form to the DOM : 
addToMyBooksButton.addEventListener("click", addBookToLibrary);

function addBookToLibrary () {
  event.preventDefault();
  addForm.style.display = 'none';
  numberOfBooks += 1;
  let newBook = new Book(document.getElementById("title").value, document.getElementById("author").value, document.getElementById("year").value, document.getElementById("rating").value, numberOfBooks);
  constructorsArray.push(newBook)  
  mainContainer.innerHTML = "";
  constructorsArray.forEach(displayBook);
  addForm.reset();
  addRemoverLoop();
};


  //Reset Main Container :
 function displayBooks() {
  const bookContainer = document.getElementById('main-container');
  const books = document.querySelectorAll('.book-container');
  books.forEach(book => bookContainer.removeChild(book));

  for (let i=0; i<constructorsArray.length; i++) {
    createBook(constructorsArray[i])
  }
}

function createBook(book) {
  const bookContainer = document.querySelector('.main-container');
  const bookDiv = document.createElement('div');
  const titleDiv = document.createElement('div');
  const authorDiv = document.createElement('div');
  const yearDiv = document.createElement('div');
  const pageDiv = document.createElement('div');
  const removeBtn = document.createElement('button');
  const readBtn = document.createElement('button');

  bookDiv.classList.add('book-container');
  bookDiv.setAttribute('id', constructorsArray.indexOf(book));

  titleDiv.innerHTML(constructorsArray[i].title.value);
  titleDiv.classList.add('title');
  authorDiv.innerHTML(constructorsArray[i].author.value);
  yearDiv.innerHTML(constructorsArray[i].year.value)
  pageDiv.innerHTML(constructorsArray[i].page.value)
  bookDiv.appendChild(titleDiv);

  // à la fin : 
  bookContainer.appendChild(bookDiv);
}

  //Create DOM Elements : 

  function addBookToLibrary () {
    event.preventDefault();  

  addForm.style.display = 'none';
  numberOfBooks += 1;
  let newBook = new Book(document.getElementById("title").value, document.getElementById("author").value, document.getElementById("year").value, document.getElementById("rating").value, numberOfBooks);
  constructorsArray.push(newBook)  
  mainContainer.innerHTML = "";
  constructorsArray.forEach(displayBook);
  addForm.reset();
  addRemoverLoop();
};
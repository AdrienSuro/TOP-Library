//Create and store the book objects :
function Book(title, name, year, rating, bookNr) {
  this.title = title;
  this.name = name;
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
      <p>Name : ${array.name}</p>
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
addToMyBooksButton.addEventListener("click", function grabBookInfo () {
  numberOfBooks += 1;
  addConstructorToArray(new Book(document.getElementById("title").value, document.getElementById("name").value, document.getElementById("year").value, document.getElementById("rating").value, numberOfBooks));
  addForm.style.display = 'none';
  mainContainer.innerHTML = "";
  constructorsArray.forEach(displayBook);
  addForm.reset();
  addRemoverLoop();
});
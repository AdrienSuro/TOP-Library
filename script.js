//Array to store the constructors : 
const constructorsArray = [];
let numberOfBooks = 0;
const removersArray = [];

//Function that adds constructors to the above array : 
function addConstructorToArray(constructor) {
  constructorsArray.push(constructor);
};

function addRemoverToArray(remover) {
  removersArray.push(remover)
};

//Constructor
function Book(title, name, year, rating, bookNr) {
  this.title = title;
  this.name = name;
  this.year = year;
  this.rating = rating;
  this.bookNr = bookNr;
  this.button = function() {
    let test = document.getElementById(`remove-book${bookNr}`);
    test.addEventListener("click", function() {
      let zeta = getElementById(`book-containers${bookNr}`)
      zeta.remove()
    })
}
}

function RemoverArray(bookNumber, targetCross) {
  this.delete = bookNumber;
  this.grab = document.getElementById(`name`);
  this.action = targetCross;
  this.event = function() {
    this.grab.addEventListener("click", this.action)
  }
  console.log(removersArray);
}

//Function to add books to the DOM : 
function displayBook(array) {
  mainContainer.innerHTML += 
  `<div id=book-container${numberOfBooks} >
      <img src="img/close.png" id="remove-book${numberOfBooks}">
      <p>Title : ${array.title}</p>
      <p>Name : ${array.name}</p>
      <p>Year : ${array.year}</p>
      <p>Rating : ${array.rating}</p>
  </div>`
};

var element = document.body.querySelector('.element[data-id="123456789"]')

const mainContainer = document.getElementById("main-container");
const addForm = document.getElementById("add-form");
const addButton = document.getElementById("add-button");
const closeForm = document.getElementById("close-form");
const addToMyBooksButton = document.getElementById("addToMyBooks");

addButton.addEventListener("click", function showForm() {
  addForm.style.display = 'grid';
  console.log("Add works");
});
closeForm.addEventListener("click", function hideForm() {
  console.log("Close it");
  addForm.style.display = 'none';
});
addToMyBooksButton.addEventListener("click", function grabBookInfo () {
  numberOfBooks += 1;
  addConstructorToArray(new Book(document.getElementById("title").value, document.getElementById("name").value, document.getElementById("year").value, document.getElementById("rating").value, numberOfBooks));
  addRemoverToArray(new RemoverArray(numberOfBooks, numberOfBooks));
  addForm.style.display = 'none';
  mainContainer.innerHTML = "";
  constructorsArray.forEach(displayBook);
  addForm.reset();
  console.log(constructorsArray);
});
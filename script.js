//Array to store the constructors : 
const constructorsArray = [];

//Function that adds constructors to the above array : 
function addConstructorToArray(constructor) {
  constructorsArray.push(constructor);
}

//Constructor
function Book(title, name, year, rating) {
  this.title = title;
  this.name = name;
  this.year = year;
  this.rating = rating;
}

//DOM Manipulation : 
const mainContainer = document.getElementById("main-container");


//Function to add books to the DOM : 
function displayBook(array) {
  mainContainer.innerHTML += 
  `<div>
      <p>Title : ${array.title}</p>
      <p>Name : ${array.name}</p>
      <p>Year : ${array.year}</p>
  </div>`;
}

//Test Books : 
const book1 = new Book("Germinal", "Emile Zola", 1885, 7.5);
const book2 = new Book("Nana", "Emile Zola", 1879, 8.0);
const book3 = new Book("Lolita", "Vladimir Nabokov", 1955, 8.5);
const book4 = new Book("Voyage au bout de la nuit", "Céline", 1932, 8.0);
const book5 = new Book("Flash", "Charles Duchaussois", 1970, 7.0);
const book6 = new Book("Love", "Charles Duchaussois", 1970, 7.0);

//Add books to the array
addConstructorToArray(book1);
addConstructorToArray(book2);
addConstructorToArray(book3);
addConstructorToArray(book4);
addConstructorToArray(book5);
addConstructorToArray(book6);


//Loop over the array : 
constructorsArray.forEach(displayBook);

//Show form on click :
const addForm = document.getElementById("add-form");
const addButton = document.getElementById("add-button");
const closeForm = document.getElementById("close-form");
addButton.addEventListener("click", showForm);
closeForm.addEventListener("click", hideForm);

function showForm() {
  addForm.style.display = "grid";
}
function hideForm() {
  addForm.style.display = "none";
}


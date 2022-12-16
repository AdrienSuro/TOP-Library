//Array to store the constructors : 
const constructorsArray = [];

//Function that adds constructors to the above array : 
function addConstructorToArray(constructor) {
  constructorsArray.push(constructor);
}

//Constructor
function Book(title, name, year, read, rating) {
  this.title = title;
  this.name = name;
  this.year = year;
  this.read = read;
  this.rating = rating;
}

//DOM Manipulation : 
const mainContainer = document.getElementById("main-container");


//Function to add books to the DOM : 
function displayBook(array) {
  mainContainer.innerHTML += `<div><p>I have read the book ${array.title}<p><div>`;
  mainContainer.innerHTML += `<div><p>written by ${array.name}.</p></div>`;
}

//Test Books : 
const book1 = new Book("Germinal", "Zola", 1875, "yes", 7.5);
const book2 = new Book("Nana", "Zola", 1880, "yes", 8.0);

//Add books to the array
addConstructorToArray(book1);
addConstructorToArray(book2);

//Loop over the array : 
constructorsArray.forEach(displayBook);




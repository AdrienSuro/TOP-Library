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


//Function to add books to the DOM : 
function displayBook(array) {
  mainContainer.innerHTML += 
  `<div>
      <p>Title : ${array.title}</p>
      <p>Name : ${array.name}</p>
      <p>Year : ${array.year}</p>
      <p>Rating : ${array.rating}</p>
  </div>`
};

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
  addConstructorToArray(new Book(document.getElementById("title").value, document.getElementById("name").value, document.getElementById("year").value, document.getElementById("rating").value));
  addForm.style.display = 'none';
  mainContainer.innerHTML = "";
  constructorsArray.forEach(displayBook);
  addForm.reset();
});



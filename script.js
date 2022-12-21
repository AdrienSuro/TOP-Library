//Array to store the constructors : 
const constructorsArray = [];
let numberOfBooks = -1;

//Function that adds constructors to the above array : 
function addConstructorToArray(constructor) {
  constructorsArray.push(constructor);
};

//Constructor
function Book(title, name, year, rating, bookNr) {
  this.title = title;
  this.name = name;
  this.year = year;
  this.rating = rating;
  this.bookNr = bookNr;
}

//Function to add books to the DOM : 
function displayBook(array) {
  mainContainer.innerHTML += 
  `<div id=book-container} >
      <img src="img/close.png" id="remove-book${array.bookNr}">
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


/* Attempt to construct the delete functionality through a function. Will now try to write a loop :  

  function removeIt() {
  const removeBook = document.getElementById('remove-book');
  if (removeBook) {removeBook.addEventListener("click", function removeFromArray() {
  console.log(constructorsArray);  
  mainContainer.innerHTML = "";
  console.log(constructorsArray);  
  constructorsArray.pop();
  console.log(constructorsArray);
  constructorsArray.forEach(displayBook);
  console.log("Removing Works");
})
}
}; */

function addRemoverLoop() {
  for (let i=0; i<constructorsArray.length; i++) {
  let removeBtn = document.getElementById(`remove-book${i}`);
  console.log(removeBtn);
  console.log(constructorsArray);
  removeBtn.addEventListener("click", function() {
    constructorsArray.splice(i, 1);
    console.log("The result after the splice is : ");
    console.log(constructorsArray);
  });
}
}

addButton.addEventListener("click", function showForm() {
  addForm.style.display = 'grid';
});

closeForm.addEventListener("click", function hideForm() {
  addForm.style.display = 'none';
});

addToMyBooksButton.addEventListener("click", function grabBookInfo () {
  numberOfBooks += 1;
  addConstructorToArray(new Book(document.getElementById("title").value, document.getElementById("name").value, document.getElementById("year").value, document.getElementById("rating").value, numberOfBooks));
  addForm.style.display = 'none';
  mainContainer.innerHTML = "";
  constructorsArray.forEach(displayBook);
  console.log(constructorsArray);
  addForm.reset();
  addRemoverLoop();
});
const mainContainer = document.getElementById("main-container");
const form = document.getElementById("add-form");
const showFormButton = document.getElementById("add-button");
const closeFormButton = document.getElementById("close-form");
const submitButton = document.getElementById("addToMyBooks");

showFormButton.addEventListener("click", function () {
  form.style.display = "grid";
});

closeFormButton.addEventListener("click", function () {
  form.style.display = "none";
});

function Book(title, name, year, rating, bookNr) {
  this.title = title;
  this.name = name;
  this.year = year;
  this.rating = rating;
  this.bookNr = bookNr;
}

function addBook({ title, name, year, rating, read }) {
  const wrapper = document.createElement("div");
  wrapper.id = "book-container";
  wrapper.innerHTML = `
    <img src="img/close.png" id="remove-book" title="Remove book" />
    <p>Title : ${title}</p>
    <p>Name : ${name}</p>
    <p>Year : ${year}</p>
    <p>Rating : ${rating}</p>
  `;

  const removeButton = wrapper.querySelector("#remove-book");
  removeButton.addEventListener("click", function () {
    wrapper.remove();
  });

  mainContainer.append(wrapper);
}

submitButton.addEventListener("click", function () {
  const inputs = [...form.querySelectorAll("input")];

  const bookValues = inputs.map(function (input) {
    if (input.type === "checkbox") {
      return input.checked;
    }

    return input.value;
  });

  addBook(new Book(...bookValues));
  form.style.display = "none";
  form.reset();
});

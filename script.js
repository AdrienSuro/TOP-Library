//Create and store the book objects :
function Book(title, name, year, rating, bookNr) {
  this.title = title;
  this.name = name;
  this.year = year;
  this.rating = rating;
  this.bookNr = bookNr;
}

const constructorsArray = [];

// Ici le seul truc que fait ta fonction est de push un nouveau livre dans l'array de livres
// Ca crée un peu de complexité pour pas grand-chose, je pense qu'on peut s'en passer et push directement
// De manière générale tu crées des fonctions utilitaires comme ça quand t'as des opérations un peu complexes ou verbeuses pour rendre ton code plus lisible
// Mais là, ce que tu fais est simple donc autant le faire directement sur place
function addConstructorToArray(constructor) {
  constructorsArray.push(constructor);
}

// Je vois que t'as une variable ici pour pouvoir numéroter tes livres et les supprimer si besoin
// Mais je pense qu'il serait plus simple, et moins error-prone, de se reposer sur une valeur un peu plus "pragmatique" pour avoir le nombre de livres
// Par exemple, le nombre d'objets livre dans ton array constructorsArray
// (check le début de la fonction qui crée les bouquins à partir du form)
// let numberOfBooks = -1;
// Par ailleurs, j'ai découvert un petit bug de suppression que je décris plus tard
// Donc on va sans doute complètement supprimer numberOfBooks pour privilégier une autre approche

//Create DOM Elements :
const mainContainer = document.getElementById("main-container");
const addForm = document.getElementById("add-form");
const addButton = document.getElementById("add-button");
const closeForm = document.getElementById("close-form");
const addToMyBooksButton = document.getElementById("addToMyBooks");

//Function to display a book on the page :
function displayBook(array) {
  mainContainer.innerHTML += `<div id='book-container${array.bookNr}'>
      <img src="img/close.png" id="remove-book${array.bookNr}" title="Remove book">
      <p>Title : ${array.title}</p>
      <p>Name : ${array.name}</p>
      <p>Year : ${array.year}</p>
      <p>Rating : ${array.rating}</p>
  </div>`;
}

//Function creating an event listener that removes the book from the page and from the constructors array :
function addRemoverLoop() {
  // Ici je vois qu'il y a un petit bug avec la suppression de livres
  // Quand tu suis ces étapes, ta suppression ne fonctionne plus :
  // 1. crée un livre AAA => il obtient l'id book-container0
  // 2. crée un livre BBB => il obtient l'id book-container1
  // 3. supprime le livre AAA => ton numberOfBooks a diminué de 1
  // 4. crée un livre CCC => il obtient l'id book-container1, comme le livre BBB
  // 5. tu ne peux plus supprimer tes livres, car il y a plus d'un élémenta avec l'id book-container1
  // Pour résoudre ce souci, je pense que le plus simple serait de modifier la manière dont tu crées et supprimes tes livres
  // Je te montre ça dans le fichier script-2, avec une proposition de refacto intégant le reste de mes remarques :)
  for (let i = 0; i < constructorsArray.length; i++) {
    let removeBtn = document.getElementById(`remove-book${i}`);
    let targetContainer = document.getElementById(`book-container${i}`);
    removeBtn.addEventListener("click", function () {
      if (removeBtn) {
        constructorsArray.splice(i, 1);
        targetContainer.remove();
        // numberOfBooks -= 1;
      }
    });
  }
}

//Display and hide the form on the page
// Quand tu invoques une fonction directement comme c'est le cas ici, t'es pas obligé de la nommer car de toutes manières tu ne la réutiliseras jamais ailleurs
// addButton.addEventListener("click", function showForm() {
addButton.addEventListener("click", function () {
  addForm.style.display = "grid";
});

// Pareil ici, on peut dégager hideForm
// closeForm.addEventListener("click", function hideForm() {
closeForm.addEventListener("click", function () {
  addForm.style.display = "none";
});

//Function that adds a book from the form to the DOM :
// Idem ici, on n'est pas obligé de nommer la fonction
// addToMyBooksButton.addEventListener("click", function grabBookInfo(e) {
addToMyBooksButton.addEventListener("click", function (event) {
  // Par défault, quand on clique sur le bouton submit d'un formulaire il va vouloir refresh la page
  // Ici on préfère éviter, donc on utilise event.preventDefault()
  event.preventDefault();

  // Ici on récupère le nombre de livres dans l'array
  const numberOfBooks = constructorsArray.length;

  const form = document.querySelector("#add-form");
  // Ici, en faisant form.querySelector au lieu de document.querySelector tu ne va sélectionner QUE les inputs qui sont dans le form, pas ceux en dehors
  // Les ... que tu vois ici sont ce qu'on appelle le spread operator, qui en gros "sort" les éléments d'un array ou d'un objet, et les "disperse" à l'endroit souhaité
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  // J'ai spread le résultat de form.querySelector car querySelector ne renvoie pas un array, mais une NodeList
  // La NodeList ressemble à un array, mais elle n'en a pas toutes les méthodes. Typiquement, je ne peux pas faire un .map dessus
  // Donc ici je spread le résultat de querySelector dans un nouvel array, pour avoir tous mes inputs dans un array et pouvoir faire mon .map
  // C'est l'équivalent de :
  // const inputs = Array.from(form.querySelectorAll("input"));
  const inputs = [...form.querySelectorAll("input")];

  // Ici j'ai donc dans inputs une list de mes inputs, avec toutes leurs propriétés (type, name, value, checked, etc.)
  // Ce que je veux, c'est n'avoir plus qu'un array contenant les valeurs de mon form
  // Donc je vais itérer sur mon array d'inputs, et je vais dire à mon map de n'ajouter à mon nouvel array que ce qui m'intéresse, soit value ou checked, en fonction de si mon input est une checkbox ou pas
  // PS: contre-intuitivement, les inputs de type checkbox n'ont pas leur valeur dans la propriété value, mais dans checked, et ça te renvoie un boolean
  const bookValues = inputs.map(function (input) {
    // Si mon input est une checkbox, je renvoie input.checked
    if (input.type === "checkbox") {
      return input.checked;
    }
    // Sinon, je renvoie input.value
    return input.value;
  });

  // Maintenant, pour créer mon livre je vais avoir plusieurs possibilité, qui vont au final avoir le même résultat
  // L'intérer de ces différentes méthodes est surtout leur degré de lisibilité

  // Méthode "naive", tu passes tous les éléments un par un depuis bookValues
  // addConstructorToArray(
  //   new Book(
  //     bookValues.title,
  //     bookValues.author,
  //     bookValues.year,
  //     bookValues.rating,
  //     bookValues.read,
  //     numberOfBooks
  //   )
  // );

  // Méthode par déstructuration
  // PS: tu peux destructurer des objets mais aussi des arrays !
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  // Ici je récupère par déstructuratio les valeurs qui nous intéressent depuis bookValues
  // const { title, author, year, rating, read } = bookValues;
  // Et je peux les donner directement à mon Book constructor, sans avoir à les préfixer de bookValues
  // addConstructorToArray(new Book(title, author, year, rating, read, numberOfBooks));

  // Méthode par spread operator
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  // Ici on voit moins de détails quant aux données qu'on passe au constructor car on n'a pas tous les noms des valeurs clairement écrits
  // Mais l'avantage, c'est que c'est scalable !
  // Si par exemple on a un form avec 47 valeurs à passer, toutes les passer à la main serait archi chiant :)
  // addConstructorToArray(new Book(...bookValues, numberOfBooks));

  // numberOfBooks += 1;
  constructorsArray.push(
    new Book(
      document.getElementById("title").value,
      document.getElementById("name").value,
      document.getElementById("year").value,
      document.getElementById("rating").value,
      numberOfBooks
    )
  );
  addForm.style.display = "none";
  mainContainer.innerHTML = "";
  constructorsArray.forEach(displayBook);
  addForm.reset();
  addRemoverLoop();
});

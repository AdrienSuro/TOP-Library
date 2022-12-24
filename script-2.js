const mainContainer = document.getElementById("main-container");
const form = document.getElementById("add-form");
const showFormButton = document.getElementById("add-button");
const closeFormButton = document.getElementById("close-form");
const submitButton = document.getElementById("addToMyBooks");

//Display and hide the form on the page
showFormButton.addEventListener("click", function showForm() {
  form.style.display = "grid";
});

closeFormButton.addEventListener("click", function hideForm() {
  form.style.display = "none";
});

//Create and store the book objects :
function Book(title, name, year, rating, bookNr) {
  this.title = title;
  this.name = name;
  this.year = year;
  this.rating = rating;
  this.bookNr = bookNr;
}

// Ici, ma fonction addBook reçoit un objet book, qui contient les propriétés title, name, year, rating et read
// Je peux donc directement déstructurer ces propriétés dans la liste d'arguments
// Ca m'évite d'avoir à préfixer chaque propriété avec "book."
function addBook({ title, name, year, rating, read }) {
  // On crée programmatiquement des DOM nodes et on leur donnes les attributs et le contenu qu'on veut
  const wrapper = document.createElement("div");
  wrapper.id = "book-container";
  wrapper.innerHTML = `
    <img src="img/close.png" id="remove-book" title="Remove book" />
    <p>Title : ${title}</p>
    <p>Name : ${name}</p>
    <p>Year : ${year}</p>
    <p>Rating : ${rating}</p>
  `;

  // Avoir déjà créé les nodes nous permet de sélectionner notre bouton de remove facilement, sans avoir besoin de recourir à des id
  // C'est grâce à ça qu'on n'aura plus le bug mentionné dans l'autre fichier, car désormais chaque remove button ciblera nécessairement son parent
  // Grâce à wrapper.querySelector on est sûrs de sélectionner le bon remove button
  const removeButton = wrapper.querySelector("#remove-book");
  removeButton.addEventListener("click", function () {
    wrapper.remove();
  });

  // Enfin, on ajoute notre nouveau livre au DOM
  mainContainer.append(wrapper);
}

//Function that adds a book from the form to the DOM :
submitButton.addEventListener("click", function grabBookInfo() {
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

    // On n'a pas besoin d'utiliser de else pour return input.value, car il est implicite
    // Si input.type === "checkbox", alors la fonction retournera input.checked et s'arrêtera
    // Si la fonction s'exécute jusqu'à la ligne 74, c'est qu'implicitement, input.type === "checkbox" ==> false
    // Donc pas besoin de else
    // En revanche, si on ne retournait pas de valeur en cas de input.type === "checkbox"
    // Alors il aurait fallu le else, car peu importe le résultat de input.type === "checkbox" la fonction aurait continué son exécution et serait arrivée jusqu'à la ligne 74
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
  // addBook(new Book(...bookValues));

  addBook(new Book(...bookValues));
  form.style.display = "none";
  form.reset();
});

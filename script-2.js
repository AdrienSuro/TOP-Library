const mainContainer = document.getElementById("main-container");
const form = document.getElementById("add-form");
const showFormButton = document.getElementById("add-button");
const closeFormButton = document.getElementById("close-form");
const submitButton = document.getElementById("addToMyBooks");

showFormButton.addEventListener("click", function showForm() {
  form.style.display = "grid";
});

closeFormButton.addEventListener("click", function hideForm() {
  form.style.display = "none";
});

function Book(title, name, year, rating) {
  this.title = title;
  this.name = name;
  this.year = year;
  this.rating = rating;
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

submitButton.addEventListener("click", function grabBookInfo() {
  const inputs = [...form.querySelectorAll("input")];

  const bookValues = inputs.map(function (input) {
    if (input.type === "checkbox") {
      return input.checked;
    }
    return input.value;
  });

  // Je donne les données récupérées dans mon form à ma fonction
  // Qui va se charger de créer la node
  // + lui attribuer l'eventListener de suppression
  // + l'ajouter au DOM
  addBook(new Book(...bookValues));

  // Comme chaque bouton de suppression sait déjà quelle node il doit supprimer, on n'est pas obligés de maintenir une liste de books avec des id etc
  // Chaque élément est responsable de sa propre suppression

  // Pas besoin non plus de surveiller la longueur de la liste de livres pour la passer au constructeur, puisque la suppression est déjà gérée
  // Donc pas de liste de livres
  // Et on a aussi pu supprimer bookNr du constructeur de livres

  form.style.display = "none";
  form.reset();
});

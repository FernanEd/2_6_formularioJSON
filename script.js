// TABs

// FORM 2 JSON

const $fm2json = document.querySelector("#fm2json");
const $firstname = $fm2json.querySelector("#firstname");
const $lastname = $fm2json.querySelector("#lastname");
const $jsontxtarea = document.querySelector("#jsontxtarea");

$fm2json.addEventListener("submit", (e) => {
  e.preventDefault();
  let firstname = $firstname.value;
  let lastname = $lastname.value;
  $jsontxtarea.value = JSON.stringify({ firstname, lastname });
});

const $FillFormBtn = document.querySelector("#fillform");
$FillFormBtn.addEventListener("click", (e) => {
  let obj = JSON.parse($jsontxtarea.value);

  $firstname.value = obj.firstname;
  $lastname.value = obj.lastname;
});

// TODOS PART

const TODOS = JSON.parse(localStorage.getItem("todos")) || [];
const $todosWrapper = document.querySelector("#todos-wrapper");

const updateTODOS = () => {
  localStorage.setItem("todos", JSON.stringify(TODOS));

  $todosWrapper.innerHTML = TODOS.map(
    ({ todo, priority }, index) =>
      `<div class='todos-item' >
              <div>
                <h2>${todo}</h2>
                <p>Prioridad: ${priority}<p>
              </div>
              <button class='remove-todo' aria-index=${index}>X</button>
             </div>`
  ).join("");
};

$todosWrapper.addEventListener("click", (e) => {
  if (e.target.className === "remove-todo") {
    let index = e.target.getAttribute("aria-index");
    TODOS.splice(Number(index), 1);
    updateTODOS();
  }
});

const $addForm = document.querySelector("#add-form");
$addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = $addForm.querySelector("#todo").value;
  const priority = $addForm.querySelector("#priority").value;

  if (todo && priority) {
    TODOS.push({ todo, priority });
    updateTODOS();
    e.target.reset();
  }
});

updateTODOS();

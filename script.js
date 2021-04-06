// FORM 2 JSON

const $form2JSON = documen.querySelector("#form2json");

$form2JSON.addEventListener("submit", (e) => {
  e.preventDefault();
  let firstname = $form2JSON.querySelector("#firstname").value;
  let lasname = $form2JSON.querySelector("#lastname").value;

  let $jsontxtarea = document.querySelector("#jsontxtarea");
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

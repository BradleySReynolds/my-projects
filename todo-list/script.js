const inputButton = document.querySelector(".input-button");
const inputText = document.querySelector(".input-text");
const noTasks = document.querySelector(".no-tasks");
const taskList = document.querySelector(".task-list");

const getTodos = function () {
  if (localStorage.getItem("todos") === null) todos = [];
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
};

const saveTodos = (inputData) => {
  const todos = getTodos();

  todos.push(inputData);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const deleteTodos = (data) => {
  const todos = getTodos();
  const findIndex = todos.indexOf(data);

  todos.splice(findIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const populateTasks = function (input) {
  noTasks.remove();

  taskList.innerHTML += `<p style="color:black">${input}<button class="btn-remove" style="color:red ;text-decoration: underline; border: none; background-color: white;">remove</button></p>`;

  let btnRemove = document.querySelectorAll(".btn-remove");

  btnRemove.forEach((btn) =>
    btn.addEventListener("click", function () {
      parent = btn.parentElement.textContent.replace("remove", "").toString();

      deleteTodos(parent);

      btn.parentElement.remove();
    })
  );
};

getTodos().forEach((ele) => populateTasks(ele));

inputButton.addEventListener("click", function () {
  noTasks.remove();

  saveTodos(inputText.value);

  populateTasks(inputText.value);

  inputText.value = "";
});

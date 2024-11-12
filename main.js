let input = document.querySelector(".add-task input");
let addBtn = document.querySelector(".add-task .plus");
let container = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let taskCompleted = document.querySelector(".tasks-completed span");
function changeTheme(isChecked) {
  if (isChecked) {
    document.body.setAttribute("dark", "");
  } else {
    document.body.removeAttribute("dark");
  }
}
function saveNoteToLocalStorage(note) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}
function loadNotes() {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach(function (note) {
    let mainSpan = document.createElement("span");
    let text = document.createTextNode(note);
    mainSpan.appendChild(text);
    container.appendChild(mainSpan);
    mainSpan.setAttribute("class", "task-box");
    let dltElm = document.createElement("span");
    let dltTxt = document.createTextNode("Delete");
    dltElm.appendChild(dltTxt);
    mainSpan.appendChild(dltElm);
    dltElm.setAttribute("class", "delete");
  });
}

function updateTasksCounter() {
  tasksCount.innerText = document.querySelectorAll(
    ".tasks-content .task-box"
  ).length;
  taskCompleted.innerText = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}

window.onload = function () {
  loadNotes();
  updateTasksCounter();
};

addBtn.onclick = function () {
  if (input.value.trim() === "") {
    Swal.fire("Напишите заметку");
  } else {
    let note = input.value.trim();
    saveNoteToLocalStorage(note);
    let mainSpan = document.createElement("span");
    let text = document.createTextNode(input.value);
    mainSpan.appendChild(text);
    container.appendChild(mainSpan);
    mainSpan.setAttribute("class", "task-box");
    let dltElm = document.createElement("span");
    let dltTxt = document.createTextNode("Delete");
    dltElm.appendChild(dltTxt);
    mainSpan.appendChild(dltElm);
    dltElm.setAttribute("class", "delete");

    input.value = "";
    input.focus();
    updateTasksCounter();
  }
};
document.addEventListener("click", function (e) {
  if (e.target.className == "delete") {
    e.target.parentNode.remove();
    updateTasksCounter();
  }
  if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("finished");
    updateTasksCounter();
  }
});

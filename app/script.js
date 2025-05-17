document.addEventListener("DOMContentLoaded", () => {
  // grabbing all DOM elements
  const taskInput = document.getElementById("taskInput");
  const addTaskBTN = document.getElementById("addtaskBtn");
  const taskListDisplay = document.getElementById("task-list-container");
  const pomodoroCont = document.getElementById("pomodoro-container");

  //handling tasks functionality

  addTaskBTN.addEventListener("click", () => {
    console.log("addTaskBTN clicked");
    const taskInputValue = taskInput.value.trim();
    console.log(taskInputValue);
    addchildfunc(taskInputValue);
  });

  function addchildfunc(value) {
    const listDiv = document.createElement("div");
    listDiv.innerHTML = `
    <p>${value}</p>
    <button class="sidebtn">Start focussin</button>
    
    
    `;
    listDiv.classList.add("listDiv");
    taskListDisplay.appendChild(listDiv);
  }
});

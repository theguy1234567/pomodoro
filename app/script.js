document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBTN = document.getElementById("addtaskBtn");
  const taskListDisplay = document.getElementById("task-list-container");
  const taskContainer = document.getElementById("taskcontainer");
  const pomodoroCont = document.getElementById("pomodoro-container");
  const pomodoroTimer = document.getElementById("pomodoro-timer");
  const startBTN = document.getElementById("start");
  const pauseBTN = document.getElementById("pause");
  const restartBTN = document.getElementById("restart");
  const goBackBTN = document.getElementById("goback");
  const zenAudio = document.getElementById("zenAudio");

  let taskArr = JSON.parse(localStorage.getItem("task")) || [];
  let pomodoroDuration = 25 * 60;
  let remainingTime = pomodoroDuration;
  let timerInterval = null;
  let isRunning = false;

  addTaskBTN.addEventListener("click", () => {
    const taskInputValue = taskInput.value.trim();
    if (!taskInputValue) {
      alert("Empty task!");
      return;
    }
    if (taskArr.includes(taskInputValue)) {
      alert("Task already exists!");
      return;
    }
    addTask(taskInputValue, true);
    taskInput.value = ""; // Clear input after adding
  });

  function addTask(value, shouldStore = false) {
    const listDiv = document.createElement("div");
    listDiv.classList.add("listDiv");
    listDiv.setAttribute("data-task", value);

    listDiv.innerHTML = `
      <p>${value}</p>
      <button class="delBtn sidebtn">Delete</button>
      <button class="start-pomodoroBtn sidebtn">Start focussin</button>
    `;

    taskListDisplay.appendChild(listDiv);

    if (shouldStore) {
      taskArr.push(value);
      storeTasks();
    }

    const startPomodoroBtn = listDiv.querySelector(".start-pomodoroBtn");
    const delBtn = listDiv.querySelector(".delBtn");

    startPomodoroBtn.addEventListener("click", pomodoroFunc);
    delBtn.addEventListener("click", deleteTask);
  }

  function deleteTask(e) {
    const taskElement = e.target.parentElement;
    const taskValue = taskElement.getAttribute("data-task");

    taskArr = taskArr.filter((task) => task !== taskValue);
    storeTasks();
    taskElement.remove();
  }

  function pomodoroFunc() {
    playZenAudio();
    changeTheme();

    taskContainer.classList.add("fade");
    taskContainer.classList.remove("visible");

    setTimeout(() => {
      taskContainer.classList.add("hidden");
      pomodoroCont.classList.remove("hidden");
      pomodoroCont.classList.add("visible");
      pomodoroCont.classList.remove("fade");
    }, 300);

    restartTimer();
    startTimer();
  }

  function formatTime(seconds) {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }

  function startTimer() {
    playZenAudio();

    if (isRunning) return;
    isRunning = true;

    timerInterval = setInterval(() => {
      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        isRunning = false;
        alert("Time's up!");
      } else {
        remainingTime--;
        pomodoroTimer.textContent = formatTime(remainingTime);
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    stopZenAudio();
  }

  function restartTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    remainingTime = pomodoroDuration;
    pomodoroTimer.textContent = formatTime(remainingTime);
  }

  function gobackfunc() {
    stopZenAudio();
    revertTheme();

    pomodoroCont.classList.add("fade");
    pomodoroCont.classList.remove("visible");

    setTimeout(() => {
      pomodoroCont.classList.add("hidden");
      taskContainer.classList.remove("hidden");
      taskContainer.classList.add("visible");
      taskContainer.classList.remove("fade");
    }, 300);
  }

  pauseBTN.addEventListener("click", pauseTimer);
  restartBTN.addEventListener("click", restartTimer);
  startBTN.addEventListener("click", startTimer);
  goBackBTN.addEventListener("click", gobackfunc);

  function storeTasks() {
    localStorage.setItem("task", JSON.stringify(taskArr));
  }

  taskArr.forEach((task) => addTask(task, false));

  function playZenAudio() {
    zenAudio.volume = 0.5;
    zenAudio.play();
  }

  function stopZenAudio() {
    zenAudio.pause();
    zenAudio.currentTime = 0;
  }

  function changeTheme() {
    document.body.classList.add("dark-theme");
  }

  function revertTheme() {
    document.body.classList.remove("dark-theme");
  }
});

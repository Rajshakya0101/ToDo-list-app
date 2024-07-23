document.addEventListener("DOMContentLoaded", () => {
  // const storedTask = localStorage.getItem("tasks", JSON.parse(tasks))
  const storedTask = JSON.parse(localStorage.getItem("tasks"));

  if (storedTask) {
    storedTask.forEach((task) => tasks.push(task));
    updateTaskList();
    updateStats();
  }
});

const tasks = [];

const saveTask = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value = "";
    // console.log(tasks);
    updateTaskList();
    updateStats();
    saveTask();
  }
  else{
    swal("Input field is blank!", "Enter your task to add it in your task list.", "warning");
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  // console.log(tasks);
  updateTaskList();
  updateStats();
  saveTask();
};

const dlt_all_tasks = () => {
  if (tasks.length > 0) {
    tasks.length = 0;
    // tasks.filter(task => task.completed).length = 0;
    if (tasks.length == 0) {
      const progressBar = document.getElementById("progress");
      progressBar.style.width = `0%`;
    }
    updateTaskList();
    updateStats();
    saveTask();
    // reload();
  } else {
    swal("Task list is already Empty!", "No Tasks to Delete", "warning");
    // alert("No Tasks to Delete");
  }
};

const updateStats = () => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTask = tasks.length;
  const progress = (completedTasks / totalTask) * 100;

  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${progress}%`;

  const number = document.getElementById("number");
  number.innerText = `${completedTasks} / ${totalTask}`;

  if(deleteTask != true && tasks.length && completedTasks == totalTask){
    blast();
  }
};

const editTask = (index) => {
  document.getElementById("taskInput").value = tasks[index].text;
  deleteTask(index);
  updateStats();
  saveTask();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  if (tasks.length == 0) {
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `0%`;
  }
  updateTaskList();
  updateStats();
  saveTask();
};

const updateTaskList = () => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    console.log(task.completed);

    listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed == true ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${
                  task.completed == true ? "checked" : ""
                } >
                <p> ${task.text} </p>
            </div>
            <div class="icons">
                <img src="/media/edit.png" alt="edit" onClick = "editTask(${index})">
                <img src="/media/delete.png" alt="delete" onClick = "deleteTask(${index})">
            </div>
        </div>
        `;

    listItem.addEventListener("change", () => toggleTaskComplete(index));
    taskList.appendChild(listItem);
  });
  updateStats();
};

const reload = () => {
  location.reload();
};

document.getElementById("addTask-btn").addEventListener("click", function (e) {
  e.preventDefault();

  addTask();
});

const dlt_all_tasks_btn = document.getElementById("dlt-all-tasks");
dlt_all_tasks_btn.addEventListener("click", dlt_all_tasks);

const blast = () => {
    const defaults = {
        spread: 320,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle", "square", "triangle"],
        colors: ["FFC0CB", "FF69B4", "FF1493", "C71585", "C742EB", "3CF578", "FF60E4", "FCFF33", "FFB900", "D1FF00", "002BFF", "00B2FF", "F000FF"],
    };
      
    confetti({
        ...defaults,
        particleCount: 100,
        scalar: 0.7,
    });
      
    confetti({
        ...defaults,
        particleCount: 25,
        scalar: 1.5,
    });
      
    // confetti({
    //     ...defaults,
    //     particleCount: 1,
    //     scalar: 1,
    // });
};

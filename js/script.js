"use strict";

const getUID = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

class Task {

    constructor(id, title, desc, assigned, dateCreated, status) {
        if (!id) {
            this.id = getUID;
        } else {
            this.id = id;
        }

        // Title of the task
        if (!title) {
            this.title = "No title";
        } else {
            this.title = title;
        }

        // Description of the task / Can be changed to array for checkbox
        if (!desc) {
            this.desc = "No Description";
        } else {
            this.desc = desc;
        }

        // User assigned to the task
        if (!assigned) {
            this.assigned = "Not Assigned";
        } else {
            this.assigned = assigned;
        }

        // When the task was created 
        if (!dateCreated || new Date(dateCreated) == "Invalid Date") {
            this.dateCreated = new Date();
        } else {
            this.dateCreated = new Date(dateCreated);
        }

        // Status (Number)
        // 0 = Incomplete
        // 1 = Complete
        if (!status) {
            status = 0;
        } else if (isNaN(status)) {
            status = parseInt(status);
            if (isNaN(status)) {
                status = 0;
            }
        }
        this.status = status;
    }

    getID = () => {
        return this.id;
    }

    setTitle = (title) => {
        this.title = title;
    }

    getTitle = () => {
        return this.title;
    }

    setDesc = (desc) => {
        this.desc = desc
    }

    getDesc = () => {
        return this.desc;
    }

    setAssigned = assignee => {
        this.assigned = assignee;
    }

    getAssigned = () => {
        return this.assigned;
    }

    setStatus = status => {
        this.status = status;
    }

    getStatus = () => {
        return this.status;
    }

    toHTML = () => {
        let checked = "";
        let completed = "";
        if (this.status) {
            checked = "checked";
            completed = "complete";
        }
        const taskHTML = `<div class="task" id="${this.id}">
      <div class="title flex flex-align ${completed}">
        <input type="checkbox" name="progress" id="progress${this.id}" ${checked}>
        <label for="progress${this.id}">${this.title}</label>
      </div>
      <div class="desc ${completed}">
        ${this.desc}
      </div>

      <div class="taskinfo flex flex-wrap">
        <div class="assigned flex">
          <div class="person flex flex-center">
            ${this.assigned}
          </div>
        </div>
        <div class="date flex flex-center">
          ${this.dateCreated.toLocaleDateString()}
        </div>
        <div class="edit flex flex-align">
            Edit
        </div>
        <div class="delete flex flex-align">
            Delete
        </div>

      </div>

    </div>`;
        return taskHTML;
    }

}

const addTask = () => {
    const title = prompt("Enter Task Title:");
    if (!title) return;
    const desc = prompt("Enter Task Description:");
    const assigned = prompt("Enter Task Assignee:");
    const task = new Task(getUID(), title, desc, assigned, new Date(), 0);
    //code to push tasks 
    tasks.push(task);
    //code to update  tasks
    updateLocalTasks(tasks);
    document.querySelector("main").innerHTML += task.toHTML();

    document.querySelector('#search').value = "";
    updateView(tasks);
}

const updateView = (tasks) => {
    document.querySelector("main").innerHTML = '';
    if (tasks.length <= 0) {
        document.querySelector("main").innerHTML = "No tasks available";
        return;
    }
    for (let task of tasks) {
        document.querySelector("main").innerHTML += task.toHTML();
    }

    for(let task of tasks) {
        let edit = document.querySelector(`#${task.getID()} .edit`);
        edit.addEventListener('click', () => {
            console.log('Clicked Edit');
            const newTitle = prompt("Edit Task title", task.getTitle());
            if (newTitle) task.setTitle(newTitle);

            const newDesc = prompt("Edit Task Description", task.getDesc());
            if (newDesc) task.setDesc(newDesc);

            const newAssigned = prompt("Edit Task Assignee", task.getAssigned());
            if (newAssigned) task.setAssigned(newAssigned);

            document.querySelector(`#${task.getID()} .title label`).textContent = task.getTitle();
            document.querySelector(`#${task.getID()} .desc `).textContent = task.getDesc();
            document.querySelector(`#${task.getID()} .person`).textContent = task.getAssigned();
            updateLocalTasks(tasks);
        });

        let trash = document.querySelector(`#${task.getID()} .delete`);
        trash.addEventListener('click', () => {
            console.log('Clicked Delete');
            document.querySelector(`#${task.getID()}`).remove();
            let index = tasks.findIndex(element => element.getID() === task.getID());
            if (index >= 0) {
                tasks.splice(index, 1);
                updateLocalTasks(tasks);
            }
        });

        let status = document.querySelector(`#progress${task.getID()}`);
        status.addEventListener('change', () => {
            if (status.checked) {
                task.setStatus(1);
                document.querySelector(`#${task.getID()} .title`).classList.add('complete');
                document.querySelector(`#${task.getID()} .desc`).classList.add('complete');
            } else {
                task.setStatus(0);
                document.querySelector(`#${task.getID()} .title`).classList.remove('complete');
                document.querySelector(`#${task.getID()} .desc`).classList.remove('complete');
            }
            updateLocalTasks(tasks);
        });
    }
}

let tasks = [];

const updateLocalTasks = (tasks) => {
    localStorage.tasks = JSON.stringify(tasks);
}

document.addEventListener("DOMContentLoaded", () => {

    if (localStorage?.tasks) {
        try {
            tasks = localStorage.tasks;
            tasks = JSON.parse(tasks);

            for (let i in tasks) {
                tasks[i] = new Task(tasks[i].id, tasks[i].title, tasks[i].desc, tasks[i].assigned, tasks[i].dateCreated, tasks[i].status);
            }
            updateView(tasks);
        }
        catch (err) {
            console.log("Error: ", err);
        }
    }

    document.querySelector("#search").addEventListener('change', () => {
        let value = document.querySelector("#search").value.trim();

        document.querySelector('main').innerHTML = '';

        let filtered = tasks.filter((task) => {
            if (JSON.stringify(task).includes(value)) {
                return task;
            }
        });

        updateView(filtered);
    });




    // console.log(tasks[0].getID());
});

// To populate local storage with tasks
const generateTasks = () => {
    for (let i = 0; i < 10; i++) {
        let task = new Task(getUID(), `Title ${i + 1}`, `Description of task ${i + 1}`, `Person ${i + 1}`, new Date(), Math.round(Math.random()));
        tasks.push(task);
    }
    updateLocalTasks(tasks);
}
// generateTasks();

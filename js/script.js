"use strict";

class Task {

    constructor(title, desc, assigned, dateCreated, status) {
        if (!title) {
            title = "No title";
        }
        // Title of the task
        this.title = title;

        if (!desc) {
            desc = "No Description";
        }
        // Description of the task / Can be changed to array for checkbox
        this.desc = desc;

        if (!assigned) {
            assigned = "Not Assigned";
        }
        // User assigned to the task
        this.assigned = assigned;

        if (!dateCreated || new Date(dateCreated) == "Invalid Date") {
            dateCreated = new Date();
        }
        // When the task was created 
        this.dateCreated = new Date(dateCreated);
        if (!status) {
            status = 0;
        }
        if (isNaN(status)) {
            status = parseInt(status);
            if (isNaN(status)) {
                status = 0;
            }
        }
        // Status (Number)
        // 0 = Incomplete
        // 1 = Complete
        this.status = status;
    }

    setTitle = title => {
        this.title = title;
    }

    getTitle = () => {
        return this.title;
    }

    setDesc = desc => {
        this.description = desc
    }

    getDesc = () => {
        return this.description;
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
        const taskHTML = `<div class="task ${completed}">
      <div class="title flex flex-align">
        <input type="checkbox" name="progress" id="progress" ${checked}>
        <label for="progress">${this.title}</label>
      </div>
      <div class="desc">
        ${this.desc}
      </div>

      <div class="taskinfo flex">
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

let tasks = [];

if (localStorage?.tasks) {
    try {
        tasks = localStorage.tasks;
        tasks = JSON.parse(tasks);

        for (let task of tasks) {
            task = new Task(task.title, task.desc, task.assigned, task.dateCreated, task.status);
            console.log(task);
            document.querySelector('main').innerHTML += task.toHTML();
        }
    }
    catch (err) {
        console.log("Error: ", err);
    }
}
// let tasks = [];

// for(let i = 0; i < 10; i++) {
//     let task = new Task(`Title ${i+1}`, `Description of task ${i+1}`, `Person ${i+1}`, new Date(), Math.round(Math.random()));
//     tasks.push(task);

// }

// localStorage.tasks = JSON.stringify(tasks);

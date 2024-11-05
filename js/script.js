"use strict";

class Task {

    constructor(title, desc, assigned, dateCreated, status) {
        if(!title) {
            title = "No title";
        }
        // Title of the task
        this.title = title;

        if(!desc) {
            desc = "No Description";
        }
        // Description of the task / Can be changed to array for checkbox
        this.desc = desc;

        if(!assigned) {
            assigned = "Not Assigned";
        }
        // User assigned to the task
        this.assigned = assigned;

        if(!dateCreated || new Date(dateCreated) == "Invalid Date") {
            dateCreated = new Date();
        }
        // When the task was created 
        this.dateCreated = dateCreated;
        if(!status) {
            status = 0;
        }
        if(isNaN(status)) {
            status = parseInt(status);
            if(isNaN(status)) {
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

}

let tasks = [];

if (localStorage?.tasks) {
    try {
        tasks = localStorage.tasks;
        tasks = JSON.parse(tasks);

        for(let task in tasks) {
            task[i] = new Task(task[i].title, task.description, task.assigned, task.dateCreated, task.status);
            console.log(task.getTitle());
        }
    }
    catch (err) {
        console.log("Error: ", err);
    }
}

console.log(tasks);

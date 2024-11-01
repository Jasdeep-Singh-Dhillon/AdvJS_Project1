"use strict";

class Task {
    constructor(title, description, assigned, dateCreated, status) {
        this.title = title;
        this.description = description;
        this.assigned = assigned;
        this.dateCreated = dateCreated;
        this.status = status;
    }

    setTitle = (title) => {
        this.title = title;
    }

    setDescription = (desc) => {
        this.description = desc;
    }

    setStatus = (status) => {
        this.status = status;
    }

    setAssigned = (users) => {
        this.assigned = users;
    }
}

const task = new Task("Test1", "Description of Test1", "Harjeet", new Date(), "1");

task.setTitle("ChatGPT");

console.log(task);
// const task2 = new Task("Test2", "Changed description very helpful", "Jasdeep", new Date(), "0");


// const tasks = [];
// tasks.push(task);
// tasks.push(task2);
// console.log(tasks);

// localStorage["tasks"] = JSON.stringify(tasks);

// const tasks = JSON.parse(localStorage["tasks"]);
// console.log(tasks);
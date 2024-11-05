"use strict";

let tasks = [];

if(localStorage?.tasks) {
    tasks = JSON.parse(localStorage[tasks]);
}

class Task {
    constructor(title, description, assigned, dateCreated, status) {
        // Title of the task
        this.title = title;

        // Description of the task / Can be changed to array for checkbox
        this.description = description;

        // User assigned to the task
        this.assigned = assigned;

        // When the task was created 
        this.dateCreated = dateCreated;

        // Status (Number)
        // 0 = Incomplete
        // 1 = Complete
        this.status = status;
    }

}

const task = new Task("Test1", "Description of Test1", "Harjeet", new Date(), 1);

// task.setTitle("ChatGPT");

console.log(task);
// const task2 = new Task("Test2", "Changed description very helpful", "Jasdeep", new Date(), 0);


// const tasks = [];
// tasks.push(task);
// tasks.push(task2);
// console.log(tasks);

// localStorage["tasks"] = JSON.stringify(tasks);

console.log(tasks);

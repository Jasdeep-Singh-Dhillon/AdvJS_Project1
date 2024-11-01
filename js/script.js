"use strict";

class Task {
    constructor(title, description, assigned, dateCreated, status) {
        this.title = title;
        this.description = description;
        this.assigned = assigned;
        this.dateCreated = dateCreated;
        this.status = status;
    }

    // setTitle = (title) => {
    //     this.title = title;
    // }

    // setDescription = (desc) => {
    //     this.description = desc;
    // }

    // setStatus = (status) => {
    //     this.status = status;
    // }

    // setAssigned = (user) => {
    //     this.assigned = user;
    // }
}

/*
tasks:"[{"title":"Test1","description":"Description of Test1","assigned":"Harjeet","dateCreated":"2024-11-01T03:36:04.881Z","status":"1"},{"title":"Test2","description":"Changed description very helpful","assigned":"Jasdeep","dateCreated":"2024-11-01T03:36:04.881Z","status":"0"}]"
*/


const task = new Task("Test1", "Description of Test1", "Harjeet", new Date(), 1);

// task.setTitle("ChatGPT");

console.log(task);
// const task2 = new Task("Test2", "Changed description very helpful", "Jasdeep", new Date(), 0);


// const tasks = [];
// tasks.push(task);
// tasks.push(task2);
// console.log(tasks);

// localStorage["tasks"] = JSON.stringify(tasks);



const tasks = JSON.parse(localStorage["tasks"]);
tasks[0].title = "Changed to check if this works";

console.log(tasks);

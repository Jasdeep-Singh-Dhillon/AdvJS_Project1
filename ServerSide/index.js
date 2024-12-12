const express = require('express');
const fs = require('fs');
const TASKS = require('./tasks.json');

const PORT = 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const updateTasks = () => {
    fs.writeFile('./tasks.json', JSON.stringify(TASKS), (err) => {
        if(err) console.log(err);
    });
}

app.get('/', (req, res) => {
    res.send(TASKS);
});

app.post('/add', (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.desc;
    const assignee = req.body.assigned;
    const dateCreated = req.body.date;

    const task = {
        "id": id,
        "title": title,
        "desc": description,
        "assigned": assignee,
        "dateCreated": dateCreated,
        "status": 0
    };

    TASKS.push(task);
    updateTasks();
    res.send('Success');
});

app.put('/edit/:id', (req, res) => {
    const id = req.params.id;
    TASKS.forEach((task, index) => {
        if(task.id === id) {
            TASKS[index] = req.body;
        }
    });
    updateTasks();
    res.send('Success');
});

app.put('/status/:id', (req, res) => {
    const id = req.params.id;
    TASKS.forEach((task, index) => {
        if(task.id === id) {
            TASKS[index] = req.body;
        }
    });
    updateTasks();
    res.send('Success');
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    TASKS.forEach((task, index) => {
        if(task.id === id) {
            TASKS.splice(index, 1);
        }
    });
    updateTasks();
    res.send(id);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
// Create a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    const newTask = {
        id: nextTaskId++,
        title,
        description,
        status: 'pending'
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Get a specific task by ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Update a task's status
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.status = req.body.status;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        const deletedTask = tasks.splice(taskIndex, 1);
        res.json(deletedTask[0]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

import Task from "../models/Task.js";

// get all tasks from the database - READ
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create a new task - CREATE
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({
      title,
      description,
      isDone: false,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a task (title and description) - UPDATE
export const updateTaskDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const existingTask = await Task.findById(id);
    if (!existingTask) {
      return res.status(404).json({ message: "Task Not Found!" });
    }

    const { title, description } = req.body;
    await Task.findByIdAndUpdate(id, {
      title: title,
      description: description,
    });

    const updatedTask = await Task.findById(id);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a task (completed or not) - UPDATE
export const updateTaskCompletion = async (req, res) => {
  try {
    const { id } = req.params;
    const existingTask = await Task.findById(id);
    if (!existingTask) {
      return res.status(404).json({ message: "Task Not Found!" });
    }
    await Task.findByIdAndUpdate(id, {
      isDone: !existingTask.isDone,
    });

    const updatedTask = await Task.findById(id);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a task - DELETE
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const existingTask = await Task.findById(id);
    if (!existingTask) {
      return res.status(404).json({ message: "Task Not Found!" });
    }
    await Task.findByIdAndDelete(id);
    return res.status(200).json({ message: "Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

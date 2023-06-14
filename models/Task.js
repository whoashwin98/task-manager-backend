import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  isDone: Boolean,
});

const Task = mongoose.model("task", taskSchema);
export default Task;

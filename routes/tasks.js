import express from "express";
import {
  getAllTasks,
  createTask,
  updateTaskDetails,
  updateTaskCompletion,
  deleteTask,
} from "../controllers/tasks.js";
// controller import here

const router = express.Router();

router.get("/", getAllTasks);
router.post("/", createTask);
router.patch("/:id", updateTaskDetails);
router.patch("/done/:id", updateTaskCompletion);
router.delete("/:id", deleteTask);

export default router;

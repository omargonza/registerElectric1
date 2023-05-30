import { Router } from "express";
import {
  renderTaskForm,
  createNewTasks,
  renderTasks,
  renderEditForm,
  updateTask,
  deleteTask,
} from "../controllers/notes.controller.js";
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

// New Note
router.get("/tasks/add", isAuthenticated, renderTaskForm);

router.post("/tasks/new-note", isAuthenticated, createNewTasks);

// Get All Notes
router.get("/tasks", isAuthenticated, renderTasks);

// Edit Notes
router.get("/tasks/edit/:id", isAuthenticated, renderEditForm);

router.put("/tasks/edit-note/:id", isAuthenticated, updateTask);

// Delete Notes
router.delete("/tasks/delete/:id", isAuthenticated, deleteTask);

export default router;

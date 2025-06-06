import { Router } from "express";

const router = Router();

import { checkAuth } from "../middleware/auth.middleware.js";

import {
  createProject,
  updateProject,
  getAllProjects,
  getProjectInfo,
  deleteProject,
} from "../controllers/project.controller.js";

router.post("/", checkAuth, createProject);

router.put("/", checkAuth, updateProject);

router.get("/", checkAuth, getAllProjects);

router.get("/:projectID", checkAuth, getProjectInfo);

router.delete("/", checkAuth, deleteProject);

export default router;

import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";

const createProject = async (req, res) => {
  try {
    const { ID } = req.user;
    const { name, lang, code } = req.body;

    if (!name || !lang) {
      return res
        .status(409)
        .json({ message: "Empty fields are not allowed", success: false });
    }

    const project = await Project.create({ name, lang, code, createdBy: ID });

    if (!project) {
      throw Error("failed to create project");
    }

    return res
      .status(200)
      .json({ message: "Project created successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to complete your request", success: false });
    console.log(`Error in create Project controller ${error.message || error}`);
  }
};

const getAllProjects = async (req, res) => {
  try {
    const { ID } = req.user;

    const projects = await Project.find({ createdBy: ID });

    return res.status(200).json({
      message: "Projects found successfully",
      success: true,
      projects,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to complete your request", success: false });
    console.log(
      `Error in get all Project controller ${error.message || error}`
    );
  }
};

const getProjectInfo = async (req, res) => {
  try {
    const { projectID } = req.params;
    const project = await Project.findById(projectID).populate({
      path: "createdBy",
      select: "-password -email",
    });

    if (!project) {
      res
        .status(404)
        .json({ message: "Failed to find your project", success: false });
    }

    return res.status(200).json({
      message: "Projects found successfully",
      success: true,
      project,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to complete your request", success: false });
    console.log(
      `Error in get  Project Info controller ${error.message || error}`
    );
  }
};

const updateProject = async (req, res) => {
  try {
    const { ID } = req.user;

    const { projectID, code } = req.body;

    const project = await Project.findById(projectID);

    if (!project) {
      return res
        .status(404)
        .json({ message: "Project does not exist", success: true });
    }

    if (project.createdBy.toString() !== ID) {
      return res.status(401).json({
        message: "Unauthorised to perform this action",
        success: false,
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectID,
      { code },
      { new: true }
    );

    return res.status(200).json({
      message: "Projects updated successfully",
      success: true,
      project: updatedProject,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to complete your request", success: false });
    console.log(`Error in update Project controller ${error.message || error}`);
  }
};

const deleteProject = async (req, res) => {
  try {
    const { ID } = req.user;

    const { projectID } = req.body;

    const project = await Project.findById(projectID);

    if (!project) {
      return res
        .status(404)
        .json({ message: "Project does not exist", success: true });
    }

    if (project.createdBy.toString() !== ID) {
      return res.status(401).json({
        message: "Unauthorised to perform this action",
        success: false,
      });
    }

    const deleteProject = await Project.findByIdAndDelete(projectID);

    return res.status(200).json({
      message: "Projects deleted successfully",
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to complete your request", success: false });
    console.log(`Error in delete Project controller ${error.message || error}`);
  }
};

export {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
  getProjectInfo,
};

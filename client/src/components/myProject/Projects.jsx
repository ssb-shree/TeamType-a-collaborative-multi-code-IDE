import React, { useState, useEffect } from "react";

import { Spinner } from "../ui/Spinner";
import { SearchCodeIcon } from "lucide-react";
import ProjectCards from "./ProjectCards";
import AddProjectCard from "./AddProjectCard";

import toast from "react-hot-toast";
import { toastMessage } from "@/services/toastMessage";
import axiosInstance from "@/services/axios";

import Cookies from "js-cookie";

const Project = ({ name }) => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const getAllProjects = async () => {
      try {
        const token = Cookies.get("token");
        const res = await axiosInstance.get("/api/v1/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(res.data.projects);
      } catch (error) {
        toast.custom(toastMessage(false, "Failed to Fetch Projects"));
      } finally {
        setLoading(false);
      }
    };
    getAllProjects();
  }, []);
  return (
    <div className="bg-[#1e293b] w-full h-auto px-5 text-slate-300">
      <Spinner size="large" show={loading} />
      <div className=" border-b flex flex-row gap-x-10 justify-center items-center py-1 text-lg pt-5">
        <span>
          <SearchCodeIcon />
        </span>
        <input
          className="placeholder-slate-300 border-none outline-none w-full"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search By Project Name"
        />
      </div>
      <div className="grid grid-rows-none md:grid-cols-4 flex-wrap gap-x-5 gap-y-0 mt-5 ">
        <ProjectCards
          className=""
          projectsArray={projects}
          name={name}
          searchInput={searchInput}
        />
        <AddProjectCard />
      </div>
    </div>
  );
};

export default Project;

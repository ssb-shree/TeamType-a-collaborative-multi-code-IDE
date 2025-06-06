import React from "react";

import Image from "next/image";
import Link from "next/link";

import styles from "./Hero.module.css";

import { Space_Grotesk, Poppins } from "next/font/google";
import { Clock, User } from "lucide-react";
import { DropDownOptions } from "./DropDownOptions";

const poppins = Poppins({
  weight: "700",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weigth: "500",
  subsets: ["latin"],
});

const ProjectCards = ({ projectsArray, name, searchInput }) => {
  let array = projectsArray;
  if (searchInput !== "") {
    array = array.filter((item) =>
      item.name.includes(searchInput?.toLowerCase())
    );
  }
  return array
    ? array.map((project) => (
        <div
          key={project._id}
          className={`rounded-2xl  text-white p-6 shadow-lg h-40 m-3  bg-slate-900`}
        >
          <Link href={`editor/${project._id}`}>
            <div
              className={`w-full  flex flex-row ${styles.title} `}
              id={project._id}
            >
              <div>
                <Image
                  className="bg-[#1A3268] rounded-2xl p-2"
                  width={60}
                  height={50}
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${
                    project.lang === "cpp" ? "cplusplus" : project.lang
                  }/${
                    project.lang === "cpp" ? "cplusplus" : project.lang
                  }-original.svg`}
                  alt="logo"
                />
              </div>
              <div
                className={` ${spaceGrotesk.className} ml-3 flex flex-col justify-center items-center`}
              >
                <h1 className={`${styles.title} text-center `}>
                  {project.lang.charAt(0).toUpperCase() + project.lang.slice(1)}
                </h1>
                <h2 className="text-slate-400 flex px-2 py-1 justify-center items-center">
                  <Clock className="mr-2" size={18} />
                  {new Date(project.createdAt).toLocaleDateString()}
                </h2>
              </div>
            </div>
          </Link>
          <div>
            <h1
              className={` ${spaceGrotesk.className} text-slate-300 text-md mt-3 text-xl`}
            >
              {project.name}
            </h1>
            {/* User details  */}
            <div className="flex justify-between items-center">
              <h2
                className={`flex flex-row items-center gap-x-2 text-slate-400`}
              >
                <User size={18} />
                {name}
              </h2>
              <DropDownOptions projectID={project._id} />
            </div>
          </div>
        </div>
      ))
    : null;
};

export default ProjectCards;

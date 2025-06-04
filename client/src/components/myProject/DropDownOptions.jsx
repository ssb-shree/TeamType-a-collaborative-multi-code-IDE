"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import axiosInstance from "@/services/axios";

import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { toastMessage } from "@/services/toastMessage";

const spaceGrotesk = Space_Grotesk({
  weight: "500",
  subsets: ["latin"],
});

export function DropDownOptions({ projectID }) {
  const deleteProject = async () => {
    try {
      const token = Cookies.get("token");
      console.log("token from drop down options => ", token);
      await axiosInstance.delete("/api/v1/projects", {
        data: { projectID },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.custom(toastMessage(true, "Project Deleted"));
      window.location.reload();
    } catch (error) {
      toast.custom(toastMessage(false, "Failed to Delete Projects"));
    }
  };
  return (
    <DropdownMenu className="outline-none hover:outline-none hover:bg-transparent">
      <DropdownMenuTrigger asChild>
        <button
          className={`text-slate-300 hover:text-white text-md hover:cursor-pointer bg-transparent focus:outline-none`}
        >
          <MoreVertical />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={` ${spaceGrotesk.className} bg-slate-900 text-slate-300 text-md mt-3 text-xl border-slate-500`}
      >
        <DropdownMenuSeparator className={`border-slate-500`} />
        <DropdownMenuItem className="focus:bg-transparent focus:text-cyan-300">
          <Link href={`editor/${projectID}`}>Open in Editor</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault(); // prevents auto-close if needed
            deleteProject();
          }}
          className="focus:bg-transparent focus:text-cyan-300"
        >
          Delete Project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

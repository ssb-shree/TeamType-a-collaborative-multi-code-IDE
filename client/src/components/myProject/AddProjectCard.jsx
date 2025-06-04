import React, { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { toastMessage } from "@/services/toastMessage";
import axiosInstance from "@/services/axios";
import Cookies from "js-cookie";

const Languages = ["python", "javascript", "java", "go", "bash", "cpp", "c"];

const AddProjectCard = () => {
  const [data, setData] = useState({ name: "", lang: "", code: "" });
  const addProject = async () => {
    try {
      const token = Cookies.get("token");
      await axiosInstance.post(
        "/api/v1/projects",
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.custom(toastMessage(true, "Project Created"));
      window.location.reload();
    } catch (error) {
      toast.custom(toastMessage(false, "Failed to Create Projects"));
    }
  };
  console.log(data);
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button
            className={`rounded-2xl hover:cursor-pointer bg-slate-900 shadow-lg h-40 w-full  m-3 flex justify-center items-center text-slate-400`}
            type="button"
          >
            <Plus />
          </button>
        </DialogTrigger>
        <DialogContent className="w-screen bg-opacity-5 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-md shadow-cyan-300 text-white border-slate-400">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription className={`text-slate-300`}>
              It’s only after we’ve lost everything that we’re free to do
              anything
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Project Mayhem"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="language">Language</Label>
              <Select
                id="language"
                value={data.lang}
                onValueChange={(value) => setData({ ...data, lang: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    className="placeholder:text-white"
                    placeholder="Select The Language"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Languages.map((lang) => (
                      <SelectItem className="bg-transparent" value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className={`bg-slate-800`}>Cancel</Button>
            </DialogClose>
            <Button onClick={addProject} type="button">
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddProjectCard;

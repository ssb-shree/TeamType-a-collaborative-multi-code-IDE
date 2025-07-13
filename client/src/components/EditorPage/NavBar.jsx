import { toastMessage } from "@/services/toastMessage";
import { Clipboard, ClipboardCopy, User, Users } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { useRouter } from "next/navigation";

import axiosInstance from "@/services/axios";

import { useCodeStore } from "@/store/code";
import { useAuthStore } from "@/store/user";
import { useProjectStore } from "@/store/user";

import Cookies from "js-cookie";
import { ImExit } from "react-icons/im";

const token = Cookies.get("token");

import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  weigth: "500",
  subsets: ["latin"],
});

const NavBar = ({ projectID, projectData, authData }) => {
  const { codeData } = useCodeStore();
  const { clientListDisplay } = useAuthStore();
  const router = useRouter();

  console.log({ projectData, authData });

  const role = authData.userID === projectData?.createdBy._id ? "owner" : "guest";

  const endSession = async () => {
    if (role == "owner") {
      try {
        const res = await axiosInstance.put(
          "/api/v1/projects",
          { code: codeData.code, projectID },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          router.push("/my-projects");
        }
        console.log(res);
      } catch (error) {
        toast.custom(toastMessage(false, "Failed to Save Code State"));
        console.log(error);
      }
    } else {
      router.push("/my-projects");
    }
  };
  return (
    <div className="bg-slate-800/60 border text-wrap border-slate-700 rounded-xl px-4 py-2 my-2 shadow-md text-white backdrop-blur-sm mx-2">
      <div className="w-full flex justify-between items-center">
        <div>
          <h1
            className={`${spaceGrotesk.className} text-sm  md:text-xl md:text-nowrap text-blue-200`}
          >{`${projectData.createdBy.name}'s ${projectData.name} Session`}</h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="hover:cursor-pointer font-semibold text-sm  p-2 rounded" onClick={endSession}>
            <ImExit size={22} />
          </div>
          <div
            className=" hover:cursor-pointer flex justify-center gap-x-1 items-center font-semibold text-sm  p-2 rounded"
            onClick={() => {
              navigator.clipboard.writeText(
                `https://team-type-a-collaborative-multi-cod.vercel.app/login?redirect_url=/editor/${projectID}`
              );

              toast.custom(toastMessage(true, "Copied Invite"));
            }}
          >
            <ClipboardCopy size={22} />
          </div>
          <Popover>
            <PopoverTrigger className="bg-slate-950 flex justify-center gap-x-1 items-center font-semibold text-sm  p-2 rounded text-cyan-400">
              <Users size={18} /> Users
            </PopoverTrigger>
            <PopoverContent className="bg-slate-950 text-cyan-300">
              {clientListDisplay.map((item) => (
                <li className="border-0 border-b-2 rounded-sm border-slate-400" key={item.socketID}>
                  {item.userDetails.name}
                </li>
              ))}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

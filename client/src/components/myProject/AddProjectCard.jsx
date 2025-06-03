import { Plus } from "lucide-react";
import React from "react";

const AddProjectCard = () => {
  return (
    <button
      className={`rounded-2xl hover:cursor-pointer bg-slate-900 p-6 shadow-lg h-40 m-3 flex justify-center items-center text-slate-400`}
    >
      <Plus size={40} />
    </button>
  );
};

export default AddProjectCard;

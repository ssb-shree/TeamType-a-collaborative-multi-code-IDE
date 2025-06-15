import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useRef, useState } from "react";
import { Play, Terminal } from "lucide-react";
import { Textarea } from "../ui/textarea";

import { useCodeStore } from "@/store/code";

const InputOutputBox = ({ socket, projectData }) => {
  const [inpuState, setInputState] = useState("");
  const [outputState, setOutputState] = useState(
    "// OutPut will be shown here "
  );

  const { codeData, setCodeData } = useCodeStore();

  useEffect(() => {
    socket;
  }, [socket]);

  const runCode = async () => {
    console.log(codeData);
  };

  return (
    <div className="bg-slate-900 p-2 rounded-xl w-full h-full shadow-lg flex">
      <Tabs
        defaultValue="input"
        className={`h-full w-full flex justify-between`}
      >
        <div className="w-full flex justify-between">
          <TabsList className="bg-slate-800 border border-slate-700 rounded-t-md">
            <TabsTrigger
              value="input"
              className="data-[state=active]:bg-slate-950 data-[state=active]:text-cyan-400 text-white px-4 py-1 flex items-center gap-2 font-mono text-lg"
            >
              <Terminal size={16} />
              Input
            </TabsTrigger>
            <TabsTrigger
              value="output"
              className="data-[state=active]:bg-slate-950 data-[state=active]:text-cyan-400 text-white px-4 py-1 font-mono text-lg"
            >
              Output
            </TabsTrigger>
          </TabsList>
          <button
            onClick={runCode}
            type="button"
            className="bg-slate-800 border px-1 border-slate-700 rounded-t-md hover:bg-slate-950 hover:text-cyan-300"
          >
            <Play className="fill-cyan-400" />
          </button>
        </div>

        <TabsContent
          value="input"
          className="bg-black text-green-400 p-4 font-mono rounded-b-md border border-t-0 border-slate-700 overflow-auto"
        >
          <div className="h-full w-full">
            <Textarea
              className={
                "h-full resize-none min-h-full placeholder:text-green-400"
              }
              placeholder={`One input per line`}
              onChange={(e) => {
                setInputState(e.target.value);
                setCodeData({ ...codeData, inputs: e.target.value });
              }}
              value={inpuState}
            />
          </div>
        </TabsContent>

        <TabsContent
          value="output"
          className="bg-black text-green-400 p-4 font-mono rounded-b-md border border-t-0 border-slate-700 overflow-auto"
        >
          <div>
            <p>{outputState}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InputOutputBox;

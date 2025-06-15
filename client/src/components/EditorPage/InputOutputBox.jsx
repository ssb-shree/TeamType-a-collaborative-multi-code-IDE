import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useRef, useState } from "react";
import { Flag, Play, Terminal } from "lucide-react";
import { Textarea } from "../ui/textarea";

import { useCodeStore } from "@/store/code";
import { event } from "@/services/socketEvents";

const InputOutputBox = ({ socket, projectData, authData, projectID }) => {
  const role =
    authData.userID === projectData?.createdBy._id ? "owner" : "guest";
  const { codeData, setCodeData } = useCodeStore();

  const [inputState, setInputState] = useState(() => {
    if (role == "owner") {
      return codeData.inputs.trim() == ""
        ? "//One Line Per Input"
        : codeData.inputs;
    } else {
      return "//Waiting For Input to be Synced";
    }
  });

  const [outputState, setOutputState] = useState(() => {
    if (role == "owner") {
      return "//Output will be shown here";
    } else {
      return "//Waiting For Output to be Synced";
    }
  });

  const hasSynced = useRef(role === "owner" ? true : false);
  const syncFlag = useRef(role === "owner" ? true : false);

  useEffect(() => {
    if (!socket) return;
    if (role == "owner") {
      socket.emit(event.setInputOutputstate, {
        inputs: inputState,
        outputs: outputState,
        projectID,
      });
    }

    socket.on(event.initGuestInputOutput, (data) => {
      const { inputs, outputs } = data.syncGuestCode;
      setInputState(inputs);
      setOutputState(outputs);
      syncFlag.current = true;
    });

    syncFlag ? (hasSynced.current = true) : (hasSynced.current = fale);

    socket.on(event.inputUpdate, ({ updateInput }) => {
      if (!hasSynced || !syncFlag) return;
      setInputState(updateInput);
    });

    return () => {
      socket.off(event.initGuestInputOutput);
      socket.off(event.inputUpdate);
    };
  }, [socket]);

  const handleInputChange = (e) => {
    if (!hasSynced.current || !syncFlag) return;
    setInputState(e.target.value);
    socket.emit(event.inputUpdate, { updateInput: e.target.value, projectID });
  };

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
              onChange={handleInputChange}
              value={inputState}
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

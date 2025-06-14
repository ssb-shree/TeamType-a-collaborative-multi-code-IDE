import React, { useEffect } from "react";
import CodeEditor from "./CodeEditor";
import ChatBlock from "./chatBlock";

import { event } from "@/services/socketEvents";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import InputOutputBox from "./InputOutputBox";
import toast from "react-hot-toast";
import { toastMessage } from "@/services/toastMessage";

const Editor = ({ socket, authData, projectData, projectID }) => {
  const { code, lang } = projectData;

  useEffect(() => {
    if (!socket) return;

    console.log(socket);
    socket.on(event.leftRoom, (data) => console.log(data));

    socket.on(event.endRoom, ({ message }) =>
      toast.custom(toastMessage(false, message))
    );
  }, [socket]);

  return (
    <section className="bg-slate-900 text-cyan-300 w-screen h-screen">
      <ResizablePanelGroup direction="horizontal" className={`w-full h-full`}>
        <ResizablePanel defaultSize={100} className="h-[100%] w-[60%]">
          <div className="bg-slate-800/60 border text-wrap border-slate-700 rounded-xl px-4 py-2 my-2 shadow-md text-white backdrop-blur-sm mx-2">
            navbar and project details will go here maybe joined users too
          </div>
          <CodeEditor
            authData={authData}
            socket={socket}
            code={code}
            lang={lang}
            projectID={projectID}
            projectData={projectData}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={100} className="h-[100%] w-[40%]">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel className="h-[60%]">
              <InputOutputBox />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel className="h-[40%] w-full">
              <ChatBlock
                socket={socket}
                authData={authData}
                projectData={projectData}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
};

export default Editor;

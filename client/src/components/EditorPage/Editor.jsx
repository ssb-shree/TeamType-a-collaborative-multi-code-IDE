import React from "react";
import CodeEditor from "./CodeEditor";
import ChatBlock from "./chatBlock";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import InputOutputBox from "./InputOutputBox";

const Editor = ({ socket, authData, projectData }) => {
  return (
    <section className="bg-slate-900 text-cyan-300 w-screen h-screen">
      <ResizablePanelGroup direction="horizontal" className={`w-full h-full`}>
        <ResizablePanel defaultSize={100} className="h-[100%] w-[60%]">
          <CodeEditor />
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

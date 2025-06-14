import CodeMirror from "@uiw/react-codemirror";

import { event } from "@/services/socketEvents";

import { abyss } from "@uiw/codemirror-theme-abyss";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { toastMessage } from "@/services/toastMessage";

import { StreamLanguage } from "@codemirror/language";
import { go } from "@codemirror/legacy-modes/mode/go";

import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";

function getLanguageExtension(lang) {
  switch (lang.toLowerCase()) {
    case "js":
    case "javascript":
      return javascript();
    case "py":
    case "python":
      return python();
    case "java":
      return java();
    case "go":
      return StreamLanguage.define(go);
    case "cpp":
      return StreamLanguage.define(cpp);
    case "c":
      return StreamLanguage.define(c);
    default:
      return [];
  }
}

const CodeEditor = ({
  socket,
  code,
  lang,
  projectID,
  projectData,
  authData,
}) => {
  const role =
    authData.userID === projectData?.createdBy._id ? "owner" : "guest";

  console.log(role);
  const hasSyncedRef = useRef(role === "owner");

  console.log(hasSyncedRef.current);

  const [newCode, setNewCode] = useState(() => {
    if (role === "owner") {
      return code?.trim() === "" ? "Welcome to TeamType!" : code;
    } else {
      return ""; // guest will wait for sync
    }
  });

  const handleCodeUpdate = (value) => {
    if (!hasSyncedRef.current) return;
    socket.emit(event.codeUpdate, { code: value, projectID });
  };

  const codeSyncUpdate = (value, socketID) => {
    socket.emit(event.codeSync, { code: value, projectID, socketID });
  };
  useEffect(() => {
    if (!socket) return;

    socket.on(event.joinedRoom, ({ socketID, name }) => {
      toast.custom(toastMessage(true, `${name} joined`));
      codeSyncUpdate(newCode, socketID);
    });
    socket.on(event.leftRoom, ({ socketID, name }) => {
      toast.custom(toastMessage(false, `${name} joined`));
      codeSyncUpdate(newCode, socketID);
    });

    socket.on(event.codeUpdate, (data) => {
      hasSyncedRef.current = true;
      setNewCode(data.code);
    });

    return () => {
      socket.off(event.joinedRoom);
      socket.off(event.codeUpdate);
      socket.off(event.codeSync);
    };
  }, [socket]);
  return (
    <CodeMirror
      className={`h-screen rounded-2xl text-lg`}
      value={newCode}
      extensions={[getLanguageExtension(lang)]}
      height="100%"
      theme={abyss}
      onChange={(value) => {
        setNewCode(value);
        handleCodeUpdate(value);
      }}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLine: true,
        highlightSelectionMatches: true,
        foldGutter: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        indentOnInput: true,
        syntaxHighlighting: true,
        defaultKeymap: true,
        history: true,
        drawSelection: true,
        dropCursor: true,
        rectangularSelection: true,
        allowMultipleSelections: true,
        searchKeymap: true,
        lintKeymap: true,
        foldKeymap: true,
        completionKeymap: true,
      }}
    />
  );
};

export default CodeEditor;

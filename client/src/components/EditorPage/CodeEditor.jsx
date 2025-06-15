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

import { useCodeStore } from "@/store/code";

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

  const [newCode, setNewCode] = useState(() => {
    if (role == "owner") {
      return code;
    } else {
      return "// Waiting for the code to be synced";
    }
  });

  const clientListRef = useRef([]);
  const hasCodeSynced = useRef(role === "owner" ? true : false);
  const syncFlag = useRef(role === "owner" ? true : false);

  const { setCodeData, codeData } = useCodeStore();

  useEffect(() => {
    if (!socket) return;

    socket.on(event.joinedRoom, ({ newUser, newJoinersRole, clientList }) => {
      clientListRef.current = clientList;
      toast.custom(toastMessage(true, `${newUser} has joined`));
    });

    socket.on(event.initGuestEditor, ({ syncGuestCode }) => {
      setNewCode(syncGuestCode.code);
      syncFlag.current = true;
    });

    syncFlag ? (hasCodeSynced.current = true) : (hasCodeSynced.current = false);

    socket.on(event.codeUpdate, ({ updatedCode }) => {
      if (!hasCodeSynced || !syncFlag) return;
      setNewCode(updatedCode);
    });

    return () => {
      socket.off(event.joinedRoom);
      socket.off(event.leftRoom);
      socket.off(event.codeUpdate);
    };
  }, [socket]);

  const handleCodeChange = (value) => {
    if (!hasCodeSynced || !syncFlag) return;
    setNewCode(value);
    setCodeData({ ...codeData, code: value });
    socket.emit(event.codeUpdate, { updatedCode: value, projectID });
  };

  return (
    <CodeMirror
      className={`h-screen rounded-2xl text-lg`}
      value={newCode}
      extensions={[getLanguageExtension(lang)]}
      height="100%"
      theme={abyss}
      onChange={handleCodeChange}
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

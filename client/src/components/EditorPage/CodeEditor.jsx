import CodeMirror from "@uiw/react-codemirror";

import { abyss, abyssInit } from "@uiw/codemirror-theme-abyss";
import { useState } from "react";

const CodeEditor = () => {
  const [code, setCode] = useState(" hello ");
  return (
    <CodeMirror
      className="h-screen rounded-2xl text-lg"
      value={code} // your code state here
      height="100%" // better vertical space
      theme={abyss}
      onChange={(value) => setCode(value)} // handle updates
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

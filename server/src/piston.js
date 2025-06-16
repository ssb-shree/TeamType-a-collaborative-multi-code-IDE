import piston from "piston-client";

const pistonClient = piston();

export const runCode = async (source, language, stdin) => {
  const result = await pistonClient.execute({
    language,
    version: "*",
    files: [
      {
        name: `Main.${language === "java" ? "java" : "txt"}`,
        content: source,
      },
    ],
    stdin: stdin || "",
  });

  return result;
};

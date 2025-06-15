"use client";
import React, { useEffect, useState, useRef } from "react";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import { useAuthStore } from "@/store/user";
import { useProjectStore } from "@/store/project";

import LoadingPage from "@/app/loading";
import Editor from "@/components/EditorPage/Editor";

import { initSocket } from "@/services/socket";
import { event } from "@/services/socketEvents";

import toast from "react-hot-toast";
import { toastMessage } from "@/services/toastMessage";

const Editorpage = () => {
  const [loading, setLoading] = useState(true);
  const [projectError, setProjectEror] = useState(false);

  const { authData, setAuthData, clearAuthData } = useAuthStore();
  const { projectData } = useProjectStore();

  const socketRef = useRef(null);

  const router = useRouter();
  const params = useParams();

  const { projectID } = params;

  useEffect(() => {
    if (!authData.auth) {
      router.push(`/login?redirect_url=/editor/${projectID}`);
    }
  }, [authData.auth, projectID, router]);

  useEffect(() => {
    if (!authData.auth || !projectID) return;

    const handleSocketError = (err) => {
      console.error("Socket error:", err.message || err);
      toast.custom(
        toastMessage(false, "Connection failed - trying to reconnect...")
      );
    };

    let socket;

    (async () => {
      if (!socketRef.current) {
        socketRef.current = await initSocket();
      }

      socket = socketRef.current;

      const emitData = {
        projectID,
        userID: authData.userID,
        name: authData.name,
        projectData,
        role:
          authData.userID === projectData?.createdBy._id ? "owner" : "guest",
      };

      socket.emit(event.enterRoom, emitData);

      socket.on("connect-failed", handleSocketError);
      socket.on("connect-error", handleSocketError);

      socket.on(event.roomNotFound, () => {
        console.log("read the not found event");
        setProjectEror(true);
        toast.custom(toastMessage(false, "404 Room Not Found"));
        router.push("/my-projects");
      });

      socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
        if (reason === "io server disconnect") {
          socket.connect(); // Auto-reconnect
        }
      });
    })();

    setLoading(false);

    // cleanup
    return () => {
      if (socketRef.current) {
        socketRef.current.off("connect-failed", handleSocketError);
        socketRef.current.off("connect-error", handleSocketError);
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [authData.auth, projectID]);

  return loading || projectError ? (
    <LoadingPage />
  ) : (
    <Editor
      socket={socketRef.current}
      authData={authData}
      projectData={projectData}
      projectID={projectID}
      classname="bg-slate-900"
    />
  );
};

export default Editorpage;

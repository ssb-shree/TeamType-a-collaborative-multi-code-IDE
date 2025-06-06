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

const Editorpage = () => {
  const [loading, setLoading] = useState(true);

  const { authData, setAuthData, clearAuthData } = useAuthStore();
  const { projectData } = useProjectStore();

  const socketRef = useRef(null);
  const socketInitializedRef = useRef(false);

  const router = useRouter();
  const params = useParams();

  const { projectID } = params;

  useEffect(() => {
    if (!authData.auth) {
      router.push(`/login?redirect_url=/editor/${projectID}`);
    }
  }, []);

  useEffect(() => {
    const initSocketConnection = async () => {
      if (socketInitializedRef.current) return;
      // below we will establish our socket connection
      socketRef.current = await initSocket();

      socketInitializedRef.current = true;

      // handling basic connection errors which might occur
      socketRef.current.on("connect-failed", (err) => handleSocketError(err));
      socketRef.current.on("connect-error", (err) => handleSocketError(err));

      const handleSocketError = (err) => {
        console.log("socket error -> ", err.message || err);
        toast.error("failed to connect");
        navigate("/");
      };

      console.log(projectData);
      // emit create room only for owners
      if (authData.userID === projectData?.createdBy._id) {
        console.log("owner");
        socketRef.current.emit(event.startRoom, {
          ownerId: authData.userID,
          projectID,
          userID: authData.userID,
          name: authData.name,
        });
      } else {
        console.log("guest");
        socketRef.current.emit(event.enterRoom, {
          userID: authData.userID,
          projectID,
          name: authData.name,
        });
      }
    };

    if (authData.auth) {
      initSocketConnection();
    }

    // clean up function below
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        socketInitializedRef.current = false;
      }
      // socketRef?.current.off(events.JOIN);
      // socketRef?.current.off(events.JOINED);
      // socketRef?.current.off(events.DISCONNECTED);
      // socketRef?.current.dissconnect();
    };
  }, [socketRef, socketInitializedRef]);

  return loading ? <LoadingPage /> : <Editor classname="bg-slate-900" />;
};

export default Editorpage;

"use client";

import { useEffect, useState } from "react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono flex items-center justify-center">
      <div className="bg-[#161b22] p-6 rounded-xl shadow-lg border border-[#30363d] w-[90%] max-w-xl">
        <p className="text-green-400">LoadingPage.jsx</p>
        <div className="mt-4">
          <p>
            <span className="text-purple-400">const</span>{" "}
            <span className="text-blue-400">loading</span>{" "}
            <span className="text-pink-400">=</span>{" "}
            <span className="text-yellow-400">async</span>{" "}
            <span className="text-pink-400">()</span> {"=>"} {"{"}
          </p>
          <p className="ml-4">
            <span className="text-purple-400">return</span>{" "}
            <span className="text-yellow-400">"Loading..."</span>
            <span className="blinking-cursor">|</span>
          </p>
          <p>{"}"}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;

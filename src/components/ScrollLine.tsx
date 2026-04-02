"use client";

import { useEffect, useState } from "react";

export default function ScrollLine() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="scroll-line-wrap"
      aria-hidden="true"
      style={{
        position: "fixed",
        right: "28px",
        top: "50%",
        transform: "translateY(-50%)",
        height: "220px",
        width: "2px",
        zIndex: 200,
      }}
    >
      {/* Track */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(184,151,58,0.15)",
          borderRadius: "2px",
        }}
      />

      {/* Fill */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: `${progress}%`,
          background: "linear-gradient(to bottom, #b8973a 0%, #d4b86a 80%, #f0e2b0 100%)",
          boxShadow: "0 0 8px rgba(184,151,58,0.55)",
          transition: "height 0.1s linear",
          borderRadius: "2px",
        }}
      />

      {/* Start dot */}
      <div
        style={{
          position: "absolute",
          top: "-5px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: progress > 1 ? "#b8973a" : "rgba(184,151,58,0.25)",
          border: "1.5px solid rgba(184,151,58,0.5)",
          transition: "background 0.4s ease",
        }}
      />

      {/* Traveling glow dot */}
      <div
        style={{
          position: "absolute",
          top: `calc(${progress}% - 6px)`,
          left: "50%",
          transform: "translateX(-50%)",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "#f0e2b0",
          boxShadow:
            "0 0 0 3px rgba(184,151,58,0.25), 0 0 14px 3px rgba(184,151,58,0.7)",
          transition: "top 0.1s linear",
          zIndex: 1,
        }}
      />

      {/* End dot */}
      <div
        style={{
          position: "absolute",
          bottom: "-5px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: progress > 97 ? "#b8973a" : "rgba(184,151,58,0.25)",
          border: "1.5px solid rgba(184,151,58,0.5)",
          transition: "background 0.4s ease",
        }}
      />
    </div>
  );
}

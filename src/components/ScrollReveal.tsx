"use client";

import React, { useEffect, useRef, useState, type ElementType, type HTMLAttributes, type ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
}

export default function ScrollReveal({
  children,
  delay = 0,
  style,
  className = "",
  as: Tag = "div",
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "hidden" | "visible">(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return "visible";
    }
    return "idle";
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || status === "visible") return;

    const frameIds: number[] = [];
    const timeoutIds: number[] = [];

    const scheduleStatus = (nextStatus: "hidden" | "visible", wait = 0) => {
      if (wait > 0) {
        const timeoutId = window.setTimeout(() => {
          setStatus(nextStatus);
        }, wait);
        timeoutIds.push(timeoutId);
        return;
      }

      const frameId = window.requestAnimationFrame(() => {
        setStatus(nextStatus);
      });
      frameIds.push(frameId);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scheduleStatus("visible");
      return () => {
        frameIds.forEach(window.cancelAnimationFrame);
        timeoutIds.forEach(window.clearTimeout);
      };
    }

    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const isAlreadyNearViewport = rect.top <= viewportHeight * 0.92 && rect.bottom >= -32;

    if (isAlreadyNearViewport || !("IntersectionObserver" in window)) {
      scheduleStatus("visible", delay);
      return () => {
        frameIds.forEach(window.cancelAnimationFrame);
        timeoutIds.forEach(window.clearTimeout);
      };
    }

    scheduleStatus("hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scheduleStatus("visible", delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);

    return () => {
      frameIds.forEach(window.cancelAnimationFrame);
      timeoutIds.forEach(window.clearTimeout);
      observer.disconnect();
    };
  }, [delay, status]);

  return (
    <Tag
      ref={ref}
      className={`${status === "hidden" ? "sr-hidden" : ""} ${status === "visible" ? "sr-visible" : ""} ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}

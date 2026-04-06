"use client";

import React, { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
  className?: string;
  as?: ElementType;
}

export default function ScrollReveal({
  children,
  delay = 0,
  style,
  className = "",
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const frameId = window.requestAnimationFrame(() => {
      setIsReady(true);
    });
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = window.setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      observer.disconnect();
    };
  }, [delay]);

  return (
    <Tag
      ref={ref}
      className={`${isReady ? "sr-ready" : ""} ${isVisible ? "sr-visible" : "sr-hidden"} ${className}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  );
}

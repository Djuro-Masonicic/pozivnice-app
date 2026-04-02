"use client";

import React, { useEffect, useRef, type ReactNode, type CSSProperties, type ElementType } from "react";

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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already in view (e.g. first paint above fold) → show immediately
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = delay ? `${delay}ms` : "";
          el.classList.remove("sr-hidden");
          el.classList.add("sr-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={`sr-hidden ${className}`} style={style}>
      {children}
    </Tag>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface HoverVideoProps {
  imageSrc: string;
  videoSrc: string;
  alt: string;
  sizes?: string;
  className?: string;
}

export function HoverVideo({ imageSrc, videoSrc, alt, sizes = "300px", className = "" }: HoverVideoProps) {
  const [showPhoto, setShowPhoto] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setShowPhoto(true)}
      onMouseLeave={() => setShowPhoto(false)}
    >
      {/* Video — only loads once scrolled into view */}
      {inView && (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${showPhoto ? "opacity-0" : "opacity-100"}`}
        />
      )}
      {/* Photo — shown on hover (or before video loads) */}
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${inView && !showPhoto ? "opacity-0" : "opacity-100"}`}
        sizes={sizes}
      />
    </div>
  );
}

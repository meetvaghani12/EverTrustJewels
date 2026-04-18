"use client";

import { useRef, useState } from "react";
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

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setShowPhoto(true)}
      onMouseLeave={() => setShowPhoto(false)}
    >
      {/* Video — plays by default */}
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${showPhoto ? "opacity-0" : "opacity-100"}`}
      />
      {/* Photo — shown on hover */}
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${showPhoto ? "opacity-100" : "opacity-0"}`}
        sizes={sizes}
      />
    </div>
  );
}

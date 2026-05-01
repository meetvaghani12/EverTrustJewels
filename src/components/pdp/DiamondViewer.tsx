"use client";

import { useState } from "react";
import Image from "next/image";
import { DiamondShape } from "@/types/diamond";
import { getShapeImage, getShapeVideo } from "@/lib/diamondAssets";

interface DiamondViewerProps {
  shape: DiamondShape;
  title: string;
}

type ViewTab = "video" | "photo";

export function DiamondViewer({ shape, title }: DiamondViewerProps) {
  const [activeTab, setActiveTab] = useState<ViewTab>("video");

  return (
    <div className="lg:sticky lg:top-24">
      {/* Viewer Area */}
      <div className="aspect-square w-full overflow-hidden border border-border bg-gradient-to-br from-background to-ice-blue/10">
        {activeTab === "video" && (
          <video
            src={getShapeVideo(shape)}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        )}

        {activeTab === "photo" && (
          <div className="relative h-full w-full">
            <Image
              src={getShapeImage(shape)}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        )}
      </div>

      {/* Tab Buttons */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setActiveTab("video")}
          className={`flex-1 border py-3 text-xs uppercase tracking-[0.1em] transition-colors ${
            activeTab === "video"
              ? "border-foreground text-foreground"
              : "border-border text-text-secondary hover:border-foreground"
          }`}
        >
          Video
        </button>
        <button
          onClick={() => setActiveTab("photo")}
          className={`flex-1 border py-3 text-xs uppercase tracking-[0.1em] transition-colors ${
            activeTab === "photo"
              ? "border-foreground text-foreground"
              : "border-border text-text-secondary hover:border-foreground"
          }`}
        >
          Photo
        </button>
      </div>
    </div>
  );
}

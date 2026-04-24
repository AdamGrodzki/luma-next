"use client";

import { useState } from "react";
import CameraCard from "./CameraCard";
import type { CollectionSensorGroup } from "./types";

type Props = {
  group: CollectionSensorGroup;
};

export default function SensorGroup({ group }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-[#2a2118] pb-4 sm:pb-5">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        aria-expanded={!isExpanded}
        aria-controls={`sensor-group-${group.name}`}
      >
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)] flex-shrink-0" />
          <h3 className="text-xl sm:text-2xl md:text-[28px] lg:text-[36px] font-medium tracking-tight text-[var(--text-primary)] truncate">
            {group.name}
          </h3>
          <span className="rounded-md bg-[var(--accent-primary)] text-[var(--special-brand-bg)] px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs flex-shrink-0">
            {group.count}
          </span>
        </div>
        <span
          className="text-[var(--accent-primary)] text-lg sm:text-xl flex-shrink-0 transition-transform duration-200"
          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ⌄
        </span>
      </button>

      {isExpanded && group.cameras.length > 0 && (
        <div
          id={`sensor-group-${group.name}`}
          className="mt-4 sm:mt-5 grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-200"
        >
          {group.cameras.map((camera) => (
            <CameraCard key={camera.slug} camera={camera} />
          ))}
        </div>
      )}
    </div>
  );
}
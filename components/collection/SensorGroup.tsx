import CameraCard from "./CameraCard";
import type { CollectionSensorGroup } from "./types";

type Props = {
  group: CollectionSensorGroup;
};

export default function SensorGroup({ group }: Props) {
  return (
    <div className="border-b border-[#2a2118] pb-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#caa173]" />
          <h3 className="text-[28px] font-medium tracking-tight text-[#f0e7dc] md:text-[36px]">
            {group.name}
          </h3>
          <span className="rounded-md bg-[#121315] px-2.5 py-1 text-xs text-[#8e8a84]">
            {group.count}
          </span>
        </div>
        <span className="text-[#c99f6a]">{group.expanded ? "⌃" : "⌄"}</span>
      </div>

      {group.expanded && group.cameras.length > 0 && (
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {group.cameras.map((camera) => (
            <CameraCard key={camera.slug} camera={camera} />
          ))}
        </div>
      )}
    </div>
  );
}
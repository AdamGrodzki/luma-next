import { CameraDetailData } from "./types";

type Props = {
  camera: CameraDetailData;
};

export function CameraStory({ camera }: Props) {
  if (!camera.story && !camera.description) return null;

  return (
    <section 
        id="story"
        className="space-y-6 rounded-[28px] border border-[#1d1a17] bg-[#070707] px-6 py-12 md:px-10">
      <div className="flex items-center justify-center gap-4">
        <div className="h-px w-16 bg-[#8d6a42]" />
        <h2 className="text-center text-3xl font-bold text-[#f6efe7] md:text-5xl">
          Historia i Inżynieria
        </h2>
        <div className="h-px w-16 bg-[#8d6a42]" />
      </div>

      <div className="mx-auto max-w-4xl space-y-6 text-center text-lg leading-8 text-[#d1c3b5]">
        {camera.story ? <p>{camera.story}</p> : null}
        {camera.description ? <p>{camera.description}</p> : null}
      </div>
    </section>
  );
}
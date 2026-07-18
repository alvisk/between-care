import type { CalculateMetadataFunction } from "remotion";
import { Composition, staticFile } from "remotion";

import { BetweenCarePitch, VOICEOVER_CLIPS } from "./between-care-pitch";

type PitchProps = { voiceover?: boolean };

// Enable the narration track only when every generated clip is present, so
// Studio and renders work before `pnpm voiceover` has been run.
const calculateMetadata: CalculateMetadataFunction<PitchProps> = async ({
  props,
}) => {
  const checks = await Promise.all(
    VOICEOVER_CLIPS.map(async (clip) => {
      try {
        const response = await fetch(staticFile(clip.file), { method: "HEAD" });
        return response.ok;
      } catch {
        return false;
      }
    }),
  );

  return {
    props: { ...props, voiceover: checks.every(Boolean) },
  };
};

export function RemotionRoot() {
  return (
    <Composition
      id="BetweenCarePitch"
      component={BetweenCarePitch}
      durationInFrames={1800}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ voiceover: false }}
      calculateMetadata={calculateMetadata}
    />
  );
}

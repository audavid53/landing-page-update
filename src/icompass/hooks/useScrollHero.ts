import { useEffect, useRef, useState } from "react";
import { ScrollEngine } from "@/icompass/components/ScrollHero/ScrollEngine";
import { VIDEO_SCROLL_FRACTION, scenes } from "@/icompass/config/scene-timeline";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);

function sceneAtTime(time: number) {
  for (let index = scenes.length - 1; index >= 0; index--) {
    const scene = scenes[index]!;
    if (time < scene.enterTime) continue;
    const next = scenes[index + 1];
    const exit = Math.min(scene.holdTime + 0.25, next?.enterTime ?? Infinity);
    return time < exit || index === scenes.length - 1 ? scene.id : null;
  }
  return null;
}

export function useScrollHero(videoSource: string, reducedMotion: boolean) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const activeSceneRef = useRef<number | null>(scenes[0]!.id);
  const hasScrolledRef = useRef(false);
  const revealActiveRef = useRef(false);
  const [activeSceneId, setActiveSceneId] = useState<number | null>(scenes[0]!.id);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [ready, setReady] = useState(false);
  const [revealActive, setRevealActive] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const track = trackRef.current;
    const video = videoRef.current;
    if (!track || !video) return;
    setReady(false);
    const markReady = () => setReady(true);
    video.addEventListener("loadeddata", markReady);
    if (video.readyState >= 2) markReady();
    const engine = new ScrollEngine({
      track,
      video,
      onFrame: (time, progress) => {
        const next = progress > VIDEO_SCROLL_FRACTION + 0.012 ? null : sceneAtTime(time);
        if (activeSceneRef.current !== next) {
          activeSceneRef.current = next;
          setActiveSceneId(next);
        }
      },
      onProgress: progress => {
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
        if (progress > 0.001 && !hasScrolledRef.current) {
          hasScrolledRef.current = true;
          setHasScrolled(true);
        }
      },
      onVisualProgress: progress => {
        const reveal = clamp((progress - VIDEO_SCROLL_FRACTION) / (1 - VIDEO_SCROLL_FRACTION));
        const morph = smoothstep(reveal);
        const copy = smoothstep(clamp((reveal - 0.22) / 0.56));
        stageRef.current?.style.setProperty("--morph", String(morph));
        stageRef.current?.style.setProperty("--copy", String(copy));
        const active = reveal > 0.16;
        if (active !== revealActiveRef.current) {
          revealActiveRef.current = active;
          setRevealActive(active);
        }
      },
    });
    return () => {
      engine.destroy();
      video.removeEventListener("loadeddata", markReady);
    };
  }, [videoSource, reducedMotion]);

  return { trackRef, stageRef, videoRef, progressRef, activeSceneId, revealActive, hasScrolled, ready };
}

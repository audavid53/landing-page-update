import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { Scene } from "@/icompass/config/scene-timeline";

interface Props {
  scene: Scene;
  isMobile: boolean;
  reducedMotion?: boolean;
}

export function SceneText({ scene, isMobile, reducedMotion = false }: Props) {
  const placement = isMobile ? scene.placement.mobile : scene.placement.desktop;
  const style: CSSProperties = {
    left: `${placement.left}%`,
    top: `${placement.top}%`,
    width: `${placement.width}%`,
    textAlign: placement.textAlign,
  };
  const headlineStyle: CSSProperties = {
    fontSize: `clamp(${isMobile ? 24 : 34}px, ${(placement.headlineSize / (isMobile ? 1080 : 1920)) * 100}vw, ${placement.headlineSize}px)`,
  };
  const content = <>
    <p className="scene-kicker">{scene.kicker}</p>
    <h2 className="scene-headline" style={headlineStyle} aria-label={scene.headline}>
      {placement.headlineLines.map((line, index) => <span className="scene-headline__line" aria-hidden="true" key={index}>{line}</span>)}
    </h2>
  </>;
  if (reducedMotion) return <div className="scene-text-block" style={style}>{content}</div>;
  return <motion.div
    className="scene-text-block"
    style={style}
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
  >{content}</motion.div>;
}

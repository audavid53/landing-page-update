import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PIN_SCROLL_MULTIPLIER, scenes } from "@/icompass/config/scene-timeline";
import { useScrollHero } from "@/icompass/hooks/useScrollHero";
import { SceneText } from "./SceneText";
import { ScrollCue } from "./ScrollCue";
import "./ScrollHero.css";

function CareerIntelligenceCopy() {
  return <div className="scroll-hero__reveal-copy">
    <h2>Intelligence that powers <em>better</em> career decisions</h2>
    <p>Career Compass transforms raw labour market data into actionable insights for students, professionals, and institutions.</p>
  </div>;
}

function FinalFrame({ desktop, mobile }: { desktop: string; mobile: string }) {
  return <picture className="scroll-hero__final-frame">
    <source media="(max-width: 767px)" srcSet={mobile} />
    <img src={desktop} alt="" />
  </picture>;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const change = () => setMatches(media.matches);
    change();
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, [query]);
  return matches;
}

export function ScrollHero() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const videoSource = isMobile ? "/hero-mobile.mp4" : "/hero-desktop.mp4";
  const poster = isMobile ? "/hero-mobile-poster.jpg" : "/hero-desktop-poster.jpg";
  const finalDesktop = "/hero-desktop-final.jpg";
  const finalMobile = "/hero-mobile-final.jpg";
  const { trackRef, stageRef, videoRef, progressRef, activeSceneId, revealActive, hasScrolled, ready } = useScrollHero(videoSource, reducedMotion);
  const activeScene = scenes.find(scene => scene.id === activeSceneId);

  if (reducedMotion) return <>
    <section className="scroll-hero scroll-hero--reduced" id="hero">
      <img className="scroll-hero__poster" src={poster} alt="" />
      <div className="scroll-hero__text-layer"><SceneText scene={scenes[0]!} isMobile={isMobile} reducedMotion /></div>
    </section>
    <div className="scroll-hero__reduced-story">{scenes.slice(1).map(scene => <p key={scene.id}>{scene.kicker} <strong>{scene.headline}</strong></p>)}</div>
    <section className="scroll-hero__static-reveal">
      <CareerIntelligenceCopy />
      <div className="scroll-hero__static-media"><FinalFrame desktop={finalDesktop} mobile={finalMobile} /></div>
    </section>
  </>;

  return <div className="scroll-hero-track" ref={trackRef} style={{ height: `${PIN_SCROLL_MULTIPLIER * 100}svh` }}>
    <section className="scroll-hero" id="hero" ref={stageRef}>
      <div className="scroll-hero__reveal-bg" aria-hidden="true" />
      <div className="scroll-hero__media">
        <img className="scroll-hero__poster" src={poster} alt="" fetchPriority="high" />
        <video key={videoSource} ref={videoRef} className={`scroll-hero__video ${ready ? "scroll-hero__video--ready" : ""}`} src={videoSource} poster={poster} muted playsInline preload="auto" aria-hidden="true" />
        <FinalFrame desktop={finalDesktop} mobile={finalMobile} />
        <div className="scroll-hero__vignette" aria-hidden="true" />
      </div>
      <div className="scroll-hero__reveal" aria-hidden={!revealActive}><CareerIntelligenceCopy /></div>
      <div className="scroll-hero__text-layer" aria-hidden="true">
        <AnimatePresence mode="wait">{activeScene && <SceneText key={activeScene.id} scene={activeScene} isMobile={isMobile} />}</AnimatePresence>
      </div>
      <div className="scroll-hero__sr-transcript"><h1>Whether you're choosing your university course</h1><ol>{scenes.slice(1).map(scene => <li key={scene.id}>{scene.kicker} {scene.headline}</li>)}</ol></div>
      <div className="scroll-hero__scene-dots" aria-hidden="true">{scenes.map(scene => <span key={scene.id} className={`scene-dot ${!revealActive && activeSceneId === scene.id ? "scene-dot--active" : ""}`} />)}<span className={`scene-dot ${revealActive ? "scene-dot--active" : ""}`} /></div>
      <ScrollCue visible={!hasScrolled && ready} />
      <div className="scroll-hero__progress" aria-hidden="true"><div className="scroll-hero__progress-bar" ref={progressRef} /></div>
    </section>
  </div>;
}

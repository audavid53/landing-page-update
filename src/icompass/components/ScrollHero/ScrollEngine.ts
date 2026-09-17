import { SCRUB_FOLLOW_MS, SNAP_IDLE_MS, VIDEO_SCROLL_FRACTION, scenes } from "@/icompass/config/scene-timeline";

interface ScrollEngineOptions {
  track: HTMLElement;
  video: HTMLVideoElement;
  onFrame: (time: number, progress: number) => void;
  onProgress: (progress: number) => void;
  onVisualProgress: (progress: number) => void;
}

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const FALLBACK_DURATION = 11.35;

/** Keeps scroll position, video seeking, and scene text on one timeline. */
export class ScrollEngine {
  private readonly track: HTMLElement;
  private readonly video: HTMLVideoElement;
  private readonly onFrame: ScrollEngineOptions["onFrame"];
  private readonly onProgress: ScrollEngineOptions["onProgress"];
  private readonly onVisualProgress: ScrollEngineOptions["onVisualProgress"];
  private duration = FALLBACK_DURATION;
  private target = 0;
  private displayed = 0;
  private pendingSeek: number | null = null;
  private lastFrame = 0;
  private frame = 0;
  private idleTimer = 0;
  private snapFrame = 0;
  private snapping = false;
  private destroyed = false;
  private observer: IntersectionObserver;
  private visible = true;
  private seekingTimestamp = 0;
  private primed = false;

  constructor({ track, video, onFrame, onProgress, onVisualProgress }: ScrollEngineOptions) {
    this.track = track;
    this.video = video;
    this.onFrame = onFrame;
    this.onProgress = onProgress;
    this.onVisualProgress = onVisualProgress;
    this.video.muted = true;
    this.video.defaultMuted = true;
    this.video.playsInline = true;

    this.updateDuration();
    this.target = this.displayed = this.readProgress();

    if (this.video.readyState === 0) {
      this.video.load();
    }

    this.observer = new IntersectionObserver(([entry]) => {
      this.visible = entry?.isIntersecting ?? false;
      if (this.visible) this.handleScroll();
    }, { rootMargin: "100% 0px" });
    this.observer.observe(track);

    video.addEventListener("loadedmetadata", this.handleMetadata);
    video.addEventListener("loadeddata", this.handleMetadata);
    video.addEventListener("durationchange", this.handleMetadata);
    video.addEventListener("canplay", this.handleMetadata);
    video.addEventListener("seeked", this.handleSeeked);

    window.addEventListener("scroll", this.handleScroll, { passive: true });
    window.addEventListener("resize", this.handleResize, { passive: true });
    window.addEventListener("wheel", this.handleUserInteraction, { passive: true });
    window.addEventListener("touchstart", this.handleUserInteraction, { passive: true });
    window.addEventListener("pointerdown", this.handleUserInteraction, { passive: true });
    window.addEventListener("keydown", this.handleKeydown);

    this.onProgress(this.target);
    this.onVisualProgress(this.displayed);
    this.requestFrame();
  }

  private updateDuration() {
    if (Number.isFinite(this.video.duration) && this.video.duration > 0) {
      this.duration = this.video.duration;
    }
  }

  /**
   * On iOS Safari, media elements require an initial play/pause handshake
   * on user gesture (touch/scroll) to initialize the hardware decoding pipeline.
   */
  private primeVideo = () => {
    if (this.primed || !this.video) return;
    this.primed = true;
    try {
      const p = this.video.play();
      if (p !== undefined) {
        p.then(() => {
          this.video.pause();
          this.updateDuration();
        }).catch(() => {
          // Autoplay or low-power restriction fallback
        });
      }
    } catch {
      // Ignore
    }
  };

  private handleUserInteraction = () => {
    this.primeVideo();
    this.cancelSnap();
  };

  private readProgress() {
    const rect = this.track.getBoundingClientRect();
    const distance = Math.max(1, rect.height - window.innerHeight);
    return clamp(-rect.top / distance);
  }

  private handleMetadata = () => {
    this.updateDuration();
    this.requestFrame();
  };

  private handleSeeked = () => {
    this.seekingTimestamp = 0;
    this.onFrame(this.video.currentTime, this.displayed);
    if (this.pendingSeek !== null) {
      const next = this.pendingSeek;
      this.pendingSeek = null;
      this.seek(next);
    }
  };

  private seek(time: number) {
    this.updateDuration();
    if (!this.duration) return;

    const next = Math.min(Math.max(time, 0), Math.max(0, this.duration - 0.001));
    const isSeekingStalled = this.seekingTimestamp > 0 && Date.now() - this.seekingTimestamp > 120;

    if (this.video.seeking && !isSeekingStalled) {
      this.pendingSeek = next;
    } else if (Math.abs(this.video.currentTime - next) > 1 / 60) {
      try {
        this.seekingTimestamp = Date.now();
        this.video.currentTime = next;
      } catch {
        // Fallback for unexpected seek exceptions
      }
    } else {
      this.onFrame(this.video.currentTime, this.displayed);
    }
  }

  private handleScroll = () => {
    this.primeVideo();
    this.target = this.readProgress();
    this.onProgress(this.target);
    this.onVisualProgress(this.displayed);
    if (this.visible) this.requestFrame();
    if (!this.snapping) {
      window.clearTimeout(this.idleTimer);
      this.idleTimer = window.setTimeout(this.snapToScene, SNAP_IDLE_MS);
    }
  };

  private handleResize = () => {
    this.target = this.readProgress();
    this.displayed = this.target;
    this.onProgress(this.target);
    this.onVisualProgress(this.displayed);
    this.requestFrame();
  };

  private handleKeydown = (event: KeyboardEvent) => {
    if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) this.cancelSnap();
  };

  private cancelSnap = () => {
    if (!this.snapping) return;
    this.snapping = false;
    cancelAnimationFrame(this.snapFrame);
    this.snapFrame = 0;
  };

  private snapToScene = () => {
    if (this.destroyed || this.snapping || !this.visible || this.target <= 0 || this.target >= 1 || !this.duration) return;
    const stops = [0, ...scenes.map(scene => Math.min(1, scene.holdTime / this.duration) * VIDEO_SCROLL_FRACTION), VIDEO_SCROLL_FRACTION, 1];
    const nearest = stops.reduce((best, stop) => Math.abs(stop - this.target) < Math.abs(best - this.target) ? stop : best, 0);
    if (Math.abs(nearest - this.target) < 0.006) return;
    const rect = this.track.getBoundingClientRect();
    const top = window.scrollY + rect.top + nearest * (rect.height - window.innerHeight);
    const startY = window.scrollY;
    const distance = top - startY;
    let startedAt = 0;
    this.snapping = true;
    const animate = (now: number) => {
      if (!this.snapping || this.destroyed) return;
      if (!startedAt) startedAt = now;
      const fraction = clamp((now - startedAt) / 480);
      const eased = 1 - Math.pow(1 - fraction, 3);
      window.scrollTo({ top: startY + distance * eased, behavior: "instant" });
      if (fraction < 1) {
        this.snapFrame = requestAnimationFrame(animate);
      } else {
        this.snapFrame = 0;
        this.snapping = false;
        this.handleScroll();
      }
    };
    this.snapFrame = requestAnimationFrame(animate);
  };

  private requestFrame() {
    if (!this.frame) this.frame = requestAnimationFrame(this.tick);
  }

  private tick = (now: number) => {
    this.frame = 0;
    if (this.destroyed) return;
    const delta = this.lastFrame ? Math.min(64, now - this.lastFrame) : 16;
    this.lastFrame = now;
    const easing = 1 - Math.exp(-delta / SCRUB_FOLLOW_MS);
    this.displayed += (this.target - this.displayed) * easing;
    if (Math.abs(this.target - this.displayed) < 0.0005) this.displayed = this.target;
    this.seek(clamp(this.displayed / VIDEO_SCROLL_FRACTION) * this.duration);
    this.onVisualProgress(this.displayed);
    if (this.displayed !== this.target) this.requestFrame();
  };

  destroy() {
    this.destroyed = true;
    this.observer.disconnect();
    this.video.removeEventListener("loadedmetadata", this.handleMetadata);
    this.video.removeEventListener("loadeddata", this.handleMetadata);
    this.video.removeEventListener("durationchange", this.handleMetadata);
    this.video.removeEventListener("canplay", this.handleMetadata);
    this.video.removeEventListener("seeked", this.handleSeeked);
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("wheel", this.handleUserInteraction);
    window.removeEventListener("touchstart", this.handleUserInteraction);
    window.removeEventListener("pointerdown", this.handleUserInteraction);
    window.removeEventListener("keydown", this.handleKeydown);
    window.clearTimeout(this.idleTimer);
    cancelAnimationFrame(this.snapFrame);
    cancelAnimationFrame(this.frame);
  }
}

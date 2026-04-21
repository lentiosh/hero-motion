import { interpolate, spring, SpringConfig } from "remotion";

export const SPRING_CONFIG: SpringConfig = {
  damping: 18,
  mass: 0.8,
  stiffness: 120,
  overshootClamping: false,
};

export const SPRING_CONFIG_SLOW: SpringConfig = {
  damping: 25,
  mass: 1.2,
  stiffness: 80,
  overshootClamping: false,
};

export function fadeIn(frame: number, startFrame: number, durationFrames = 20): number {
  return interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

export function fadeOut(frame: number, startFrame: number, durationFrames = 20): number {
  return interpolate(frame, [startFrame, startFrame + durationFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

export function slideUp(frame: number, fps: number, delay = 0, offsetPx = 60): number {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIG,
  });
  return interpolate(progress, [0, 1], [offsetPx, 0]);
}

export function slideDown(frame: number, fps: number, delay = 0, offsetPx = 60): number {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIG,
  });
  return interpolate(progress, [0, 1], [-offsetPx, 0]);
}

export function scaleIn(frame: number, fps: number, delay = 0): number {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIG,
  });
  return interpolate(progress, [0, 1], [0.8, 1]);
}

export function scaleInBig(frame: number, fps: number, delay = 0): number {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIG_SLOW,
  });
  return interpolate(progress, [0, 1], [1.3, 1]);
}

export function springOpacity(frame: number, fps: number, delay = 0): number {
  return spring({
    frame: frame - delay,
    fps,
    config: { ...SPRING_CONFIG, overshootClamping: true },
    from: 0,
    to: 1,
  });
}

export function wobble(frame: number, fps: number, delay = 0): number {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 6, mass: 0.5, stiffness: 200, overshootClamping: false },
  });
  return interpolate(progress, [0, 1], [0.85, 1]);
}

export function ticker(
  frame: number,
  startFrame: number,
  endFrame: number,
  from: number,
  to: number
): number {
  return interpolate(frame, [startFrame, endFrame], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

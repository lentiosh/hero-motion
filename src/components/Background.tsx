import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Palette } from "../helpers/colors";

interface BackgroundProps {
  palette: Palette;
  animated?: boolean;
}

export const Background: React.FC<BackgroundProps> = ({ palette, animated = true }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const rotation = animated
    ? interpolate(frame, [0, durationInFrames], [0, 30], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const scale = animated
    ? interpolate(frame, [0, durationInFrames], [1, 1.15], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: `linear-gradient(160deg, ${palette.bg1} 0%, ${palette.bg2} 100%)`,
      }}
    >
      {/* Slow-rotating radial orbs */}
      <div
        style={{
          position: "absolute",
          inset: "-20%",
          transform: `rotate(${rotation}deg) scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "60%",
            height: "60%",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${palette.accent1}30 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            right: "0%",
            width: "70%",
            height: "70%",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${palette.accent2}25 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "40%",
            width: "50%",
            height: "50%",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${palette.highlight}15 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Grid lines overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${palette.accent1}08 1px, transparent 1px),
            linear-gradient(90deg, ${palette.accent1}08 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
};

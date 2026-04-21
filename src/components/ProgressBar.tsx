import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { springOpacity } from "../helpers/animations";
import { Palette } from "../helpers/colors";

interface ProgressBarProps {
  label: string;
  percentage: number;
  palette: Palette;
  delay?: number;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  percentage,
  palette,
  delay = 0,
  height = 14,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = springOpacity(frame, fps, delay);

  const progressFrame = Math.max(0, frame - delay - 5);
  const width = interpolate(progressFrame, [0, fps * 1.2], [0, percentage], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity, display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: palette.text,
            fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: palette.highlight,
            fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
          }}
        >
          {Math.round(width)}%
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height,
          borderRadius: height,
          background: `${palette.accent1}20`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${width}%`,
            height: "100%",
            borderRadius: height,
            background: `linear-gradient(90deg, ${palette.accent1}, ${palette.accent2})`,
            boxShadow: `0 0 12px ${palette.accent1}80`,
          }}
        />
      </div>
    </div>
  );
};

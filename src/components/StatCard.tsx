import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { springOpacity, scaleIn } from "../helpers/animations";
import { Palette } from "../helpers/colors";

interface StatCardProps {
  value: string;
  label: string;
  palette: Palette;
  delay?: number;
  size?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  palette,
  delay = 0,
  size = 180,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = springOpacity(frame, fps, delay);
  const scale = scaleIn(frame, fps, delay);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        width: size,
        padding: size * 0.18,
        borderRadius: size * 0.18,
        background: `${palette.accent1}12`,
        border: `1px solid ${palette.accent1}30`,
        backdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: size * 0.06,
      }}
    >
      <span
        style={{
          fontSize: size * 0.3,
          fontWeight: 900,
          color: palette.highlight,
          fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: size * 0.12,
          fontWeight: 500,
          color: palette.textMuted,
          fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
          textAlign: "center",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
};

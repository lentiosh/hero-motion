import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { springOpacity, scaleIn, wobble } from "../helpers/animations";
import { Palette } from "../helpers/colors";

interface LogoRevealProps {
  brandName: string;
  tagline?: string;
  palette: Palette;
  delay?: number;
  size?: number;
}

export const LogoReveal: React.FC<LogoRevealProps> = ({
  brandName,
  tagline,
  palette,
  delay = 0,
  size = 60,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = springOpacity(frame, fps, delay);
  const scale = scaleIn(frame, fps, delay);
  const tagOpacity = springOpacity(frame, fps, delay + 8);

  const initials = brandName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: size * 0.3,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Icon mark */}
      <div
        style={{
          width: size * 1.4,
          height: size * 1.4,
          borderRadius: size * 0.35,
          background: `linear-gradient(135deg, ${palette.accent1}, ${palette.accent2})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 40px ${palette.accent1}80`,
        }}
      >
        <span
          style={{
            fontSize: size * 0.6,
            fontWeight: 900,
            color: "#fff",
            fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          {initials}
        </span>
      </div>

      {/* Brand name */}
      <span
        style={{
          fontSize: size * 0.7,
          fontWeight: 800,
          color: palette.text,
          fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
          letterSpacing: "-0.01em",
        }}
      >
        {brandName}
      </span>

      {/* Tagline */}
      {tagline && (
        <span
          style={{
            fontSize: size * 0.3,
            fontWeight: 400,
            color: palette.textMuted,
            fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: tagOpacity,
          }}
        >
          {tagline}
        </span>
      )}
    </div>
  );
};

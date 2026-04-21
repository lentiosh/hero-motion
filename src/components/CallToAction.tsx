import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { springOpacity, wobble } from "../helpers/animations";
import { Palette } from "../helpers/colors";

interface CallToActionProps {
  text: string;
  palette: Palette;
  delay?: number;
  fontSize?: number;
  style?: "filled" | "outlined" | "pill";
}

export const CallToAction: React.FC<CallToActionProps> = ({
  text,
  palette,
  delay = 0,
  fontSize = 28,
  style = "pill",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = springOpacity(frame, fps, delay);
  const scale = wobble(frame, fps, delay);

  // Pulse animation after entrance
  const pulseFrame = Math.max(0, frame - delay - 15);
  const pulse = interpolate(
    Math.sin((pulseFrame / fps) * Math.PI * 1.5),
    [-1, 1],
    [0.97, 1.03],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const borderRadius =
    style === "pill" ? 999 : style === "filled" ? 16 : 16;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale * pulse})`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: fontSize * 0.55,
        paddingBottom: fontSize * 0.55,
        paddingLeft: fontSize * 1.4,
        paddingRight: fontSize * 1.4,
        borderRadius,
        background:
          style === "outlined"
            ? "transparent"
            : `linear-gradient(135deg, ${palette.accent1}, ${palette.accent2})`,
        border:
          style === "outlined"
            ? `2px solid ${palette.accent1}`
            : "none",
        boxShadow:
          style !== "outlined"
            ? `0 0 40px ${palette.accent1}60, 0 4px 20px rgba(0,0,0,0.4)`
            : `0 0 20px ${palette.accent1}40`,
        cursor: "pointer",
      }}
    >
      <span
        style={{
          fontSize,
          fontWeight: 700,
          fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color:
            style === "outlined" ? palette.accent1 : palette.text,
        }}
      >
        {text}
      </span>
    </div>
  );
};

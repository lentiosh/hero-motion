import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { springOpacity, wobble } from "../helpers/animations";
import { Palette } from "../helpers/colors";

interface AnimatedBadgeProps {
  text: string;
  palette: Palette;
  delay?: number;
  fontSize?: number;
}

export const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({
  text,
  palette,
  delay = 0,
  fontSize = 22,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = springOpacity(frame, fps, delay);
  const scale = wobble(frame, fps, delay);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        paddingTop: fontSize * 0.4,
        paddingBottom: fontSize * 0.4,
        paddingLeft: fontSize * 0.8,
        paddingRight: fontSize * 0.8,
        borderRadius: 999,
        background: `${palette.accent1}22`,
        border: `1px solid ${palette.accent1}55`,
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          width: fontSize * 0.35,
          height: fontSize * 0.35,
          borderRadius: "50%",
          background: palette.accent1,
          boxShadow: `0 0 10px ${palette.accent1}`,
        }}
      />
      <span
        style={{
          fontSize,
          fontWeight: 600,
          color: palette.highlight,
          fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {text}
      </span>
    </div>
  );
};

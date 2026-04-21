import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { springOpacity, slideUp } from "../helpers/animations";
import { Palette } from "../helpers/colors";

interface AnimatedSubtitleProps {
  text: string;
  palette: Palette;
  delay?: number;
  fontSize?: number;
  align?: "left" | "center" | "right";
  maxWidth?: number | string;
}

export const AnimatedSubtitle: React.FC<AnimatedSubtitleProps> = ({
  text,
  palette,
  delay = 0,
  fontSize = 32,
  align = "center",
  maxWidth = "80%",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = springOpacity(frame, fps, delay);
  const translateY = slideUp(frame, fps, delay, 30);

  return (
    <p
      style={{
        fontSize,
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        fontWeight: 400,
        lineHeight: 1.5,
        color: palette.textMuted,
        textAlign: align,
        margin: 0,
        maxWidth,
        opacity,
        transform: `translateY(${translateY}px)`,
        letterSpacing: "0.01em",
      }}
    >
      {text}
    </p>
  );
};

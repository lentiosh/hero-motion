import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, slideUp, springOpacity } from "../helpers/animations";
import { Palette } from "../helpers/colors";

interface AnimatedTitleProps {
  text: string;
  palette: Palette;
  delay?: number;
  fontSize?: number;
  gradient?: boolean;
  align?: "left" | "center" | "right";
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  text,
  palette,
  delay = 0,
  fontSize = 80,
  gradient = true,
  align = "center",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = springOpacity(frame, fps, delay);
  const translateY = slideUp(frame, fps, delay, 50);

  // Split into words for staggered reveal
  const words = text.split(" ");

  return (
    <div
      style={{
        textAlign: align,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {words.map((word, i) => {
        const wordDelay = delay + i * 3;
        const wordOpacity = springOpacity(frame, fps, wordDelay);
        const wordY = slideUp(frame, fps, wordDelay, 30);

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: wordOpacity,
              transform: `translateY(${wordY}px)`,
              marginRight: fontSize * 0.28,
              fontSize,
              fontWeight: 900,
              fontFamily:
                "'Inter', 'Helvetica Neue', 'Arial Black', sans-serif",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              background: gradient
                ? `linear-gradient(135deg, ${palette.text} 30%, ${palette.highlight} 100%)`
                : palette.text,
              WebkitBackgroundClip: gradient ? "text" : undefined,
              WebkitTextFillColor: gradient ? "transparent" : palette.text,
              backgroundClip: gradient ? "text" : undefined,
              color: gradient ? "transparent" : palette.text,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

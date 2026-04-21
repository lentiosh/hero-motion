import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Sequence } from "remotion";
import { Background } from "../components/Background";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { AnimatedSubtitle } from "../components/AnimatedSubtitle";
import { CallToAction } from "../components/CallToAction";
import { LogoReveal } from "../components/LogoReveal";
import { AnimatedBadge } from "../components/AnimatedBadge";
import { PALETTES, PaletteName } from "../helpers/colors";
import { fadeOut } from "../helpers/animations";

export interface InstagramStoryProps {
  brandName?: string;
  tagline?: string;
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  badgeText?: string;
  paletteName?: PaletteName;
}

export const InstagramStory: React.FC<InstagramStoryProps> = ({
  brandName = "HeroMotion",
  tagline = "Move the world",
  headline = "Your Story\nStarts Here",
  subheadline = "Create stunning motion graphics that captivate your audience.",
  ctaText = "Swipe Up",
  badgeText = "New Drop",
  paletteName = "neon",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const palette = PALETTES[paletteName];

  // Fade out 20 frames before end
  const endFade = fadeOut(frame, durationInFrames - 20, 20);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background palette={palette} animated />

      <AbsoluteFill style={{ opacity: endFade }}>
        {/* Top: Logo */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LogoReveal
            brandName={brandName}
            tagline={tagline}
            palette={palette}
            delay={0}
            size={44}
          />
        </div>

        {/* Badge */}
        <div
          style={{
            position: "absolute",
            top: 260,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <AnimatedBadge text={badgeText} palette={palette} delay={8} fontSize={18} />
        </div>

        {/* Center: Main headline */}
        <div
          style={{
            position: "absolute",
            top: 360,
            left: 60,
            right: 60,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <AnimatedTitle
            text={headline.replace("\n", " ")}
            palette={palette}
            delay={12}
            fontSize={76}
            gradient
          />
          <AnimatedSubtitle
            text={subheadline}
            palette={palette}
            delay={22}
            fontSize={28}
            maxWidth="85%"
          />
        </div>

        {/* Bottom: CTA */}
        <div
          style={{
            position: "absolute",
            bottom: 120,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CallToAction text={ctaText} palette={palette} delay={35} fontSize={24} style="pill" />
        </div>

        {/* Progress bar at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `${palette.accent1}30`,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(frame / durationInFrames) * 100}%`,
              background: `linear-gradient(90deg, ${palette.accent1}, ${palette.highlight})`,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

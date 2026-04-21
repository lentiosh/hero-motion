import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { AnimatedSubtitle } from "../components/AnimatedSubtitle";
import { CallToAction } from "../components/CallToAction";
import { LogoReveal } from "../components/LogoReveal";
import { AnimatedBadge } from "../components/AnimatedBadge";
import { ProgressBar } from "../components/ProgressBar";
import { PALETTES, PaletteName } from "../helpers/colors";
import { fadeOut, springOpacity } from "../helpers/animations";

export interface InstagramPostProps {
  brandName?: string;
  tagline?: string;
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  badgeText?: string;
  skill1?: string;
  skill1Pct?: number;
  skill2?: string;
  skill2Pct?: number;
  skill3?: string;
  skill3Pct?: number;
  paletteName?: PaletteName;
}

export const InstagramPost: React.FC<InstagramPostProps> = ({
  brandName = "HeroMotion",
  tagline = "Motion for brands",
  headline = "Stand Out\nFrom The Crowd",
  subheadline = "Premium motion graphics for forward-thinking brands.",
  ctaText = "Learn More",
  badgeText = "Featured",
  skill1 = "Brand Awareness",
  skill1Pct = 95,
  skill2 = "Engagement Rate",
  skill2Pct = 87,
  skill3 = "Conversion Boost",
  skill3Pct = 72,
  paletteName = "ocean",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const palette = PALETTES[paletteName];

  const endFade = fadeOut(frame, durationInFrames - 15, 15);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background palette={palette} animated />

      <AbsoluteFill
        style={{
          opacity: endFade,
          display: "flex",
          flexDirection: "column",
          padding: 70,
          gap: 0,
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <LogoReveal
            brandName={brandName}
            tagline={tagline}
            palette={palette}
            delay={0}
            size={38}
          />
          <AnimatedBadge text={badgeText} palette={palette} delay={6} fontSize={16} />
        </div>

        {/* Center content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 28,
          }}
        >
          <AnimatedTitle
            text={headline.replace("\n", " ")}
            palette={palette}
            delay={10}
            fontSize={72}
            gradient
            align="left"
          />
          <AnimatedSubtitle
            text={subheadline}
            palette={palette}
            delay={22}
            fontSize={26}
            align="left"
            maxWidth="75%"
          />
        </div>

        {/* Stats / progress bars */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            marginBottom: 36,
          }}
        >
          <ProgressBar label={skill1} percentage={skill1Pct} palette={palette} delay={28} />
          <ProgressBar label={skill2} percentage={skill2Pct} palette={palette} delay={34} />
          <ProgressBar label={skill3} percentage={skill3Pct} palette={palette} delay={40} />
        </div>

        {/* CTA */}
        <div style={{ display: "flex" }}>
          <CallToAction text={ctaText} palette={palette} delay={48} fontSize={22} style="pill" />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

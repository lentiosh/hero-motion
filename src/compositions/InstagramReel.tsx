import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
  spring,
} from "remotion";
import { Background } from "../components/Background";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { AnimatedSubtitle } from "../components/AnimatedSubtitle";
import { CallToAction } from "../components/CallToAction";
import { AnimatedBadge } from "../components/AnimatedBadge";
import { StatCard } from "../components/StatCard";
import { PALETTES, PaletteName } from "../helpers/colors";
import { fadeOut, fadeIn, springOpacity } from "../helpers/animations";

export interface InstagramReelProps {
  brandName?: string;
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
  badgeText?: string;
  paletteName?: PaletteName;
}

// Scene durations (in frames at 30fps)
const SCENE_INTRO = 45;
const SCENE_STATS = 60;
const SCENE_CTA = 45;

export const InstagramReel: React.FC<InstagramReelProps> = ({
  brandName = "HeroMotion",
  headline = "Results That\nSpeak Volumes",
  subheadline = "Join thousands of creators building unforgettable brands.",
  ctaText = "Follow Now",
  stat1Value = "10M+",
  stat1Label = "Views",
  stat2Value = "98%",
  stat2Label = "Satisfaction",
  stat3Value = "5x",
  stat3Label = "Engagement",
  badgeText = "Trending",
  paletteName = "sunset",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const palette = PALETTES[paletteName];

  const endFade = fadeOut(frame, durationInFrames - 15, 15);

  // Scene transitions
  const inScene1 = frame < SCENE_INTRO;
  const inScene2 = frame >= SCENE_INTRO && frame < SCENE_INTRO + SCENE_STATS;
  const inScene3 = frame >= SCENE_INTRO + SCENE_STATS;

  const scene2Opacity = fadeIn(frame, SCENE_INTRO, 12);
  const scene2Exit = inScene3 ? fadeOut(frame, SCENE_INTRO + SCENE_STATS, 10) : 1;
  const scene3Opacity = fadeIn(frame, SCENE_INTRO + SCENE_STATS, 12);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background palette={palette} animated />

      <AbsoluteFill style={{ opacity: endFade }}>
        {/* Scene 1: Intro */}
        {(inScene1 || frame < SCENE_INTRO + 10) && (
          <AbsoluteFill
            style={{
              opacity: inScene1 ? 1 : fadeOut(frame, SCENE_INTRO, 10),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 60px",
              gap: 28,
            }}
          >
            <AnimatedBadge text={badgeText} palette={palette} delay={0} fontSize={18} />
            <AnimatedTitle
              text={headline.replace("\n", " ")}
              palette={palette}
              delay={5}
              fontSize={74}
              gradient
            />
            <AnimatedSubtitle
              text={subheadline}
              palette={palette}
              delay={18}
              fontSize={28}
              maxWidth="85%"
            />
          </AbsoluteFill>
        )}

        {/* Scene 2: Stats */}
        {inScene2 && (
          <AbsoluteFill
            style={{
              opacity: Math.min(scene2Opacity, scene2Exit),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 48,
            }}
          >
            <AnimatedTitle
              text="Why Brands Choose Us"
              palette={palette}
              delay={SCENE_INTRO + 5}
              fontSize={52}
              gradient
            />
            <div style={{ display: "flex", gap: 28 }}>
              <StatCard
                value={stat1Value}
                label={stat1Label}
                palette={palette}
                delay={SCENE_INTRO + 12}
                size={190}
              />
              <StatCard
                value={stat2Value}
                label={stat2Label}
                palette={palette}
                delay={SCENE_INTRO + 18}
                size={190}
              />
              <StatCard
                value={stat3Value}
                label={stat3Label}
                palette={palette}
                delay={SCENE_INTRO + 24}
                size={190}
              />
            </div>
          </AbsoluteFill>
        )}

        {/* Scene 3: CTA */}
        {inScene3 && (
          <AbsoluteFill
            style={{
              opacity: scene3Opacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 36,
            }}
          >
            <AnimatedTitle
              text={brandName}
              palette={palette}
              delay={SCENE_INTRO + SCENE_STATS + 3}
              fontSize={88}
              gradient
            />
            <AnimatedSubtitle
              text="Your audience is waiting."
              palette={palette}
              delay={SCENE_INTRO + SCENE_STATS + 12}
              fontSize={30}
            />
            <CallToAction
              text={ctaText}
              palette={palette}
              delay={SCENE_INTRO + SCENE_STATS + 20}
              fontSize={26}
              style="pill"
            />
          </AbsoluteFill>
        )}

        {/* Bottom progress */}
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

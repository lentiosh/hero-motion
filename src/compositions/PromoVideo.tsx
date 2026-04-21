import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { Background } from "../components/Background";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { AnimatedSubtitle } from "../components/AnimatedSubtitle";
import { CallToAction } from "../components/CallToAction";
import { LogoReveal } from "../components/LogoReveal";
import { AnimatedBadge } from "../components/AnimatedBadge";
import { CountdownTimer } from "../components/CountdownTimer";
import { StatCard } from "../components/StatCard";
import { PALETTES, PaletteName } from "../helpers/colors";
import { fadeOut, fadeIn, springOpacity, ticker } from "../helpers/animations";

export interface PromoVideoProps {
  brandName?: string;
  tagline?: string;
  headline?: string;
  offerText?: string;
  subheadline?: string;
  ctaText?: string;
  discountText?: string;
  countdownLabel?: string;
  daysLeft?: number;
  paletteName?: PaletteName;
}

// Scene timings at 30fps
const SCENE_1_START = 0;   // Brand intro
const SCENE_1_END = 50;

const SCENE_2_START = 50;  // Offer announcement
const SCENE_2_END = 110;

const SCENE_3_START = 110; // Countdown
const SCENE_3_END = 165;

const SCENE_4_START = 165; // CTA
const SCENE_4_END = 210;

function sceneOpacity(frame: number, start: number, end: number): number {
  const fadeInEnd = start + 12;
  const fadeOutStart = end - 12;

  if (frame < start) return 0;
  if (frame < fadeInEnd) return interpolate(frame, [start, fadeInEnd], [0, 1], { extrapolateRight: "clamp" });
  if (frame < fadeOutStart) return 1;
  if (frame <= end) return interpolate(frame, [fadeOutStart, end], [1, 0], { extrapolateRight: "clamp" });
  return 0;
}

export const PromoVideo: React.FC<PromoVideoProps> = ({
  brandName = "HeroMotion",
  tagline = "Move the world",
  headline = "The Future\nIs Motion",
  offerText = "EXCLUSIVE LAUNCH OFFER",
  subheadline = "Get 50% off your first campaign. Limited time only.",
  ctaText = "Claim Your Deal",
  discountText = "50% OFF",
  countdownLabel = "Offer ends in",
  daysLeft = 3,
  paletteName = "neon",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const palette = PALETTES[paletteName];

  const finalFade = fadeOut(frame, durationInFrames - 12, 12);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background palette={palette} animated />

      <AbsoluteFill style={{ opacity: finalFade }}>
        {/* SCENE 1: Brand intro */}
        {frame >= SCENE_1_START && frame < SCENE_2_START + 12 && (
          <AbsoluteFill
            style={{
              opacity: sceneOpacity(frame, SCENE_1_START, SCENE_1_END),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 40,
            }}
          >
            <LogoReveal
              brandName={brandName}
              tagline={tagline}
              palette={palette}
              delay={0}
              size={64}
            />
            <AnimatedTitle
              text={headline.replace("\n", " ")}
              palette={palette}
              delay={10}
              fontSize={80}
              gradient
            />
          </AbsoluteFill>
        )}

        {/* SCENE 2: Offer */}
        {frame >= SCENE_2_START - 2 && frame < SCENE_3_START + 12 && (
          <AbsoluteFill
            style={{
              opacity: sceneOpacity(frame, SCENE_2_START, SCENE_2_END),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
            }}
          >
            <AnimatedBadge
              text={offerText}
              palette={palette}
              delay={SCENE_2_START + 2}
              fontSize={20}
            />

            {/* Huge discount number */}
            <div
              style={{
                opacity: springOpacity(frame, fps, SCENE_2_START + 8),
                fontSize: 160,
                fontWeight: 900,
                fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                lineHeight: 1,
                background: `linear-gradient(135deg, ${palette.highlight} 0%, ${palette.accent1} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                letterSpacing: "-0.04em",
                transform: `scale(${interpolate(
                  spring({ frame: frame - SCENE_2_START - 8, fps, config: { damping: 12, mass: 1, stiffness: 80, overshootClamping: false } }),
                  [0, 1], [0.5, 1]
                )})`,
              }}
            >
              {discountText}
            </div>

            <AnimatedSubtitle
              text={subheadline}
              palette={palette}
              delay={SCENE_2_START + 20}
              fontSize={30}
              maxWidth="75%"
            />
          </AbsoluteFill>
        )}

        {/* SCENE 3: Countdown */}
        {frame >= SCENE_3_START - 2 && frame < SCENE_4_START + 12 && (
          <AbsoluteFill
            style={{
              opacity: sceneOpacity(frame, SCENE_3_START, SCENE_3_END),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 40,
            }}
          >
            <AnimatedTitle
              text="Don't Miss Out"
              palette={palette}
              delay={SCENE_3_START + 3}
              fontSize={64}
              gradient
            />
            <CountdownTimer
              label={countdownLabel}
              palette={palette}
              delay={SCENE_3_START + 10}
              daysLeft={daysLeft}
            />
          </AbsoluteFill>
        )}

        {/* SCENE 4: CTA */}
        {frame >= SCENE_4_START - 2 && (
          <AbsoluteFill
            style={{
              opacity: sceneOpacity(frame, SCENE_4_START, SCENE_4_END),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 36,
            }}
          >
            <LogoReveal
              brandName={brandName}
              palette={palette}
              delay={SCENE_4_START + 3}
              size={50}
            />
            <AnimatedTitle
              text="Ready to Launch?"
              palette={palette}
              delay={SCENE_4_START + 8}
              fontSize={68}
              gradient
            />
            <CallToAction
              text={ctaText}
              palette={palette}
              delay={SCENE_4_START + 18}
              fontSize={26}
              style="pill"
            />
          </AbsoluteFill>
        )}

        {/* Timeline */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `${palette.accent1}25`,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(frame / durationInFrames) * 100}%`,
              background: `linear-gradient(90deg, ${palette.accent2}, ${palette.accent1}, ${palette.highlight})`,
              transition: "none",
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Inline usage of springOpacity for scene 2
function springOpacity(frame: number, fps: number, delay: number): number {
  return spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, mass: 0.8, stiffness: 120, overshootClamping: true },
    from: 0,
    to: 1,
  });
}

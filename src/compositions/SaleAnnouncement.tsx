import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Background } from "../components/Background";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { AnimatedSubtitle } from "../components/AnimatedSubtitle";
import { CallToAction } from "../components/CallToAction";
import { AnimatedBadge } from "../components/AnimatedBadge";
import { PALETTES, PaletteName } from "../helpers/colors";
import { fadeOut, springOpacity as importedSpringOpacity } from "../helpers/animations";

export interface SaleAnnouncementProps {
  saleLabel?: string;
  headline?: string;
  discountAmount?: string;
  discountUnit?: string;
  subtext?: string;
  ctaText?: string;
  paletteName?: PaletteName;
}

export const SaleAnnouncement: React.FC<SaleAnnouncementProps> = ({
  saleLabel = "Flash Sale",
  headline = "Everything Must Go",
  discountAmount = "70",
  discountUnit = "% OFF",
  subtext = "Use code HERO70 at checkout. Today only.",
  ctaText = "Shop Now",
  paletteName = "sunset",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const palette = PALETTES[paletteName];

  const endFade = fadeOut(frame, durationInFrames - 15, 15);

  // Discount number animates counting up
  const countProgress = interpolate(frame, [10, 50], [0, parseInt(discountAmount, 10)], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Flicker/flash effect on the discount
  const flashOpacity =
    frame > 8 && frame < 12 ? 0.4 : frame > 14 && frame < 16 ? 0.6 : 1;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background palette={palette} animated />

      <AbsoluteFill
        style={{
          opacity: endFade,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          padding: "0 60px",
        }}
      >
        <AnimatedBadge text={saleLabel} palette={palette} delay={0} fontSize={20} />

        <AnimatedTitle
          text={headline}
          palette={palette}
          delay={5}
          fontSize={72}
          gradient
        />

        {/* Big discount display */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            opacity: importedSpringOpacity(frame, fps, 8) * flashOpacity,
            transform: `scale(${spring({
              frame: frame - 8,
              fps,
              config: { damping: 10, mass: 1.2, stiffness: 100, overshootClamping: false },
              from: 0.6,
              to: 1,
            })})`,
          }}
        >
          <span
            style={{
              fontSize: 180,
              fontWeight: 900,
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              lineHeight: 1,
              background: `linear-gradient(135deg, ${palette.highlight}, ${palette.accent1})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-0.05em",
            }}
          >
            {Math.round(countProgress)}
          </span>
          <span
            style={{
              fontSize: 80,
              fontWeight: 900,
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              lineHeight: 1,
              color: palette.accent1,
              letterSpacing: "-0.02em",
            }}
          >
            {discountUnit}
          </span>
        </div>

        <AnimatedSubtitle
          text={subtext}
          palette={palette}
          delay={30}
          fontSize={26}
          maxWidth="80%"
        />

        <CallToAction text={ctaText} palette={palette} delay={40} fontSize={24} style="pill" />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

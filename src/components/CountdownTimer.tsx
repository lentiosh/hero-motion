import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { springOpacity } from "../helpers/animations";
import { Palette } from "../helpers/colors";

interface CountdownTimerProps {
  label: string;
  palette: Palette;
  delay?: number;
  daysLeft?: number;
}

const TimeBlock: React.FC<{
  value: number;
  label: string;
  palette: Palette;
  size: number;
}> = ({ value, label, palette, size }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: size * 0.1,
    }}
  >
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.2,
        background: `${palette.accent1}18`,
        border: `1px solid ${palette.accent1}40`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontSize: size * 0.48,
          fontWeight: 800,
          color: palette.text,
          fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span
      style={{
        fontSize: size * 0.2,
        fontWeight: 500,
        color: palette.textMuted,
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
      }}
    >
      {label}
    </span>
  </div>
);

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  label,
  palette,
  delay = 0,
  daysLeft = 3,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = springOpacity(frame, fps, delay);

  const totalSeconds = daysLeft * 24 * 3600;
  const elapsedSeconds = Math.floor(frame / fps);
  const remaining = Math.max(0, totalSeconds - elapsedSeconds);

  const days = Math.floor(remaining / 86400);
  const hours = Math.floor((remaining % 86400) / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  const blockSize = 90;

  return (
    <div style={{ opacity, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <span
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: palette.textMuted,
          fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <div style={{ display: "flex", gap: 12 }}>
        <TimeBlock value={days} label="Days" palette={palette} size={blockSize} />
        <div style={{ display: "flex", alignItems: "center", paddingBottom: 24 }}>
          <span style={{ fontSize: 40, fontWeight: 800, color: palette.accent1, lineHeight: 1 }}>:</span>
        </div>
        <TimeBlock value={hours} label="Hours" palette={palette} size={blockSize} />
        <div style={{ display: "flex", alignItems: "center", paddingBottom: 24 }}>
          <span style={{ fontSize: 40, fontWeight: 800, color: palette.accent1, lineHeight: 1 }}>:</span>
        </div>
        <TimeBlock value={minutes} label="Mins" palette={palette} size={blockSize} />
        <div style={{ display: "flex", alignItems: "center", paddingBottom: 24 }}>
          <span style={{ fontSize: 40, fontWeight: 800, color: palette.accent1, lineHeight: 1 }}>:</span>
        </div>
        <TimeBlock value={seconds} label="Secs" palette={palette} size={blockSize} />
      </div>
    </div>
  );
};

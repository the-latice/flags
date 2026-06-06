import { useId } from "react";
import { FLAG_SIZES, FLAG_SHADOWS, FLAG_GRADIENTS } from "@latice/flags-core";
import type { BaseFlagProps } from "@latice/flags-core";
import type { CSSProperties, ReactNode } from "react";

interface FlagFrameProps extends BaseFlagProps {
  children?: ReactNode;
}

export function FlagFrame({
  size = "md",
  gradient,
  shadow = false,
  border = true,
  rounded = true,
  children,
}: FlagFrameProps) {
  const id = useId();
  const cfg = FLAG_SIZES[size];
  const radius = rounded ? cfg.r : 0;

  const rootStyle: CSSProperties = {
    display: "inline-block",
    verticalAlign: "middle",
    imageRendering: "crisp-edges",
    transform: "translateZ(0)",
    filter: shadow ? (FLAG_SHADOWS[size] ?? FLAG_SHADOWS.md) : undefined,
  };

  const contentStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    overflow: "hidden",
  };

  const slotSvgStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    lineHeight: "0",
  };

  const clipId = `clip-${id}`;

  return (
    <svg
      width={cfg.w}
      height={cfg.h}
      viewBox={`0 0 ${cfg.w} ${cfg.h}`}
      xmlns="http://www.w3.org/2000/svg"
      style={rootStyle}
    >
      <defs>
        <clipPath id={clipId}>
          <rect
            x={0}
            y={0}
            width={cfg.w}
            height={cfg.h}
            rx={radius}
            ry={radius}
          />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        <foreignObject x={0} y={0} width={cfg.w} height={cfg.h}>
          <div style={contentStyle}>
            <div style={slotSvgStyle}>{children}</div>
            {gradient && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  mixBlendMode: "overlay",
                  pointerEvents: "none",
                  backgroundImage: FLAG_GRADIENTS[gradient],
                }}
              />
            )}
          </div>
        </foreignObject>

        <rect
          x={0}
          y={0}
          width={cfg.w}
          height={cfg.h}
          fill="black"
          fillOpacity={0.001}
          style={{ mixBlendMode: "overlay", pointerEvents: "none" }}
        />

        {border && (
          <rect
            x={0.5}
            y={0.5}
            width={cfg.w - 1}
            height={cfg.h - 1}
            rx={radius > 0 ? radius - 0.2 : 0}
            ry={radius > 0 ? radius - 0.2 : 0}
            fill="none"
            stroke="black"
            strokeOpacity={0.5}
            strokeWidth={0.8}
            style={{
              mixBlendMode: "overlay",
              pointerEvents: "none",
              shapeRendering: "geometricPrecision",
            }}
          />
        )}
      </g>
    </svg>
  );
}

import { Suspense } from "react";
import { FlagSkeleton } from "./FlagSkeleton";
import { FlagFrame } from "./FlagFrame";
import { lazyRegistry } from "../runtime/lazy-registry";
import { normalizeCode } from "@latice/flags-core";
import type { BaseFlagProps, FlagCode } from "@latice/flags-core";

export interface FlagProps extends BaseFlagProps {
  code: FlagCode | string;
}

export function Flag({
  code,
  size = "md",
  gradient,
  shadow = false,
  border = true,
  rounded = true,
}: FlagProps) {
  const normalized = normalizeCode(code);
  const LazyFlag = lazyRegistry[normalized];

  if (!LazyFlag) {
    return (
      <FlagFrame size={size} rounded={rounded} shadow={false} border={false}>
        <FlagSkeleton />
      </FlagFrame>
    );
  }

  const flagProps = { size, gradient, shadow, border, rounded };

  return (
    <Suspense
      fallback={
        <FlagFrame size={size} rounded={rounded} shadow={false} border={false}>
          <FlagSkeleton />
        </FlagFrame>
      }
    >
      <LazyFlag {...flagProps} />
    </Suspense>
  );
}

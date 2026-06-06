<script setup lang="ts">
import { computed, useId } from "vue";
import type { CSSProperties } from "vue";
import { FLAG_SIZES, FLAG_SHADOWS, FLAG_GRADIENTS } from "@latice/flags-core";
import type { BaseFlagProps } from "@latice/flags-core";

const props = withDefaults(defineProps<BaseFlagProps>(), {
  size: "md",
  shadow: false,
  border: true,
  rounded: true,
});

const id = useId();
const cfg = computed(() => FLAG_SIZES[props.size]);
const radius = computed(() => (props.rounded ? cfg.value.r : 0));

const rootStyle = computed(
  (): CSSProperties => ({
    display: "inline-block",
    verticalAlign: "middle",
    imageRendering: "crisp-edges",
    transform: "translateZ(0)",
    filter: props.shadow
      ? (FLAG_SHADOWS[props.size] ?? FLAG_SHADOWS.md)
      : undefined,
  }),
);

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
</script>

<template>
  <svg
    :width="cfg.w"
    :height="cfg.h"
    :viewBox="`0 0 ${cfg.w} ${cfg.h}`"
    xmlns="http://www.w3.org/2000/svg"
    :style="rootStyle"
  >
    <defs>
      <clipPath :id="`clip-${id}`">
        <rect
          x="0"
          y="0"
          :width="cfg.w"
          :height="cfg.h"
          :rx="radius"
          :ry="radius"
        />
      </clipPath>
    </defs>

    <g :clip-path="`url(#clip-${id})`">
      <foreignObject x="0" y="0" :width="cfg.w" :height="cfg.h">
        <div xmlns="http://www.w3.org/1999/xhtml" :style="contentStyle">
          <div :style="slotSvgStyle">
            <slot />
          </div>
          <div
            v-if="gradient"
            :style="{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              mixBlendMode: 'overlay',
              pointerEvents: 'none',
              backgroundImage: FLAG_GRADIENTS[gradient],
            }"
          />
        </div>
      </foreignObject>

      <rect
        x="0"
        y="0"
        :width="cfg.w"
        :height="cfg.h"
        fill="black"
        fill-opacity="0.001"
        style="mix-blend-mode: overlay; pointer-events: none"
      />

      <rect
        v-if="border"
        x="0.5"
        y="0.5"
        :width="cfg.w - 1"
        :height="cfg.h - 1"
        :rx="radius > 0 ? radius - 0.2 : 0"
        :ry="radius > 0 ? radius - 0.2 : 0"
        fill="none"
        stroke="black"
        stroke-opacity="0.5"
        stroke-width="0.8"
        style="
          mix-blend-mode: overlay;
          pointer-events: none;
          shape-rendering: geometricPrecision;
        "
      />
    </g>
  </svg>
</template>

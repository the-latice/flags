<script lang="ts">
import { defineAsyncComponent, markRaw } from "vue";
import { lazyRegistry } from "../runtime/lazy-registry";
import type { FlagCode, BaseFlagProps } from "@latice/flags-core";

export interface Props extends BaseFlagProps {
  code: FlagCode | string;
}

// Can't define async components at module level – codes are only known at runtime.
// We create each wrapper once, cache by code, and mark it raw so Vue doesn't
// try to make the component object reactive.

const componentCache = new Map<
  string,
  ReturnType<typeof defineAsyncComponent>
>();

function getAsyncFlag(code: string) {
  if (!componentCache.has(code)) {
    componentCache.set(code, markRaw(defineAsyncComponent(lazyRegistry[code])));
  }
  return componentCache.get(code)!;
}
</script>

<script setup lang="ts">
import { computed } from "vue";
import FlagSkeleton from "./FlagSkeleton.vue";
import FlagFrame from "./FlagFrame.vue";
import { normalizeCode } from "@latice/flags-core";

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  shadow: false,
  border: true,
  rounded: true,
});

const FlagComponent = computed(() => {
  const code = normalizeCode(props.code);
  if (!lazyRegistry[code]) return null;
  return getAsyncFlag(code);
});
</script>

<template>
  <Suspense v-if="FlagComponent">
    <template #default>
      <component :is="FlagComponent" v-bind="props" />
    </template>
    <template #fallback>
      <FlagFrame
        :size="size"
        :rounded="rounded"
        :shadow="false"
        :border="false"
      >
        <FlagSkeleton />
      </FlagFrame>
    </template>
  </Suspense>
  <FlagFrame
    v-else
    :size="size"
    :rounded="rounded"
    :shadow="false"
    :border="false"
  >
    <FlagSkeleton />
  </FlagFrame>
</template>

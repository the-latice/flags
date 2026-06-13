<script setup lang="ts">
import { FLAG_SKELETON_STYLES } from "@latice/flags-core";

const skeletonCss = `
${FLAG_SKELETON_STYLES.keyframes}
.${FLAG_SKELETON_STYLES.className} { ${FLAG_SKELETON_STYLES.base} }
${FLAG_SKELETON_STYLES.darkSelector} { ${FLAG_SKELETON_STYLES.dark} }
`;
</script>

<template>
  <component :is="'style'" type="text/css" v-html="skeletonCss" />
  <div
    :class="FLAG_SKELETON_STYLES.className"
    style="width: 100%; height: 100%; border-radius: 0"
  />
</template>

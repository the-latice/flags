<script setup lang="ts">
import { FLAG_SKELETON_STYLES } from "@latice/flags-core";
</script>

<template>
  <style>
    {{ FLAG_SKELETON_STYLES.keyframes }}
    .{{ FLAG_SKELETON_STYLES.className }} { {{ FLAG_SKELETON_STYLES.base }} }
    {{ FLAG_SKELETON_STYLES.darkSelector }} { {{ FLAG_SKELETON_STYLES.dark }} }
  </style>
  <div
    :class="FLAG_SKELETON_STYLES.className"
    style="width: 100%; height: 100%; border-radius: 0"
  />
</template>

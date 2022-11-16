<template>
  <NuxtLayout />
</template>

<style>

body {
  margin: 0;
}

</style>

<script setup>

import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin.js";
gsap.registerPlugin(DrawSVGPlugin);


</script>
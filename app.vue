<template>
  <NuxtLayout />
</template>

<style>

*,
*::after,
*::before {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: #111;
}

</style>

<script setup>

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable.js";
import { InertiaPlugin } from "gsap/InertiaPlugin.js";
import { CustomEase } from "gsap/all";

if (process.client) {
  gsap.registerPlugin(Draggable);
  gsap.registerPlugin(InertiaPlugin);
  gsap.registerPlugin(CustomEase);
}

</script>
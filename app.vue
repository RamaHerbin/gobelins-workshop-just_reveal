<template>
  <NuxtLayout />
</template>

<script setup>

import './assets/styles/main.scss';
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

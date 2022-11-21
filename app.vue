<template>
  <NuxtLayout />
</template>

<script setup>

import './assets/styles/main.scss';
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable.js";
import { CustomEase } from "gsap/all";
import { InertiaPlugin } from "gsap/InertiaPlugin.js";

if (process.client) {
  gsap.registerPlugin(CustomEase, Draggable, InertiaPlugin);
}

</script>
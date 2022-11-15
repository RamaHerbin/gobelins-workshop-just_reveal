<template>
  <div>
    <canvas ref="$canvas" class="js-canvas"></canvas>
  </div>
</template>

<script setup>
import Application from "/assets/js/webgl/App.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const $canvas = ref(null);

onMounted(async () => {
  new Application({
    $canvas: $canvas.value,
  });
});
</script>

<style lang="scss"></style>

<template>
  <div>
    <canvas :ref="$canvas" class="js-canvas"></canvas>
  </div>
</template>

<script setup>
import Application from "/assets/js/webgl/App.js";

const $canvas = ref(null)



onMounted(() => {
    console.log('$canvas :>> ', $canvas);
  if (process.client) {
    new Application({
      $canvas: document.querySelector(".js-canvas"),
    });
  }
}); 
</script>

<style lang="scss"></style>

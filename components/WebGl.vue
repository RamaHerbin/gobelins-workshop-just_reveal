<template>
  <div>
    <canvas ref="$canvas" class="js-canvas"></canvas>
  </div>
</template>

<script setup>
import Application from "/assets/js/webgl/App.js";

const $canvas = ref(null);

let app;
let index = 0

onMounted(async () => {
  app = new Application({
    $canvas: $canvas.value,
  });
  console.log('app :>> ', app.world.globe);

});


const rotate = (news) => {
  app.world.globe.updateCountry(news)
}

defineExpose({rotate:rotate})

</script>

<style lang="scss" scoped>

canvas {
  display: block;
  height: 100%;
  width: 100%;
}


</style>

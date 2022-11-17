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


const test = () => {

  app.world.globe.updateCountry(index);
  index++;
}

defineExpose({test:test})

</script>

<style lang="scss"></style>

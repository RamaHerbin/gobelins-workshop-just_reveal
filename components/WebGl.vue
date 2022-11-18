<template>
  <canvas ref="$canvas" class="js-canvas"></canvas>
</template>

<script setup>
import Application from "/assets/js/webgl/App.js";

const previousNews = usePreviousNews();
const emit = defineEmits(['previousNewsClicked'])
const $canvas = ref(null);
let app;

onMounted(async () => {
  app = new Application({
    $canvas: $canvas.value
  });

});

const rotate = (news) => {
  app.world.globe.updateCountry(news)
}

watch(previousNews, () => {
  if (previousNews.value){ 
    emit('previousNewsClicked', previousNews.value)
  };

})


defineExpose({rotate:rotate})

</script>

<style lang="scss" scoped>

canvas {
  display: block;
  height: 100%;
  width: 100%;
}


</style>

<template>
    <LoadingScreen v-if='isLoading' @onHideLoading='hideLoading'/>
    <div>
        <Start v-if='isStartShow' @onHideStart='hideStart'/>
        <Timeline @next-poi="next"/>
        <EventInfos/>
        <WebGl ref="$webGl"/>
        <!-- <button class="next" @click="next">Next country</button> -->
    </div>
</template>

<script setup>

const $webGl = ref(null)
const isStartShow = ref(true);
const isLoading = ref(true);

const next = (currentNew) => {
  console.log('$webGl :>> ', $webGl);
  $webGl.value.rotate(currentNew);
}

const hideStart = () => {
  isStartShow.value = false;
}

const hideLoading = () => {
  isLoading.value = false;
}

</script>


<style lang="scss">

.next {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 20px;
    font-family: 'Arial';
}

</style>
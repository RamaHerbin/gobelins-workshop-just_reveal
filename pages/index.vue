<template>
    <div>
        <Start v-if='isStartShow' @onHideStart='hideStart' />
        <WebGl ref="$webGl"/>
        <Timeline @next-poi="next"/>
        <!-- <button class="next" @click="next">Next country</button> -->
    </div>
</template>

<script setup>

const $webGl = ref(null)
const isStartShow = ref(true);

const next = (currentNew) => {
    console.log('$webGl :>> ', $webGl);
    $webGl.value.rotate(currentNew);
}

const hideStart = () => {
  isStartShow.value = false;
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
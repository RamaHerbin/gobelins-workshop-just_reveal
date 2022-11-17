<template>
    <div>
        <Start v-if='isStartShow' @onHideStart='hideStart' />
        <WebGl ref="$webGl"/>
        <Timeline/>
        <!-- <button class="next" @click="next">Next country</button> -->
    </div>
</template>

<script setup>

const $webGl = ref(null)
const isStartShow = ref(true);

onMounted(() => {
    console.log('$webGl :>> ', $webGl);
})

const next = () => {
    console.log('$webGl :>> ', $webGl);
    $webGl.value.test();
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
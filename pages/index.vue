<template>
    <div>
        <WebGl ref="$webGl"/>
        <Timeline/>
        <button class="next" @click="next">Next country</button>
    </div>
</template>

<script setup>

const $webGl = ref(null)

onMounted(() => {
    console.log('$webGl :>> ', $webGl);

})

const next = () => {
    console.log('$webGl :>> ', $webGl);
    $webGl.value.test();
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
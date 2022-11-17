<template>
    <div>
        <WebGl ref="$webGl"/>
        <Timeline @next-poi="next"/>
        <!-- <button class="next" @click="next">Next country</button> -->
    </div>
</template>

<script setup>

const $webGl = ref(null)



const next = (currentNew) => {
    console.log('$webGl :>> ', $webGl);
    $webGl.value.rotate(currentNew);
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
<template>
    <div>
        <Start v-if='isStartShow' @onHideStart='hideStart'/>
        <Timeline ref="$timeline" :EVENTS="EVENTS"  @next-poi="next"/>
        <EventInfos/>
        <WebGl ref="$webGl" @previousNewsClicked="test"/>
        <!-- <button class="next" @click="next">Next country</button> -->
    </div>
</template>

<script setup>
import { EVENTS } from '../constants/events';



const $webGl = ref(null)
const $timeline = ref(null)
const isStartShow = ref(true);

const next = (currentNew) => {
    $webGl.value.rotate(currentNew);
}

const test = (data) => {
    let test = EVENTS.findIndex(el => el.date == data.date)
    $timeline.value.onPinClick(test);
}

const hideStart = () => {
    $timeline.value.onPinClick(0);
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
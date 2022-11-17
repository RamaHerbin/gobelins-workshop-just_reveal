<template>
  <div class='timeline'>
    <div class='timeline__wrapper' ref='wrapperRef'>
      <div class='timeline__inside'>
        <div class='date noselect' ref='dateRef'>
          <div
            v-for='dayIndex in NB_DAYS'
            class='date__day'
            :class='
              refinedEvents.includes(dayIndex) && "date__day--is-event",
              dayIndex%7 === 0 && "date__day--is-week"
            '
            :key='dayIndex'
          >
            <div class='date__day__event noselect'>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" fill="none">
                <path fill="#fff" fill-rule="evenodd" d="M1.547 2.253c1.902-1.825 4.98-1.825 6.883 0 1.759 1.687 1.92 4.38.369 6.25l-3.522 4.246a.375.375 0 0 1-.577 0L1.178 8.502c-1.551-1.87-1.39-4.562.369-6.249Z" clip-rule="evenodd"/>
              </svg>
            </div>
            <span class='date__day__tick noselect'/>
          </div>
        </div>
        <span class='timeline__mid-tick'/>
      </div>
    </div>
  </div>
</template>

<script setup>

import { Draggable } from 'gsap/all';

const EVENTS = [
  {date: '2020/1/1'},
  {date: '2020/1/16'},
  {date: '2020/1/30'},
  {date: '2020/2/10'},
  {date: '2020/2/16'},
  {date: '2020/3/16'},
  {date: '2020/4/16'},
]
const NB_YEARS = 2;
const NB_DAYS = NB_YEARS * 12 * 30;

const wrapperRef = ref(null);
const dateRef = ref(null);
const offsetX = ref(0);
const ticksRef = ref([]);
const refinedEvents = ref([]);

onMounted(() => {
  refinedEvents.value = EVENTS.map(event => getDateDiff(event.date));
  ticksRef.value = dateRef.value.children;

  window.addEventListener('resize', setTicksOpacity);
  setTicksOpacity();

  Draggable.create(dateRef.value, {
    type:"x",
    inertia: true,
    maxDuration: 1.2,
    minDuration: 0,
    bounds: {minX: -dateRef.value.offsetWidth + wrapperRef.value.offsetWidth, maxX: 0},
    edgeResistance: 0.75,
    dragResistance: 0.4,
    snap: {
      x: [...Array(NB_DAYS).fill(0).map((_, index) => -13 * index + 1)]
    },
    onThrowUpdate: function() {
      onSliderUpdate(this);
    },
    onMove: function() {
      onSliderUpdate(this);
    },
    onClick: function(event) {
      const target = event.target;
      if (target.closest('svg')) {
        console.log('clicked event')
      }
    }
  });
});

const setTicksOpacity = () => {
  const wrapperWidth = wrapperRef?.value?.offsetWidth || 0;
  const tickWidth = 13;
  const ticksInView = Math.floor(wrapperWidth / tickWidth);
  const baseIndex = Math.floor(-offsetX.value / tickWidth);

  for (let i = baseIndex; i <= (baseIndex + ticksInView + 1 || NB_DAYS); i++) {
    const tickRef = ticksRef.value[i];

    if (tickRef) {
      const opacity =
        i - baseIndex <= ticksInView/2
          ? ((i - baseIndex) / ticksInView) * 2
          : ((ticksInView - i + baseIndex) / ticksInView) * 2;

      tickRef.style.opacity = opacity;

      const isEventDay = refinedEvents.value.includes(i + 1);

      if (isEventDay) {
        const isMiddleTick = i === baseIndex + Math.floor(ticksInView/2) + 1;

        if (isMiddleTick) {
          tickRef.classList.add('date__day--is-middle');
        } else {
          tickRef.classList.remove('date__day--is-middle');
        }
      }
    }
  }
}

const getDateDiff = (date) => {
  const nativeDate = new Date(date);
  const nativeBaseDate = new Date('2020/1/1');
  const diffTime = Math.abs(nativeBaseDate - nativeDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

const onSliderUpdate = (slider) => {
  offsetX.value = slider.x;
  setTicksOpacity();
}

</script>

<style lang="scss">

.noselect {
  -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
}

.timeline {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 800px;
  padding: 0 20px;

  &__wrapper {
    position: relative;
    width: 100%;
  }

  &__inside {
    overflow-x: hidden;
    display: flex;
  }

  &__mid-tick {
    position: absolute;
    z-index: 2;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 3px;
    height: 40px;
    background-color: #D9D9D9;
  }
}

.date {
  position: relative;
  box-sizing: content-box;
  flex: 1;
  display: flex;
  align-items: center;
  height: 40px;
  padding-top: 28px;

  &__day {
    position: relative;
    display: flex;
    flex-direction: column;

    &:not(:first-of-type) {
      margin-left: 5px;
    }

    &:not(:last-of-type) {
      margin-right: 5px;
    }

    &__event {
      display: none;
      position: absolute;
      left: 50%;
      transform-origin: center;
      transform: translateX(-50%);
      bottom: calc(100% + 16px);
      color: #fff;
      transition: transform .1s ease-in-out;
    }

    &__tick {
      width: 3px;
      height: 16px;
      background-color: #D9D9D9;
    }

    &--is-event & {
      cursor: pointer;

      &__event {
        display: block;

        &:hover {
          transform: translateX(-50%) scale(1.5);
          cursor: pointer;
        }
      }
    }

    &--is-middle & {
      &__event {
        transform: translateX(-50%) scale(1.5);
      }
    }

    &--is-week & {
      &__tick {
        height: 24px;
      }
    }
  }
}

</style>
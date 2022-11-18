<template>
  <div class='timeline'>
    <div class='timeline__wrapper'>
      <div class='timeline__wrapper__milestone'>
        <span>{{currentMilestone}}</span>
      </div>
      <div class='timeline__date-wrapper'>
        <div class='arrows'>
          <button @click='onArrowClick("left")' class='arrow arrow--left'>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="19" fill="none">
              <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9.697 1.605-8 8 8 8"/>
            </svg>
          </button>
          <button @click='onArrowClick("right")' class='arrow arrow--right'>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="19" fill="none">
              <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1.934 17.605 8-8-8-8"/>
            </svg>
          </button>
        </div>
        <div class='timeline__inside' ref='insideRef'>
          <div ref='dateRef' class='date noselect'>
            <div
              v-for='dayIndex in NB_DAYS'
              class='date__day'
              :class='
                refinedEvents.includes(dayIndex) && "date__day--is-event",
                dayIndex%7 === 0 && "date__day--is-week",
                refinedEvents.includes(dayIndex) && `date__day--c-${removeAccents(EVENTS[refinedEvents.indexOf(dayIndex)].type)}`
              '
              :key='dayIndex'
              :data-id='dayIndex'
              @click='refinedEvents.includes(dayIndex) && onPinClick(refinedEvents.indexOf(dayIndex))'
            >
              <span class='date__day__tick noselect'/>
              <div class='date__day__event noselect'>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" fill="none">
                  <path fill="#fff" fill-rule="evenodd" d="M8.316 10.631c-1.902 1.825-4.98 1.825-6.883 0-1.758-1.687-1.92-4.379-.368-6.249L4.586.136a.375.375 0 0 1 .577 0l3.522 4.246c1.551 1.87 1.39 4.562-.369 6.25Z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <!-- <span class='timeline__mid-tick'/> -->
      </div>
    </div>
  </div>
</template>

<script setup>

import gsap, { Draggable } from 'gsap/all';
import CustomEase from 'gsap/CustomEase';
import { useDebounceFn, useThrottleFn } from '@vueuse/core';
import { MONTHS } from '../constants/dates';
import { EVENTS } from '../constants/events';
import { removeAccents } from '../utils/typo';

import {Howl, Howler} from 'howler';
import { scrollSound , longswooshSound, shortswooshSound, VoxSound } from './Soundsystem';



// const EVENTS = [
//   {date: '2020/2/16', type: 'santé'},
//   {date: '2020/2/30', type: 'technologie'},
//   {date: '2020/4/30', type: 'social'},
//   {date: '2020/5/10', type: 'santé'},
//   {date: '2020/6/16', type: 'santé'},
//   {date: '2020/7/16', type: 'santé'},
//   {date: '2020/8/16', type: 'santé'},
// ]
const NB_YEARS = 2;
const NB_DAYS = NB_YEARS * 12 * 30.5 +30 +21;

const isViewDetail = useDetailView();
const currentEvent = useCurrentEvent();
const insideRef = ref(null);
const dateRef = ref(null);
const offsetX = ref(0);
const ticksRef = ref([]);
let ticksEvents = [];
const refinedEvents = ref([]);
let dragObject = null;
const isMoving = ref(false);
let currentSelectedEvent = null;
const currentMilestone = ref(null);
let currentTickIndex = 0;
const dateStartDiff = 26;

const emit = defineEmits(['nextPoi'])


onMounted(() => {
  refinedEvents.value = EVENTS.sort((a, b) => new Date(a.date) - new Date(b.date)).map(event => getDateDiff(event.date));
  ticksRef.value = dateRef.value.children;
  ticksEvents = [...ticksRef.value].filter((_, i) => refinedEvents.value.includes(i));
  currentMilestone.value = buildDate(dateStartDiff + 1);

  window.addEventListener('resize', setTicksOpacity);
  setTicksOpacity();

  dragObject = Draggable.create(dateRef.value, {
    type:"x",
    inertia: true,
    maxDuration: 1.2,
    minDuration: 0,
    bounds: {minX: -dateRef.value.offsetWidth + insideRef.value.offsetWidth, maxX: 0},
    edgeResistance: 0.75,
    dragResistance: 0.4,
    zIndexBoost: false,
    snap: {
      x: [...Array(NB_DAYS).fill(0).map((_, index) => -13 * index + 10)]
    },
    onThrowUpdate: function() {
      onSliderUpdate(this.x);
    },
    onMove: function() {
      onSliderUpdate(this.x);
    },
  });
});

const buildDate = (number) => {
  const builtDate = new Date(2020, 0, number - dateStartDiff);
  return `${builtDate.getDate()} ${MONTHS[builtDate.getMonth()]} ${builtDate.getFullYear()}`;
}

const setTicksOpacity = () => {
  const wrapperWidth = insideRef?.value?.offsetWidth || 0;
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


      const isMiddleTick = i === baseIndex + Math.floor(ticksInView/2) + 1;
      if (isMiddleTick) {
        tickRef.classList.add('date__day--is-middle');
        if (currentTickIndex != i) {
          currentTickIndex = i;
          throttleTickSound();
        }
      } else {
        tickRef.classList.remove('date__day--is-middle');
      }
    }
  }
}

const getDateDiff = (date) => {
  const nativeDate = new Date(date);
  const nativeBaseDate = new Date(2020, 0, -dateStartDiff);
  const diffTime = Math.abs(nativeBaseDate - nativeDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

const onSliderUpdate = (offset) => {
  offsetX.value = offset;
  const midTick = [...ticksRef.value].find(tick => [...tick.classList].includes('date__day--is-middle'));
  const midTickIndex = Number(midTick.getAttribute('data-id'));
  currentMilestone.value = buildDate(midTickIndex);
  setTicksOpacity();
  setPlanetRotationDebounce();
}

const setPlanetRotation = (index) => {
  emit('nextPoi', EVENTS[index]);
  currentEvent.value = EVENTS[index];
  isViewDetail.value = true;
};

const setPlanetRotationDebounce = useDebounceFn(() => {
  const middleEvent = [...ticksRef.value].find(tick => [...tick.classList].includes('date__day--is-event') && [...tick.classList].includes('date__day--is-middle'));
  if (!middleEvent) {
    return;
  }

  const middleEventIndex = Number(middleEvent.getAttribute('data-id'));
  const eventIndex = [...refinedEvents.value].indexOf(middleEventIndex);
  if (eventIndex !== currentSelectedEvent) {
    setPlanetRotation(eventIndex);
    currentSelectedEvent = eventIndex;
  }
}, 100);

const getClosest = (target, selection, direction) => {
  selection = direction === 'left' ? selection.filter(n => n < target) : selection.filter(n => n > target + 12);
  selection = selection.length === 0 ? [-1000] : selection

  return selection.reduce((prev, curr) => (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev));
}

const onPinClick = (eventIndex) => {
  const wrapperWidth = insideRef?.value?.offsetWidth || 0;
  const eventPos = ticksEvents[eventIndex]?.offsetLeft - wrapperWidth/2;
  const positionToGo = -eventPos + 7;
  goToEvent(positionToGo);
}

const onArrowClick = (direction) => {
  const wrapperWidth = insideRef?.value?.offsetWidth || 0;
  const sliderOffsetX = -offsetX.value;
  const nearestEventPos = getClosest(sliderOffsetX, ticksEvents.map(event => event.offsetLeft - wrapperWidth/2), direction);
  const positionToGo = -nearestEventPos + 7;
  goToEvent(positionToGo);
}

const goToEvent = (positionToGo) => {
  const distance = Math.abs(positionToGo - dragObject[0].x);
  let duration = (distance / 100) * 0.2;
  duration = duration < 0.7 ? 0.7 : duration;
  duration = duration > 1.1 ? 1.1 : duration;

  if (positionToGo < 0 && positionToGo > -dateRef.value.offsetWidth + insideRef.value.offsetWidth && !isMoving.value && positionToGo !== dragObject[0].x) {
    isMoving.value = true;
    gsap.fromTo(dragObject[0].target, {x: dragObject[0].x}, {
      x: positionToGo,
      duration: duration,
      ease: CustomEase.create('cubic', '0.45, 0, 0.3, 1'),
      onUpdate: function() {
        if (this.progress() !== 1) {
          const progress = dragObject[0].x + ((positionToGo - dragObject[0].x) * this.ratio);
          onSliderUpdate(progress);
          dragObject[0].update();
        }
      },
      onComplete: function() {
        dragObject[0].update();
        isMoving.value = false;
        if(!shortswooshSound.play()){
          shortswooshSound.play();
            }
      },
      onInterrupt: function() {
        dragObject[0].update();
        isMoving.value = false;
        shortswooshSound.play();
        if(shortswooshSound.play()){
          shortswooshSound.fade(0.6, 0, 200);
            }
      }
    });
  }
}

const throttleTickSound = useThrottleFn(() => {
  scrollSound.play();
}, 50)


</script>

<style lang="scss">
@use '../assets/styles/variables.scss' as *;

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
  z-index: 105;
  top: 64px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 793px;
  padding: 0 20px;

  &__wrapper {
    position: relative;
    width: 100%;

    &__milestone {
      text-align: center;
      margin-bottom: 12px;

      > span {
        color: #FFFFFF;
        display: inline-block;
        margin-left: 6px;
        font-size: 16px;
      }
    }
  }

  &__date-wrapper {
    position: relative;
    padding: 0 40px;
  }

  &__inside {
    position: relative;
    overflow-x: hidden;
    display: flex;
    margin: 0 auto;
    width: 100%;
  }

  // &__mid-tick {
  //   position: absolute;
  //   z-index: 2;
  //   left: 50%;
  //   bottom: 0;
  //   transform: translateX(-50%);
  //   width: 3px;
  //   height: 40px;
  //   background-color: #D9D9D9;
  // }
}

.arrows {
  .arrow {
    position: absolute;
    top: 20px;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    transition: opacity .2s ease-in-out;
    opacity: 0.5;
    padding: 6px;

    &:hover {
      opacity: 1;
    }

    &--left {
      left: 0;
    }

    &--right {
      right: 0;
    }

    svg {
      display: block;
    }
  }
  }

.date {
  position: relative;
  box-sizing: content-box;
  flex: 1;
  display: flex;
  align-items: center;
  height: 40px;
  padding-bottom: 40px;

  &__day {
    position: relative;
    display: flex;
    flex-direction: column;

    @each $color-label, $degrees in $colors {
      &--c-#{$color-label} {
        @each $degree-label, $degree in $degrees {
          --color-#{$degree-label}: #{$degree};
        }
      }
    }

    &:not(:first-of-type) {
      padding-left: 5px;
    }

    &:not(:last-of-type) {
      padding-right: 5px;
    }

    &__event {
      display: none;
      position: absolute;
      left: 50%;
      transform-origin: center;
      transform: translateX(-50%);
      padding-top: 16px;
      top: 100%;
      color: #fff;
      transition: transform .15s cubic-bezier(0.35, 0, 0.45, 1);
    }

    &__tick {
      width: 3px;
      height: 16px;
      background-color: #D9D9D9;
      transition: height .1s ease-out;
      border-radius: 9999px;
    }

    &--is-event {
      cursor: pointer;

      &:hover {
        opacity: 1 !important;

        .date__day__event {
          transform: translateX(-50%) scale(1.5);
        }

        .date__day__tick {
          height: 40px;
        }
      }
    }

    &--is-event & {
      &__event {
        cursor: pointer;
        display: block;

        > svg {
          display: block;

          > path {
            fill: var(--color-primary);
          }
        }
      }

      &__tick {
        background-color: var(--color-primary);
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

    &--is-middle & {
      &__tick {
        height: 40px;
      }
    }
  }
}

</style>
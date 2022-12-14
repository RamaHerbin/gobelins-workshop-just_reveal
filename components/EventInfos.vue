<template>
  <div class='wrapper'>
    <div :class="['event-infos', scoppedEvent?.type && `event-infos--c-${removeAccents(scoppedEvent?.type)}`]">
      <div v-if='isViewDetail'>
        <header>
          <span class='event-infos__tag'>{{scoppedEvent?.type}}</span>
          <h2 class='event-infos__title'>{{scoppedEvent?.country}}</h2>
          <time class='event-infos__date'>{{scoppedEvent && getFormattedDate(new Date(scoppedEvent?.date))}}</time>
        </header>
        <p class='event-infos__description'>{{scoppedEvent?.description}}</p>
        <a class='event-infos__source' :href='scoppedEvent && getFormattedLink(scoppedEvent?.source)' target='_blank'>
          <span>Source</span>
          <IconsExternalLink/>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>

import { removeAccents } from '../utils/typo';
import gsap from 'gsap/all';
import CustomEase from 'gsap/CustomEase';
import { shortswooshSound, animalSound, VoxSound1, VoxSound2, VoxSound3 } from './Soundsystem';
// import { EVENTS } from '~~/constants';

const currentEvent = useCurrentEvent();
const random = useRandom();
const isViewDetail = useDetailView();
const scoppedEvent = ref(undefined);

watch(
  () => isViewDetail.value,
  (data, prevData) => {
    data ? animIn() : animOut()
  }
);

watch(
  () => currentEvent.value,
  (curr, prev) => {
    gsap.fromTo('.event-infos', 
      {y: 0, opacity: 1}, 
      {
        y: 20,
        opacity: 0,
        duration: 0.3,
        ease: CustomEase.create('cubic', '0.4, 0, 0, 1'),
        onComplete: () => {
          scoppedEvent.value = curr;
          gsap.fromTo('.event-infos', 
            {y: 20, opacity: 0}, 
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: CustomEase.create('cubic', '0.4, 0, 0, 1')
            }
          );

          let randomSound = 0
          while (random.value === randomSound) {
            randomSound = Math.floor(Math.random() * 3);
          }

          random.value = randomSound

          VoxSound1.stop();
          VoxSound2.stop();
          VoxSound3.stop();

          switch (randomSound) {
            case 0:
              VoxSound1.play();
              break;

            case 1:
              VoxSound2.play();
              break;

            case 2:
              VoxSound3.play();
              break;

            default:
              VoxSound1.play();
              break;
          }

          // if (VoxSound.play()) {
          //   VoxSound.stop();
          // };


          // const sound = VoxSound.play();
          // VoxSound.play(sound);

        }
      }
    );
  }
);

const animIn = () => {
  gsap.fromTo('.event-infos', {x: 40, opacity: 0}, {x: 0, opacity: 1, duration: 0.8});
}

const animOut = () => {
  gsap.fromTo('.event-infos', {x: 0, opacity: 1}, {x: 40, opacity: 0, duration: 0.8});
}

const getFormattedDate = (date) => {
  const addLeadingZero = s => String(s).length <= 1 ? `0${s}` : s;
  return `${addLeadingZero(date.getDate())}.${addLeadingZero(date.getMonth() + 1)}.${date.getFullYear()}`;
}

const getFormattedLink = (link) => {
  const splitLink = link.split(' ');
  return splitLink[splitLink.length - 1];
}

</script>

<style lang="scss">

@use '../assets/styles/variables.scss' as *;

.wrapper {
  position: absolute;
  overflow: hidden;
  z-index: 99;
  left: 50%;
  top: 0;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1200px;
  background-color: transparent;
  pointer-events: none;
}



.event-infos {
  pointer-events: all;
  position: absolute;
  right: 0;
  top: 30%;
  color: #FFFFFF;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  max-width: 495px;
  opacity: 0;

  &.active {
    opacity: 1;
  }

  @each $color-label, $degrees in $colors {
    &--c-#{$color-label} {
      @each $degree-label, $degree in $degrees {
        --color-#{$degree-label}: #{$degree};
      }
    }
  }

  header {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: -20px;
      top: 0;
      width: 4px;
      height: 100%;
      border-radius: 9999px;
      transform-origin: top;
      background-color: var(--color-primary);
    }
  }

  &__tag {
    text-transform: uppercase;
    font-weight: 800;
    font-size: 14px;
    letter-spacing: 0.5px;
    color: var(--color-primary);
  }

  &__time {
    font-size: 18px;
  }

  &__description {
    margin-top: 12px;
  }

  &__source {
    margin-top: 12px;
    display: flex;
    align-items: center;
    column-gap: 8px;
    text-decoration: none;

    > span {
      font-size: 14px;
      text-transform: uppercase;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: #FFFFFF;
      }
    }

    > svg {
      transform: scale(1.1);
    }
  }
}



@media (max-width: 900px) {
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .event-infos {
    position: relative;
    top: unset;
    // right: 50%;
    bottom: 4%;
  }
}

@media (max-width: 700px) {
  .event-infos {
    padding-left: 30px;
  }
}



</style>

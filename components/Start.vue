<template>
  <div class='start' ref='divRef'>
    <div class='start__title'>
      <h1>
        <span class='hide-span'>Good news around the world</span>
      </h1>
      <span class='start__title__subtitle'>2020 — 2022</span>
    </div>
    <div class='start__cta'>
      <button>
        <span>Commencer l'expérience</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="18" fill="none">
          <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1.813 1.406 17 16.594 32.188 1.406"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>

import gsap, { Draggable } from 'gsap/all';
import { InertiaPlugin } from 'gsap/InertiaPlugin.js';

const emit = defineEmits(['onHideStart']);

let dragObject = null;
let divRef = ref(null);

onMounted(() => {
  setTimeout(() => {
    gsap.to('.hide-span', {
      y: 0,
      duration: 1.4,
      ease: 'power4.out',
    });
  }, 6600);

  dragObject = Draggable.create(divRef.value, {
    type:"y",
    inertia: true,
    bounds: {minX: 0},
    edgeResistance: 1,
    dragResistance: 0.6,
    zIndexBoost: false,
    maxDuration: 1,
    minDuration: 1,
    snap: {
      y: [0]
    },
    onDragEnd: function() {
      if (InertiaPlugin.getVelocity(this.target, "y") < -600) {
        this.disable();
        gsap.to(this.target, {
          y: -window.innerHeight * 2,
          opacity: 0,
          duration: 1.6,
          ease: 'power1.out',
          onComplete: () => {
            this.kill();
            emit('onHideStart')
          }
        })
      }
    },
    onClick: function() {
      gsap.to(this.target, {
        y: -40,
        duration: .4,
        ease: 'power3.out',
        onComplete: () => {
          gsap.to(this.target, {
            y: 0,
            duration: .7,
            ease: 'power1.inOut'
          })
        }
      })
    }
  });
});

</script>

<style lang="scss">

.start {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: #FFFFFF;
  padding: 0 32px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 300vh;
    background: linear-gradient(180deg, rgba(5, 15, 52, 0.8) 0%, rgba(5, 15, 52, 0.24) 100%);
    // backdrop-filter: blur(15px);
    pointer-events: none;
  }

  &__title {
    position: relative;
    text-align: center;
    padding: 0 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;

    h1 {
      --line-height: 70px;
      position: relative;
      display: inline-block;
      font-size: clamp(44px, 7vw, 65px);
      text-transform: uppercase;
      line-height: var(--line-height);
      font-family: 'Newyork';
      font-weight: 400;
      margin: 0;
      padding: 0 33px;
      overflow: hidden;

      > span {
        display: block;
        transform: translateY(100%);
      }

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: calc(var(--line-height) / 2);
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        background-color: #FFFFFF;
        border-radius: 9999px;
      }

      &::before {
        left: 0;
      }

      &::after {
        right: 0;
      }

      @media screen and (max-width: 1000px) {
        &::before,
        &::after {
          display: none;
        }
      }
    }

    &__subtitle {
      position: absolute;
      top: calc(100% + 44px);
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &__cta {
    position: absolute;
    bottom: 48px;
    left: 50%;
    transform: translateX(-50%);

    > button {
      display: flex;
      flex-direction: column;
      align-items: center;

      > svg {
        display: block;
        margin-top: 24px;
      }
    }
  }
}

</style>
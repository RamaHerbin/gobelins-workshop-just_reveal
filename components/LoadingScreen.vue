<template>
  <div class='loading'>
    <h1>
      <div>
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
      <div>
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
    </h1>
  </div>
</template>

<script setup>

import gsap from 'gsap/all';
const emit = defineEmits(['onHideLoading']);

onMounted(() => {
  setTimeout(() => {
    gsap.to('.loading', {
      scale: 1.4,
      duration: 1.4,
      ease: 'power1.out'
    });
    gsap.to('.loading', {
      opacity: 0,
      duration: 1,
      delay: 0.4,
      ease: 'power1.out',
      onComplete: () => {
        emit('onHideLoading');
      }
    });
  }, 5200);
});

</script>

<style lang="scss">

.loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #111;
  z-index: 99999;

  h1 {
    position: absolute;
    left: 50%;
    top: 70%;
    transform: translate(-50%, -50%);
    color: #FFFFFF;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 80px;

    > div {
      > span {
        display: inline-block;
        margin: 0 4px;
        animation-name: goUp;
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
        animation-timing-function: cubic-bezier(0.4, 0, 0, 1);

        @for $i from 1 through 7 {
          &:nth-of-type(#{$i}) {
            $time: calc($i / 20);
            animation-delay: #{$time}s;
          }
        }
      }
    }
  }

  @keyframes goUp {
    0% {
      transform: translate3d(0, 0, 0);
    } 40% {
      transform: translate3d(0, -80px, 0);
    } 100% {
      transform: translate3d(0, -80px, 0);
    }
  }
}

@media (max-width: 1000px) {
  .loading h1 {
   font-size: 1.5rem;
  }
}

</style>

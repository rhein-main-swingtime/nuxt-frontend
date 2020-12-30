<template>
  <nav name="mobile-nav-container" :class="renderedClassObject">
    <!-- <div class="w-full h-full top-0 left-0 absolute z-0 bg-gray-700 opacity-95" /> -->
      <slot />
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

const defaultClasses = {
    'animated-faster': true,
    'bottom-0': true,
    'flex-col': true,
    'flex-wrap': true,
    'font-serif': true,
    'left-0': true,
    'p-4': true,
    'pb-16': true,
    'px-6': true,
    'right-0': true,
    'w-screen': true,
    'z-20': true,
    'sm:w-auto': true,
    'sm:h-auto': true,
    'sm:left-auto': true,
    'sm:right-auto': true,
    'sm:mx-7': true,
    // 'h-screen': true
    // 'justify-end': true,
    // 'overflow-hidden': true
    fixed: true,
    flex: true
}

@Component
export default class MobileNavigationContainer extends Vue {
  @Prop() elementClass!: Object

  get renderedClassObject () {
      return Object.assign(defaultClasses, this.elementClass)
  }

  get slotNotEmpy () {
      return !!this.$slots.default
  }
}
</script>

<style lang="scss" scoped>
.animated-faster {
  // animation-duration: 175ms;
}
nav {
  animation-delay: 200ms;
  // max-width: 540px;
  // backdrop-filter: blur(10px);
}
</style>

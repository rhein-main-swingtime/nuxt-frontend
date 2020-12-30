<template>
  <nav name="mobile-nav-container" :class="renderedClassObject">
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
    'md:h-screen': true,
    'md:pb-0': true,
    'md:w-screen': true,
    'md:m-0': true,
    'md:p-0': true,
    'md:top-0': true,
    'md:bottom-0': true,
    'md:grid': true,
    'md:grid-cols-auto': true,
    'md:place-content-center': true,
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

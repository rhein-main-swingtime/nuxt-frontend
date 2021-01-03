<template>
  <nav name="mobile-nav-container" :class="renderedClassObject">
    <slot />
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

const defaultClasses = {
    'bottom-0': true,
    'fixed': true,
    'grid-cols-1': true,
    'grid-rows-1': true,
    'grid': true,
    'h-auto': true,
    'left-0': true,
    'sm:h-screen': true,
    'sm:px-0': true,
    'w-screen': true,
    'z-20': true,
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

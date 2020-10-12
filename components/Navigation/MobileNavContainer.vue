<template>
    <nav :class="renderedClassObject">
      <div class="w-full h-full top-0 left-0 absolute z-0 bg-gray-700 opacity-95" />
      <div class="relative z-10">
        <slot />
      </div>
    </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

const defaultClasses = {
    'font-serif': true,
    'h-screen': true,
    'w-screen': true,
    fixed: true,
    'top-0': true,
    'z-20': true,
    flex: true,
    'flex-col': true,
    'flex-wrap': true,
    'justify-end': true,
    'p-4': true,
    'pb-20': true,
    'animated-faster': true
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
  backdrop-filter: blur(10px);
}
</style>

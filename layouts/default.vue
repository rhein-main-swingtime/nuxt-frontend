<template>
  <div id="app-container" class=" text-white antialiased font-serif flex w-full flex-wrap sm:py-16 sm:px-12 max-w-screen-xl">
    <page-header />
    <section id="main-content" class="flex w-full py-3 px-3">
      <Nuxt keep-alive :keep-alive-props="{ include: ['DanceEventsPage'] }" />
    </section>
    <navigation-trigger />

    <transition
      name="fade"
      enter-active-class="fadeInLeft"
      leave-active-class="fadeOutRight"
    >
      <mobile-nav-container v-if="pageNavActive">
        <mobile-page-navigation />
      </mobile-nav-container>
    </transition>

    <transition
      name="fade"
      enter-active-class="fadeInLeft"
      leave-active-class="fadeOutRight"
    >
      <mobile-nav-container v-if="filterNavActive">
        <mobile-filter-navigation />
      </mobile-nav-container>
    </transition>
  </div>
</template>

<style lang="scss">
body {
  background-color: theme('colors.gray.800'),
}
a {
  text-decoration: underline;
  text-decoration-color: theme('colors.teal.500');
  transition: text-decoration-color 135ms;
  &:hover {
    text-decoration-color: theme('colors.teal.400');
  }
}
</style>

<script lang="ts">
import { Component, Vue, getModule } from 'nuxt-property-decorator'
import PageNavModule from '../store/modules/PageNavModule'

@Component
export default class DefaultPageLayout extends Vue {
  PageNavModuleInstance: PageNavModule = getModule(PageNavModule, this.$store)

  get pageNavActive () {
      return this.PageNavModuleInstance.activeNav === 'PageNav'
  }

  get filterNavActive () {
      return this.$route.name?.includes('dance') &&
        this.PageNavModuleInstance.activeNav === 'FilterNav'
  }
}
</script>

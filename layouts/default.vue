<template>
  <div id="app-container" class=" text-white antialiased font-serif flex w-full flex-wrap max-w-screen-xl">
    <page-header />
    <section id="main-content" class="flex w-full py-3 px-3">
      <Nuxt keep-alive :keep-alive-props="{ include: ['DanceEventsPage'] }" />
    </section>

    <transition
      name="fade"
      enter-active-class="fadeInUp"
      leave-active-class="fadeOutDown"
    >
      <navigation-trigger
        v-if="!pageNavActive"
        activate-nav="pageNav"
        title="Menu"
        title-background="M"
        :style-classes="{'bg-teal-600': true, 'focus:bg-teal-700': true, 'active:bg-teal-700': true, 'lg:hidden': true}"
      />
    </transition>

    <transition
      name="fadeIn"
      enter-active-class="fadeIn"
      leave-active-class="fadeOut"
    >
      <div
        v-if="pageNavActive"
        id="mobile-nav-middle-layer"
        class="z-10 fixed top-0 left-0 h-screen w-screen"
      >
        <div class="bg-black opacity-70 absolute top-0 left-0 h-full w-full" />
      </div>
    </transition>
    <transition
      name="fade"
      enter-active-class="fadeInUp"
      leave-active-class="fadeOutDown"
    >
      <mobile-nav-container v-if="pageNavActive">
        <mobile-page-navigation />
      </mobile-nav-container>
    </transition>

    <!-- <transition
      name="fade"
      enter-active-class="fadeInUp"
      leave-active-class="fadeOutDown"
    >
    </transition> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, getModule, Watch } from 'nuxt-property-decorator'
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

  @Watch('pageNavActive')
  onPageNavChange (status: boolean) {
      if (status) {
          document.body.classList.add('overflow-hidden')
      } else {
          document.body.classList.remove('overflow-hidden')
      }
  }
}
</script>

<style lang="scss">
body {
  background-color: theme('colors.gray.900'),
}
a {
  text-decoration: underline;
  text-decoration-color: theme('colors.teal.500');
  transition: text-decoration-color 135ms;
  &:hover {
    text-decoration-color: theme('colors.teal.400');
  }
}
.shadow-hard {
  box-shadow: 4px 4px rgba(255,255,255,0.50196);
}

.rms-rotate-in-up-enter-active,
.rms-rotate-in-up-leave-active {
  transition-duration: 30s;
}
.rms-rotate-in-up-enter-active {
  animation: rms-rotate-in-up;
}
.rms-rotate-in-up-leave-active {
  animation: rms-rotate-in-up reverse;
}
@keyframes rms-rotate-in-up {
  0% {
    transform: rotate(180deg) translateY(-4rem);
    transform-origin: center;
    opacity: .2;
  }
  100% {
      transform: rotate(0deg) translateY(0);
      transform-origin: center;
      opacity: 1;
  }
}

</style>

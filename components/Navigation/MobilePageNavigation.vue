<template>
  <div
    id="page-nav-overlay"
    class="
      max-w-screen-sm
      w-full
      px-4
      flex
      flex-col
      sm:place-self-center
      place-self-end
      text-white
      "
      >
    <section v-for="(items, key) in NavigationItems" :key="key" class="pb-5 flex lg:hidden" :class="sectionClassBySection(key)">
      <nuxt-link
        v-for="(element, idx) in items"
        :key="'page-link-'+idx"
        :to="localePath(element.nav)"
        class="font-thin relative rounded-lg
           border-teal-300 place-content-center"
        :class="itemClassBySection(key)"
        :title="$t(element.translation)"
        @click.native="closeNavOverlay()"
      >
        <span class="relative">{{ $t(element.translation) }}</span>
      </nuxt-link>
    </section>
    <section class="flex flex-col sm:fixed bottom-3 left-5 right-6 items-center">
      <a
        class="close-bttn inline-block text-4xl font-thin text-center relative rounded-lg border
        border-4 border-red-800 px-4 py-2 inline-block bg-red-600 relative max-w-screen-sm w-full"
        :title="$t('nav-overlay-close')"
        @click.prevent="closeNavOverlay()"
      >
        {{ $t('nav-overlay-close') }}
      </a>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, getModule } from 'nuxt-property-decorator'
import NavigationItems from '../../navigation/NavigationItems'
import PageNavModule from '../../store/modules/PageNavModule'

@Component
export default class PageNav extends Vue {
  PageNavStoreInstance: PageNavModule = getModule(PageNavModule, this.$store)

  NavigationItems = NavigationItems

  itemClassBySection (sectionName: string): Array<String> {
      if (sectionName === 'big') {
          return ['text-4xl', 'py-2', 'text-center', 'border', 'border-4', ' mb-3', 'px-2', 'sm:text-5xl', 'sm:py-4']
      }
      if (sectionName === 'major') {
          return ['text-2xl', 'py-1', 'text-center', 'border', 'border-4', 'px-4', 'sm:text-3xl', 'sm:py-4']
      }
      return ['text-lg', 'py-1', 'inline', 'mr-2', 'sm:text-2xl']
  }

  sectionClassBySection (sectionName: string): Array<String> {
      if (sectionName === 'big') {
          return ['flex-col']
      }

      if (sectionName === 'major') {
          return ['grid', 'grid-cols-2', 'gap-4']
      }
      return ['flex-row', 'flex-wrap']
  }

  get isActive () {
      return this.PageNavStoreInstance.activeNav === 'PageNav'
  }

  closeNavOverlay () {
      console.log('test')
      this.PageNavStoreInstance.SET_ActiveNav(null)
  }

  beforeRouteLeave () {
      this.PageNavStoreInstance.SET_ActiveNav(null)
  }
}
</script>

<style lang="scss">
    #page-nav-overlay .close-bttn {
      text-decoration: none;
      &::before {
        text-decoration: none;
        content: attr(title);
        @apply absolute;
        @apply bottom-0;
        @apply left-0;
        @apply inline-block;
        @apply text-white;
        @apply font-bold;
        @apply text-6xl;
        @apply opacity-20;
        @apply w-full;
        @apply text-center;
      }
}
</style>

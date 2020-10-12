<template>
  <div>
    <section key="pages" class="w-full pb-5">
      <page-navigation-major />
    </section>
    <section key="minor-pages">
      <page-navigation-minor />
    </section>
    <div />
  </div>
</template>

<script lang="ts">
import { Component, Vue, getModule } from 'nuxt-property-decorator'
import PageNavModule from '../../store/modules/PageNavModule'

@Component
export default class PageNav extends Vue {
  PageNavStoreInstance: PageNavModule = getModule(PageNavModule, this.$store)

  get isActive () {
      return this.PageNavStoreInstance.activeNav === 'PageNav'
  }
}
</script>

<style lang="scss" scoped>

#burger-nav {
    &>section {
      position: relative;
      z-index: 10;
    }
}
</style>

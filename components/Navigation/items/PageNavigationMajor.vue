<template>
  <ul>
    <li
      v-for="(link, index) in links"
      :key="'major-nav-item-' + index"
      class="text-3xl text-right"
    >
      <nuxt-link :to="localePath(link.nav)">
        {{ $t(link.translation) }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, getModule, Watch } from 'nuxt-property-decorator'
import PageNavModule from '../../../store/modules/PageNavModule'
import Major from '../../../navigation/major'

@Component
export default class PageNavMajor extends Vue {
  PageNavStoreInstance: PageNavModule = getModule(PageNavModule, this.$store)

  links = Major

  @Watch('$route')
  handleNav () {
      this.PageNavStoreInstance.SET_ActiveNav(null)
  }
}
</script>

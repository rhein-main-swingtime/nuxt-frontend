<template>
  <ul>
    <li
      v-for="(link, index) in links"
      :key="'minor-nav-item-' + index"
      class="text-xl text-right"
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
import minor from '../../../navigation/minor'

@Component
export default class PageNavMinor extends Vue {
  PageNavStoreInstance: PageNavModule = getModule(PageNavModule, this.$store)

  links = minor

  @Watch('$route')
  handleNav () {
      this.PageNavStoreInstance.SET_ActiveNav(null)
  }
}
</script>

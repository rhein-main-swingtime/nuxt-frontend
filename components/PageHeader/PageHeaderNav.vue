<template>
  <nav id="header-nav">
    <nuxt-link
      v-for="(link, index) in links"
      :key="'major-nav-item-' + index"
      :to="localePath(link.nav)"
      class="inline-block px-2"
    >
      {{ $t(link.translation) }}
    </nuxt-link>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Major from '../../navigation/major'

@Component
export default class PageNav extends Vue {
  links = Major.filter(e => e.nav.name !== 'index') // Removes home
}
</script>

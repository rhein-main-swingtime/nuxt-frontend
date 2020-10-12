<template>
  <dance-events-filter />
</template>

<script lang="ts">
import { Component, Vue, getModule } from 'nuxt-property-decorator'
import PageNavModule from '../../store/modules/PageNavModule'
import DanceEventsFilter from '../DanceEvents/DanceEventsFilter.vue'

@Component
export default class MobileFilterNav extends Vue {
  PageNavStoreInstance: PageNavModule = getModule(PageNavModule, this.$store)
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <div class="grid gap-4 grid-cols-12 w-full">
    <div class="col-span-12 lg:col-span-9">
      <dance-events-list />
    </div>
    <div id="dance-page-filter" class="hidden lg:col-span-3 lg:block">
      <DanceEventsFilter class="sticky top-0" :title="$t('page-dance-events-filter')" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, getModule, Prop, Vue, Watch } from 'nuxt-property-decorator'
import DanceEventsModule from '../store/modules/DanceEventsModule'

@Component
export default class DanceEventsPage extends Vue {
    DanceEventsStoreInstance: DanceEventsModule = getModule(DanceEventsModule, this.$store)

    get eventsApiQuery () {
        return this.DanceEventsStoreInstance.routeQuery
    }

    @Watch('eventsApiQuery')
    fetchEvents (queryVal: string | null) {
        if (queryVal === null) {
            return
        }
        history.replaceState(
            {
                search: this.eventsApiQuery
            },
            document.title,
            document.location.protocol + '//' +
            document.location.host +
            document.location.pathname +
            this.eventsApiQuery
        )

        this.DanceEventsStoreInstance.fetchEvents(
            { host: this.$config.apiHost, search: queryVal, skip: 0 }
        )
        this.$scrollTo('#main-content')
    }
}
</script>

<style scoped>
  .container {
  }
</style>

<template>
  <div class="grid gap-4 grid-cols-12 w-full">
    <div class="col-span-12 lg:col-span-9">
      <!-- <v-calendar
        :min-date="calendarMinDate"
        :max-date="calendarMaxDate"
        :theme-styles="calendarStyles"
        @update:from-page="handeCalendarNav"
      > -->
        <!-- <template v-slot:day-content="{ day }" ma>
          <div class="flex flex-col h-full z-10 overflow-hidden">
            <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
            <div class="flex-grow overflow-y-auto overflow-x-auto h-14" />
          </div>
        </template> -->
      <!-- </v-calendar> -->
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
    calendarMinDate = new Date()
    calendarMaxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)) // One Year from today
    calendarStyles = {
        wrapper: {
            background: 'linear-gradient(to bottom right, #ff5050, #ff66b3)',
            color: '#fafafa',
            border: '0',
            borderRadius: '5px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.14), 0 6px 20px 0 rgba(0, 0, 0, 0.13)'
        }
    }

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
            { host: this.$config.apiHost, skip: 0 }
        )
        this.$scrollTo('#main-content')
    }

    mounted () {
        this.DanceEventsStoreInstance.fetchEvents(
            { host: this.$config.apiHost, skip: 0 }
        )
    }

}
</script>

<style scoped>
  .container {
  }
</style>

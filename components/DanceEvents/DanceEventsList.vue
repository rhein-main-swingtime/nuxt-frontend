<template>
  <section class="w-auto block">
    <div class="flex flex-col flex-wrap relative">
      <div v-for="(events, date) in dates" :key="date" class="date">
        <div class="border border-gray-300 rounded-l-none inline-block px-3 py-1 rounded-r-full mt-5 sticky top-0 overflow-hidden shadow-sm text-lg">
          <div class="absolute w-full h-full top-0 left-0 bottom-0 bg-gray-800 opacity-75 z-0" />
          <span class="relative z-10">
            {{ dateLocalized(date) }}
          </span>
        </div>
        <DanceEventItem
          v-for="id in events"
          :id="id"
          :key="id"
          :city="danceEvents[id].city"
          :calendar="danceEvents[id].calendar"
          :category="danceEvents[id].category"
          :summary="danceEvents[id].summary"
          :description="danceEvents[id].description"
          :location="danceEvents[id].location"
          :start-date-time="danceEvents[id].startDateTime"
          :end-date-time="danceEvents[id].endDateTime"
        />
      </div>
      <div v-if="isLoading" class="absolute top-0 left-0 w-full h-full z-10">
        <div class="bg-gray-700 opacity-75 absolute top-0 left-0 w-full h-full z-0" />
        <loader-infinity class="sticky-in-center z-10" />
      </div>
    </div>

    <div v-if="noEventsAvailable">
      Sorry, nothing found :-/
    </div>

    <infinite-loading v-if="moreEventsAvailable" @infinite="infiniteHandler">
      <div slot="spinner">
        {{ $t('page-dance-events-list-loading') }}
      </div>
    </infinite-loading>
  </section>
</template>

<script lang="ts">
import { Component, getModule, Vue, Watch } from 'nuxt-property-decorator'
import _ from 'lodash'
import DanceEventsModule from '../../store/modules/DanceEventsModule'

@Component
export default class DanceEventsList extends Vue {
    DanceEventsStoreInstance: DanceEventsModule = getModule(DanceEventsModule, this.$store)

    sizeOfEventList = 0

    dateLocalized (date: string): string {
        return this.$d(new Date(date), 'longDate')
    }

    get dates () {
        return this.DanceEventsStoreInstance.dates
    }

    get danceEvents () {
        return this.DanceEventsStoreInstance.danceEvents
    }

    get isLoading () {
        return this.DanceEventsStoreInstance.eventsLoading
    }

    get noEventsAvailable () {
        return this.isLoading !== true &&
            this.DanceEventsStoreInstance.danceEvents !== null &&
            _.isEmpty(this.DanceEventsStoreInstance.danceEvents)
    }

    get moreEventsAvailable () {
        return this.DanceEventsStoreInstance.moreEventsAvailable
    }

    get eventsApiQuery () {
        return this.DanceEventsStoreInstance.routeQuery ?? ''
    }

    get numberOfEvents () {
        return this.DanceEventsStoreInstance.numberOfEvents
    }

    infiniteHandler ($state: any) {
        this.DanceEventsStoreInstance.fetchEvents(
            {
                host: this.$config.apiHost,
                search: this.eventsApiQuery,
                skip: this.numberOfEvents
            }
        ).then(() => {
            $state.loaded()
        })
    }
}
</script>

<style>
  .sticky-in-center {
    position: sticky;
    top: 50vh;
    transform: translateY(-50%);
  }
</style>

<template>
  <section
    :id="getId()"
    v-observe-visibility="visibilityChanged"
    class="w-auto block dance-event-month p-3 min-h-screen"
  >
    <div class="flex flex-col relative">
      <div>
        <span class="p-1 py2 font-sans text-2xl font-bold inline-block w-auto">
          {{ dateLocalized() }}
        </span>
      </div>
      <template v-for="(events, date) in datesWithEvents">
        {{ date }}
        {{ events }}
        <!-- <DanceEventItem
          v-for="id in events"
          :id="'dance-event-' + id"
          :key="'dance-event-' + id"
          :city="danceEvents[id].city"
          :calendar="danceEvents[id].calendar"
          :category="danceEvents[id].category"
          :summary="danceEvents[id].summary"
          :description="danceEvents[id].description"
          :location="danceEvents[id].location"
          :start-date-time="danceEvents[id].startDateTime"
          :end-date-time="danceEvents[id].endDateTime"
          :data-id="id"
        /> -->
      </template>
      <!-- <template v-for="num in 10" v-else>
        <rms-card :id="'loader-' + num" :key="'loader-' + num">
          <PuSkeleton :count="5" />
        </rms-card>
      </template> -->
    </div>
  </section>
</template>

<script lang="ts">
import { Component, getModule, Prop, Vue, Watch } from 'nuxt-property-decorator'
// import { ContentLoader } from 'vue-content-loader'
// import VueSkeletonLoader from 'skeleton-loader-vue'
// import VueObserveVisibility from 'vue-observe-visibility'
import DanceEventsModule from '../../store/modules/DanceEventsModule'

@Component
export default class DanceEventsMonth extends Vue {
  @Prop({ required: true }) firstDay!: Date
  DanceEventsStoreInstance: DanceEventsModule = getModule(DanceEventsModule, this.$store)

  private getId (): string {
      return this.firstDay.getFullYear() + '_' + (this.firstDay.getMonth() + 1)
  }

  get danceEvents () {
      return this.DanceEventsStoreInstance.danceEvents
  }

  // get myEventIds (): Array<string> {
  //     if (this.DanceEventsStoreInstance.eventIdsByMonth === null) {
  //         return []
  //     }

  //     return this.DanceEventsStoreInstance.eventIdsByMonth[this.getId()]
  // }

  // get eventsLoaded () {
  //     return this.DanceEventsStoreInstance.eventIdsByMonth[this.getId()] !== undefined
  // }

  get datesWithEvents () {
      const out: {[key: string]: number[] | null} = {}
      const rollingDate = this.firstDay

      while (rollingDate.getMonth() === this.firstDay.getMonth()) {
          const key = [
              rollingDate.getFullYear(),
              rollingDate.getMonth() + 1,
              rollingDate.getDate()
          ].join('-')

          out[key] = this.DanceEventsStoreInstance._dateMap[key]
          rollingDate.setDate(rollingDate.getDate() + 1)
      }

      console.log(rollingDate)

      return out
  }

  private visibilityChanged (isVisible: boolean) {
      if (this.eventsLoaded === true || isVisible === false) {
          return
      }

      this.DanceEventsStoreInstance.fetchEventsForMonth(this.getId())
  }

  dateLocalized (): string {
      return this.$d(this.firstDay, 'shortDateMonthYear')
  }
}
</script>

<style lang="scss">
  .dance-event-month {
    // border: sol
  }
</style>

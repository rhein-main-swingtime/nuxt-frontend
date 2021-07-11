<template>
  <section class="w-auto block">
    <!-- <div class="flex flex-col relative">
      <div v-for="(events, date) in eventsByMonth" :id="'events-month-' + date" :key="date" class="date">
        <template v-if="events.length === 0">
          <rms-card v-for="idx in 10" :key="'loading-skel-' + date + '_' + idx">
            <PuSkeleton :count="5" />
          </rms-card>
        </template>
        <template v-else>
          <DanceEventItem
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
            :top-pos-observer="topPosObserver"
            :bottom-pos-observer="bottomPosObserver"
            :data-id="id"
          />
        </template>
      </div>
    </div> -->

    <div v-for="month in allMonths">
        <dance-events-month :first-day="month" />
    </div>

    <!-- <infinite-loading v-if="moreEventsAvailable" @infinite="infiniteHandler">
      <div slot="spinner">
        {{ $t('page-dance-events-list-loading') }}
      </div>
    </infinite-loading> -->
  </section>
</template>

<script lang="ts">
import { Component, getModule, Prop, Vue, Watch } from 'nuxt-property-decorator'
import _ from 'lodash'
import DanceEventsModule from '../../store/modules/DanceEventsModule'

@Component
export default class DanceEventsList extends Vue {
    DanceEventsStoreInstance: DanceEventsModule = getModule(DanceEventsModule, this.$store)
    sizeOfEventList = 0
    topPosObserver: IntersectionObserver | null = null
    bottomPosObserver: IntersectionObserver | null = null

    onItemObserved (entries: IntersectionObserverEntry[]) {
        entries.forEach((entry) => {
            if (entry.intersectionRatio > 0 && entry.target instanceof HTMLElement) {
                this.$emit('rmsevent:top-pos', this.danceEvents![parseInt(entry.target.dataset.id!)].startDateTime)
            }
        })
    }

    dateLocalized (date: string): string {
        return this.$d(new Date(date), 'longDate')
    }

    get allMonths () {
        return this.DanceEventsStoreInstance.months
    }

    @Watch('$el')
    createObserver (newEl: HTMLElement | null | undefined, oldVal: HTMLElement | null | undefined) {
        console.log(newEl, oldVal)
    }

    mounted () {
        this.topPosObserver = new IntersectionObserver(
            this.onItemObserved,
            {
                rootMargin: '-16px -500px',
                threshold: [0]
            }
        )

        /**
         * @todo:
         * - Checken ob das Ding das letzte im Monat is
         * - dazu: data attribute mit dance event id setzen
         * - helpers erweitern, zu viel mist hier unterwegs
         * - observers neu initialiseren nach window resize event
         **/

        const fuckthiscallback = function (test: any) {
            test.forEach((element) => {
                if (element.isIntersecting) {
                    console.log(element)
                }
            })
        }

        this.bottomPosObserver = new IntersectionObserver(
            fuckthiscallback,
            {
                rootMargin: window.outerHeight + 'px 0px -1px 0px',
                threshold: 0
            }
        )
    }

    // infiniteHandler ($state: any) {
    //     this.DanceEventsStoreInstance.fetchEvents(
    //         {
    //             host: this.$config.apiHost,
    //             skip: this.numberOfEvents
    //         }
    //     ).then(() => {
    //         $state.loaded()
    //     })
    // }
}
</script>

<style lang="scss">
  .sticky-in-center {
    position: sticky;
    top: 50vh;
    transform: translateY(-50%);
  }
</style>

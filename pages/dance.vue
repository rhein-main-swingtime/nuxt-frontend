<template>
  <div class="w-full">
    <nuxt-content class="prose prose-xl" :document="content" />
    <!-- <div id="dance-page-filter" class="w-full">
      <DanceEventsFilter class="sticky top-0" :title="$t('page-dance-events-filter')" />
    </div> -->
    <!-- <div class="h-screen flex flex-col"> -->
    <div id="vc-container-parent" class="sticky top-8 z-50 -mx-4 shadow-md bg-white">
      <v-calendar
        ref="calendar"
        :min-date="calendarMinMax.min"
        :max-date="calendarMinMax.max"
        :attributes="calendarAttributes"
        is-expanded
        @update:from-page="handeCalendarNavigation"
        @dayclick="handeCalendarNavigation"
      />
    </div>
    <dance-events-list
      class="flex-grow overflow-y-scroll"
      @rmsevent:top-pos="handleDateTopPos"
    />
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { Component, getModule, Prop, Vue, Watch } from 'nuxt-property-decorator'
// import PageContentMixin from '../mixins/PageContentMixin'
// import FullCalendar from '@fullcalendar/vue'
// import dayGridPlugin from '@fullcalendar/daygrid'
import DanceEventsModule from '../store/modules/DanceEventsModule'

@Component
export default class DanceEventsPage extends Vue {
    DanceEventsStoreInstance: DanceEventsModule = getModule(DanceEventsModule, this.$store)
    // mixins!: [PageContentMixin]
    calendarHighlight = new Date()
    enableHighlightMovement = true

    async asyncData (context: any) {
        const { $content, app, route } = context
        const routeName = route.name.slice(0, route.name.indexOf('___'))
        const content = await $content(`${app.i18n.locale}/${routeName}`).fetch()
        return {
            content
        }
    }

    get eventsApiQuery () {
        return this.DanceEventsStoreInstance.routeQuery
    }

    get danceEvents () {
        return this.DanceEventsStoreInstance.danceEvents
    }

    get highlight () {
        return {
            highlight: {
                color: 'orange',
                fillMode: 'outline'
            },
            dates: this.calendarHighlight
        }
    }

    get calendarAttributes () {
        if (!this.danceEvents) {
            return []
        }

        const socials = {
            bar: 'red',
            dates: [] as Date[]
        }

        const classes = {
            bar: 'blue',
            dates: [] as Date[]
        }

        Object.values(this.danceEvents).map((e) => {
            switch (e.category) {
            case 'class':
                classes.dates.push(e.startDateTime)
                break
            default:
                socials.dates.push(e.startDateTime)
            }
        })

        return [
            this.highlight,
            socials,
            classes
        ]
    }

    get calendarMinMax () {
        return {
            min: this.DanceEventsStoreInstance.minDate,
            max: this.DanceEventsStoreInstance.maxDate
        }
    }

    get eventDays () {
        return Object.keys(this.DanceEventsStoreInstance.eventsByDay || {})
    }

    private dateToString (date: Date) {
        return [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        ].join('-')
    }

    handeCalendarNavigation (page: any) {
        const numericId = this.nextEventByDate(page.date || new Date())
        const scrollTarget = document.getElementById('dance-event-' + numericId)
        if (page.event === undefined || !scrollTarget) {
            console.log('füße stillhalten')
            return
        }

        this.enableHighlightMovement = false
        const scrollTargetXPos = scrollTarget.getBoundingClientRect().x +
            scrollTarget.getBoundingClientRect().width

        const offset = () => {
            let offset = 0
            const headerElements = [
                'vc-container-parent',
                'page-header'
            ]

            headerElements.forEach((e) => {
                const element = document.getElementById(e)
                if (element) {
                    const bounding = element.getBoundingClientRect()
                    if (bounding.x > scrollTargetXPos) {
                        console.log('nebeneinander')
                        return
                    }
                    offset = offset + bounding.height
                }
            })

            return (offset + 8) * -1 // 8 = .5rem
        }

        const callback = () => { this.enableHighlightMovement = true }

        this.$scrollTo(
            scrollTarget,
            {
                duration: 500,
                easing: 'ease-in',
                offset,
                onDone: callback
            }
        )
    }

    get eventsByDay () {
        return this.DanceEventsStoreInstance.eventsByDay
    }

    private returnMonthlyKey (date: Date): string {
        return [
            date.getFullYear(),
            (date.getMonth() + 1).toString().padStart(2, '0')
        ].join('-')
    }

    private returnDailyKey (date: Date) {
        return this.returnMonthlyKey(date) + '-' + date.getDate().toString().padStart(2, '0')
    }

    nextEventByDate (date: Date): number|null {
        if (!this.eventsByDay) {
            return null
        }

        let dateKey = this.returnDailyKey(date)
        while (
            date <= this.DanceEventsStoreInstance.maxDate &&
            Object.keys(this.eventsByDay).includes(dateKey) !== true
        ) {
            date.setDate(date.getDate() + 1)
            dateKey = this.returnDailyKey(date)
        }

        try {
            if (Array.isArray(this.eventsByDay[dateKey])) {
                return this.eventsByDay[dateKey][0]
            }
            return null
        } catch {
            return null
        }
    }

    handleDayNavigation (day: any) {
        console.log(day)
    }

    handleDateTopPos (date: Date) {
        if (this.enableHighlightMovement === true) {
            (this.$refs.calendar as any).move(date)
            this.calendarHighlight = date
        }
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
    }

    mounted () {
        this.DanceEventsStoreInstance.fetchEvents(
            { host: this.$config.apiHost, skip: 0 }
        )
    }
}
</script>

<style lang="scss">
    #vc-container-parent {
        .vc-container {
            border-radius: 0;
        }
    }
</style>

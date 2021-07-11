<template>
  <rms-card :id="id" class="grid grid-cols-12">
    <div class="col-span-6  px-1 py-1 align-middle">
      {{ startDateComputed }} {{ $t('page-dance-event-item-time-from') }} {{ startTime }}
    </div>
    <div class="col-span-6 text-right py-1 px-1 align-middle">
      {{ city }}
    </div>
    <div
      name="summary"
      class="pt-6 pb-8 px-1 text-center col-span-12 font-light font-sans relative"
    >
      <div class="uppercase text-lg md:text-xl" name="event-type">
        &mdash; {{ $t('dance-event-category-' + category) }} &mdash;
      </div>
      <div class="text-2xl md:text-4xl ">
        <a href="#">{{ summary }}</a>
      </div>
      <div class="absolute bottom-0 right-0 mb-1 px-2" />
    </div>
    <div name="calendar" class="col-span-12 px-4 py-1  text-md text-center opacity-75">
      &mdash;&nbsp;{{ calendar }}&nbsp;&mdash;
    </div>
    <div class="col-span-12 px-1 py-1 text-right relative">
      <span class="text-xl uppercase opacity-10 font-serif absolute left-0">[&nbsp;{{ stub }}&nbsp;]</span>
      <a href="#" class="border-teal-500 bg-teal-300 border-2 px-2 py-1 rounded-sm no-underline">
        Besuchen
        <fa icon="chevron-right" />
      </a>
    </div>
  </rms-card>
</template>

<script lang="ts">
import { isElement } from 'lodash'
import { Component, Prop, Vue, getModule, Watch } from 'nuxt-property-decorator'
import DanceEventsModule from '../../store/modules/DanceEventsModule'

@Component
export default class DanceEventsItem extends Vue {
    @Prop({ required: true }) summary!: string
    @Prop({ required: false }) description!: string
    @Prop({ required: false, default: '' }) city!: string
    @Prop({ required: true }) category!: string
    @Prop({ required: true }) calendar!: string
    @Prop({ required: true }) location!: string
    @Prop({ required: true }) startDateTime!: Date
    @Prop({ required: true }) endDateTime!: Date
    @Prop({ required: true }) id!: String

    DanceEventsStoreInstance: DanceEventsModule = getModule(DanceEventsModule, this.$store)

    get categorySeparated (): string {
        const translated : string = this.$i18n.t(this.category).toString()
        return translated.split('').join('<br>')
    }

    get startDateComputed (): string {
        if (this.startDateTime.getDate() === (new Date()).getDate()) {
            return 'Heute'
        }
        return this.$d(this.startDateTime)
        // return this.startDateTime.getDate() +
        //     '.' + (this.startDateTime.getMonth() + 1) +
        //     '.'
    }

    get startTime (): String {
        return this.startDateTime.getHours() +
        ':' +
        this.formatMinutes(this.startDateTime.getMinutes())
    }

    get endTime (): String {
        return this.endDateTime.getHours() +
        ':' +
        this.formatMinutes(this.endDateTime.getMinutes()) +
        ' Uhr'
    }

    get stub (): String {
        return (
            (this.city ? this.city : 'xx').slice(0, 2) +
        this.id +
        (this.calendar ? this.calendar : 'xx').slice(0, 2)
        ).toLowerCase()
    }

    public formatMinutes (minuteCount: Number): string {
        return (String)(minuteCount < 10 ? '0' + minuteCount : minuteCount)
    }
}
</script>

<style lang="scss">
  .category-social {
    background-color: theme('colors.red.900');
  }
  .category-class {
    background-color: theme('colors.blue.900');
  }
  .transform-centered {
    transform-origin: 18px 19px;
    letter-spacing: 2px;
  }
  .dance-event {
    transition: all 130ms;
    // > div {
    //   box-shadow: 4px 4px #ffffff80;
    // }
    [name='stub'] {
        transition: background-color 135ms;
    }
    &:hover {
      // > div {
      //   box-shadow: 8px 8px #ffffff80;
      // }
      // transform: translate(-4px, -4px);
      [name='stub'] {
        @apply bg-teal-400
      }
    }
  }
  // .rotate {
  //   transform: rotate(90deg);
  //   transform-origin: left bottom;
  // }
</style>

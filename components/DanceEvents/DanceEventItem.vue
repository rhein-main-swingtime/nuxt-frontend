<template>
  <section>
    <article class="dance-event w-full mt-8 border-gray-500 grid grid-cols-12">
      <div name="ticket-content" class="col-span-11 grid grid-cols-12 flex-grow rounded-r-lg border-r-0 bg-gray-700 border md:grid-rows-">
        <div class="col-span-6 px-2 text-xl">
          {{ startDateComputed }} {{ startTime }}
        </div>
        <div class="col-span-6 text-right border-l px-2 text-xl uppercase">
          {{ city }}
        </div>
        <!-- Summary -->
        <div name="summary" class="divide-x-0 divide-y-0 py-4 px-2 text-center text-white col-span-12 relative border-t border-b">
          <div class="font-sans text-2xl md:text-3xl pt-3 pb-1">
            <a href="#">{{ summary }}</a>
          </div>
          <div class="font-sans uppercase text-lg md:text-xl" name="event-type">
            &loz; {{ category }} &loz;
          </div>
          <!-- Stub -->
          <div class="absolute bottom-0 right-0">
            <span class="text-sm font-bold uppercase px-2 opacity-50">[&nbsp;{{ stub }}&nbsp;]</span>
          </div>
        </div>
        <!-- Calendar -->
        <div name="calendar" class="col-span-12 uppercase px-2 py-1 font-bold text-sm text-center">
          &mdash;&nbsp;{{ calendar }}&nbsp;&mdash;
        </div>
      </div>
      <div name="stub" class="border-l-dashed uppercase bg-teal-700 col-span-1 flex items-center justify-center overflow-hidden rounded-l-lg border">
        <span class="inline-block font-bold text-lg transform rotate-90">
          {{ $t("page-dance-events-open-event") }}
        </span>
      </div>
    </article>
  </section>
</template>

<script lang="ts">
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
    @Prop({ required: true }) id!: Number

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
    > div {
      box-shadow: 4px 4px #ffffff80;
    }
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

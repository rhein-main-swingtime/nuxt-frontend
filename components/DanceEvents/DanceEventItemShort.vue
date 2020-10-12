<template>
  <article class="w-full py-2 flex flex-wrap flex-row text-big-stone bg-oslo-gray-100 px-2 relative pb-10">
    <div class="w-full">
      <span>
        {{ dateFormated }}
      </span>
      <span v-if="city">
        in {{ city }}
      </span>
    </div>
    <div class="prose w-full border-t border-t-1 py-4">
      <h3>{{ summary }}</h3>
    </div>
    <div class="text-right mt-3 mb-2 absolute bottom-0 left-0 w-full pr-3 pb-1">
      <a href="#" class="border py-1 px-2 inlin-block rounded-md no-underline ">
        {{ $t('mehr Infos >>') }}
      </a>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class DanceEventItemShort extends Vue {
    @Prop({ required: true }) summary!: String
    @Prop({ required: false, default: '' }) city!: String
    @Prop({ required: true }) startDateTime!: Date

    get startDateComputed (): String {
        if (this.startDateTime.getDate() === (new Date()).getDate()) {
            return 'Heute'
        }
        return this.startDateTime.getDate() +
            '.' + (this.startDateTime.getMonth() + 1) +
            '.'
    }

    get startTime (): String {
        return this.startDateTime.getHours() +
        ':' +
        this.formatMinutes(this.startDateTime.getMinutes()) +
        ' Uhr'
    }

    public formatMinutes (minuteCount: Number): string {
        return (String)(minuteCount < 10 ? '0' + minuteCount : minuteCount)
    }

    get dateFormated (): String {
        const today = new Date()
        const tomorrow = new Date(today.getDate() + 1)
        if (
            this.startDateTime.getDate() === today.getDate() &&
            this.startDateTime.getMonth() === today.getMonth()
        ) {
            return this.$t('heute').toString()
        }

        if (
            this.startDateTime.getDate() === tomorrow.getDate() &&
            this.startDateTime.getMonth() === tomorrow.getMonth()
        ) {
            return this.$t('morgen').toString()
        }

        return this.$d(this.startDateTime, 'shortDate') +
            ' ' + this.$t('um') + ' ' +
            this.$d(this.startDateTime, 'shortTime').toString() +
            ' ' + this.$t('Uhr')
    }
}
</script>

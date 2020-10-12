<template>
  <fieldset>
    <label
      :for="filterItem + '-filter'"
      @click="toggleValue()"
    >
      <input
        type="checkbox"
        :name="filterItem + '-filter'"
        :checked="isChecked"
      >
      {{ $t(filterItem) }}
    </label>
  </fieldset>
</template>

<script lang="ts">
import { Component, Prop, Vue, getModule } from 'nuxt-property-decorator'
import DanceEventsModule from '../../store/modules/DanceEventsModule'
@Component
export default class DanceEventsFilterItem extends Vue {
    @Prop({ required: true }) filterItem!: string
    @Prop({ required: true }) filterCategory!: string

    DanceEventsStoreInstance: DanceEventsModule = getModule(DanceEventsModule, this.$store)

    get isChecked () {
        return this.DanceEventsStoreInstance.filters![this.filterCategory]![this.filterItem]
    }

    toggleValue () {
        const payload = {
            [this.filterCategory]: {
                [this.filterItem]: !this.isChecked
            }
        }
        this.DanceEventsStoreInstance.updateFilter(payload)
    }
}
</script>

<style lang="scss" scoped>
  input[type="checkbox"] {
    height: 1em;
    width: 1em;
    position: relative;
    top: 2px;
    @apply bg-teal-400
  }
</style>

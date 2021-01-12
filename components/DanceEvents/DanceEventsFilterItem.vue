<template>
  <fieldset>
    <label
      :for="filterName + '-filter'"
      @click="toggleValue()"
    >
      <input
        type="checkbox"
        :name="filterName + '-filter'"
        :checked="isChecked"
        :disabled="isDisabled"
      >
      {{ $t(filterName) }}
      <span v-if="!isChecked">({{ count }})</span>
    </label>
  </fieldset>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class DanceEventsFilterItem extends Vue {
    // DanceEventsStoreInstance: DanceEventsModule = getModule(DanceEventsModule, this.$store)
    @Prop(String) readonly filterName!: string
    @Prop(String) readonly filterCategory!: string
    @Prop(Object) readonly filterValues!: {
      active: boolean,
      count: null | number
    }

    get isChecked () {
        if (this.filterValues === null) {
            return false
        }
        return this.filterValues!.active ?? false
    }

    get count () {
        if (this.filterValues === null) {
            return 0
        }
        return this.filterValues!.count ?? 0
    }

    get isDisabled () {
        return !this.filterValues!.count
    }

    toggleValue () {
        const payload = {
            [this.filterCategory]: {
                [this.filterName]: {
                    active: !this.isChecked
                }
            }
        }
        this.$emit('filter:update', payload)
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

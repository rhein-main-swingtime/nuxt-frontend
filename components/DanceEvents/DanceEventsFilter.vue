<template>
  <nav id="dance-page-filters" class="border-gray-300 border rounded-tl-lg mt-10">
    <h2 v-if="title" class="text-2xl font-sans font-bold px-2 py-3">
      <fa icon="filter" /> {{ title }}
    </h2>

    <section v-for="(filterItems, filterCategory) in filters" :key="filterCategory.categoryName" class="flex filter-section border-t border-gray-400">
      <div class="w-full mb-5 p-2">
        <form>
          <fieldset class="inline">
            <h5 class="font-bold text-xl inline">
              {{ $t(filterCategory) }}:
            </h5>

            <DanceEventsFilterItem
              v-for="(filterValues, filterName) in filterItems"
              :key="'dance-event-filter-' + filterName"
              :filter-category="filterCategory"
              :filter-name="filterName"
              :filter-values="filterValues"
              class="inline-block px-2"
              @filter:update="handleFilterUpdate"
            />
          </fieldset>
        </form>
      </div>
    </section>
    <button v-if="filtersAreActive" :class="{active: filtersAreActive}" @click="resetFilters">
      {{ $t('page-dance-events-reset-filter') }}
    </button>
  </nav>
</template>

<script lang="ts">
import { Component, getModule, Prop, Vue } from 'nuxt-property-decorator'
import DanceEventsModule from '../../store/modules/DanceEventsModule'

@Component
export default class DanceEventsFilter extends Vue {
    DanceEventsStoreInstance: DanceEventsModule = getModule(DanceEventsModule, this.$store)
    @Prop(String) title: String | undefined

    get filters () {
        return this.DanceEventsStoreInstance.filters
    }

    get filtersAreActive () {
        return this.DanceEventsStoreInstance.hasActiveFilter
    }

    resetFilters () {
        this.DanceEventsStoreInstance.resetFilters()
    }

    private handleFilterUpdate (payload: object) {
        console.log(payload)
        this.DanceEventsStoreInstance.updateFilter(payload)
    }

    // When using the nav to switch between socials + class only route updates happens
    // @Watch('$route')
    // routeWatcher () {
    //     this.DanceEventsStoreInstance.fetchFilters(
    //         {
    //             host: this.$config.apiHost,
    //             search: window.location.search
    //         }
    //     )
    // }

    // mounted () {
    //     this.DanceEventsStoreInstance.fetchFilters(
    //         {
    //             host: this.$config.apiHost,
    //             search: window.location.search
    //         }
    //     )
    // }
}
</script>

<style lang="scss">
  // #dance-page-filter nav {
  //   @apply border-gray-500 border bg-gray-800 rounded-sm;
  //   & section {
  //     @apply border-t border-gray-500 py-2 px-2;
  //   }
  //   button {
  //     transition: background-color 230ms;
  //     @apply w-full border-gray-500 border-t py-2 px-2 content-center uppercase;
  //     &.active {
  //       @apply bg-red-600;
  //     }
  //   }
  // }
</style>

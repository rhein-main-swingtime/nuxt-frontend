<template>
  <nav>
    <h2 v-if="title" class="text-2xl font-sans font-bold px-2 py-3">
      <fa icon="filter" /> {{ title }}
    </h2>
    <section v-for="(filterItems, filterCategory) in filters" :key="filterCategory.categoryName" class="flex filter-section">
      <div class="w-full mb-5">
        <h5 class="font-bold text-lg">
          {{ $t(filterCategory) }}
        </h5>
        <form>
          <DanceEventsFilterItem
            v-for="(active, filterItem) in filterItems"
            :key="'dance-event-filter-' + filterItem"
            :filter-category="filterCategory"
            :filter-item="filterItem"
          />
        </form>
      </div>
    </section>
    <button v-if="filtersAreActive" :class="{active: filtersAreActive}" @click="resetFilters">
      {{ $t('page-dance-events-reset-filter') }}
    </button>
  </nav>
</template>

<script lang="ts">
import { Component, getModule, Prop, Vue, Watch } from 'nuxt-property-decorator'
import DanceEventsModule from '../../store/modules/DanceEventsModule'

@Component
export default class DanceEventsFilter extends Vue {
    DanceEventsStoreInstance: DanceEventsModule = getModule(DanceEventsModule, this.$store)

    @Prop(String) title: String | undefined

    get filters () {
        return this.DanceEventsStoreInstance.filters || []
    }

    get filtersAreActive () {
        return this.DanceEventsStoreInstance.hasActiveFilter
    }

    resetFilters () {
        this.DanceEventsStoreInstance.resetFilters()
    }

    // When using the nav to switch between socials + class only route updates happens
    @Watch('$route')
    routeWatcher () {
        this.DanceEventsStoreInstance.fetchFilters(
            {
                host: this.$config.apiHost,
                search: window.location.search
            }
        )
    }

    mounted () {
        this.DanceEventsStoreInstance.fetchFilters(
            {
                host: this.$config.apiHost,
                search: window.location.search
            }
        )
    }
}
</script>

<style lang="scss">
  #dance-page-filter nav {
    @apply border-gray-500 border bg-gray-800 rounded-sm;
    & section {
      @apply border-t border-gray-500 py-2 px-2;
    }
    button {
      transition: background-color 230ms;
      @apply w-full border-gray-500 border-t py-2 px-2 content-center uppercase;
      &.active {
        @apply bg-red-600;
      }
    }
  }
</style>

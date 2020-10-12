<template>
  <div id="nav-trigger" class="flex flex-row z-50 rounded-md border-gray-600 border-2 fixed overflow-hidden w-auto text-gray-100 lg:hidden">
    <div class="z-0 top-0 left-0 w-full h-full bg-blue-800 absolute" />
    <div
      class="main flex-grow z-10 text-center pt-2 nav-item"
      :class="{active: pageNavActive}"
      @click.prevent="openNav('PageNav')"
    >
      <div class="w-10 inline-block relative">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
    <div
      v-if="showDanceEventFilters"
      class="p-1 z-10 flex-grow text-2xl text-center items-center border-l border-gray-600"
      @click.prevent="openNav('FilterNav')"
    >
      <fa icon="filter" :class="{'text-red': filtersActive }" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, getModule } from 'nuxt-property-decorator'
import PageNavModule from '../../store/modules/PageNavModule'
import DanceEventsModule from '~/store/modules/DanceEventsModule'

@Component
export default class NavigationTrigger extends Vue {
  PageNavModuleInstance: PageNavModule = getModule(PageNavModule, this.$store)
  DanceEventsModuleInstance: DanceEventsModule = getModule(DanceEventsModule, this.$store)

  openNav (name: String) {
      if (name === this.PageNavModuleInstance.activeNav) {
          this.PageNavModuleInstance.SET_ActiveNav(null)
      } else {
          this.PageNavModuleInstance.SET_ActiveNav(name)
      }
  }

  get showDanceEventFilters () {
      return this.$route.name?.includes('dance')
  }

  get filtersActive () {
      return this.DanceEventsModuleInstance.filters !== null
  }

  get pageNavActive () {
      return this.PageNavModuleInstance.activeNav === 'PageNav'
  }
}

</script>

<style lang="scss" scoped>
  #nav-trigger {
    box-shadow: 0px 2px 3px #b2b2b22e;
    background-color: transparent;
    position: fixed;
    width: calc(100vw - 2rem);
    bottom: 1rem;
    right: 1rem;
    .nav-item {
      background-color: transparent;
      transition: background-color 175ms;
      &.active {
        background-color: theme('colors.teal.400');
      }
    }
    span {
      transition: background-color 175ms, transform 175ms, margin-left 175ms;
      width: auto;
      margin-bottom: 3px;
      height: 4px;
      background-color: theme('colors.gray.200');
      display: block;
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;

      &:nth-child(1) {
        margin-left: 8px;
      }
      &:nth-child(2) {
        margin-left: 3px;
      }
      &:nth-child(3) {
        margin-left: 10px;
      }
      &:nth-child(4) {
        margin-left: 5px;
      }
      &:nth-child(5) {
        margin-left: 9px;
      }
    }
    &.active {
      span {
        background-color: transparent;
        &:first-child,
        &:last-child {
          background-color: theme('colors.teal.400');
          transform-origin: right;
          margin-left: 0;
        }
        &:first-child {
          transform: rotate(-45deg);
        }
        &:last-child {
          transform: rotate(45deg);
        }
      }

    }
  }
</style>

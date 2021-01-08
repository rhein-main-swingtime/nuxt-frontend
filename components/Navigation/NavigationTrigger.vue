<template>
  <div
    name="action-button"
    class="border border-gray-600 bottom-10 fixed flex grid
          grid-cols-1 grid-rows-1 h-20 inset-x-auto items-center lg:hidden
          overflow-hidden rounded-full rounded-md text-center text-gray-100
          w-20 z-50"
    :class="styleClasses"
    @click.prevent="openNav('PageNav')"
  >
    <div
      class="main z-10 nav-item place-self-center block text-center w-full
        col-start-1 row-start-1 inset-x-1/2"
      :class="{active: pageNavActive}"
    >
      <div class="text-8xl font-sans opacity-10">
        {{ titleBackground }}
      </div>
    </div>
    <div class="col-start-1 row-start-1 font-bold text-xl align-text-bottom">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, getModule, Prop } from 'nuxt-property-decorator'
import PageNavModule from '../../store/modules/PageNavModule'

@Component
export default class NavigationTrigger extends Vue {
  PageNavModuleInstance: PageNavModule = getModule(PageNavModule, this.$store)

  @Prop([String]) readonly activateNav!: string | null
  // @Prop([Boolean]) readonly visible: boolean | false
  @Prop({ default: '' }) readonly enterActiveClassname!: string | null
  @Prop({ default: '' }) readonly leaveActiveClassname!: string | null // rotateOutDownLeft
  @Prop({ default: '' }) readonly title!: string | null
  @Prop({ default: '' }) readonly titleBackground!: string | null
  @Prop({ default: {} }) readonly styleClasses!: Object

  openNav (name: String) {
      this.PageNavModuleInstance.SET_ActiveNav(name)
  }

  get pageNavActive () {
      return this.PageNavModuleInstance.activeNav === 'PageNav'
  }

  get navOverlayVisible () {
      return this.PageNavModuleInstance.activeNav !== null
  }
}

</script>

<style lang="scss" scoped>
  [name="action-button"] {
    left: 50%;
    margin-left: -2.5rem;
    // transform: translateX(-50%);
    box-shadow: 0px 0px 5px 2px theme('colors.gray.500');
    animation-duration: 550ms;
    transition: background-color 330ms;
  }
</style>

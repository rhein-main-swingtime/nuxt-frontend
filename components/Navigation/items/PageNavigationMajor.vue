<template>
  <div class="grid grid-cols-12 gap-6 text-center bg-red-800">
    <nuxt-link
      v-for="(link, index) in links"
      :key="'major-nav-item-' + index"
      class="font-sans ring-4 rounded-lg relative font-thin bg-gray-700 ring-teal-400 text-white shadow-md"
      :class="generateLinkClasses(index)"
      :to="link.nav"
    >
      <span class="">
        {{ $t(link.translation) }}
      </span>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue, getModule, Watch } from 'nuxt-property-decorator'
import PageNavModule from '../../../store/modules/PageNavModule'
import NavigationItems from '../../../navigation/NavigationItems'

@Component
export default class PageNavMajor extends Vue {
  PageNavStoreInstance: PageNavModule = getModule(PageNavModule, this.$store)

  links = Major

  generateLinkClasses (index: Number) {
      if (index === 0) {
          return [
              'col-span-12',
              'text-3xl'
          ]
      } else if (index <= 2) {
          return [
              'col-span-6',
              'text-2xl'
          ]
      }
      return [
          'col-span-4',
          'text-lg'
      ]
  }

  @Watch('$route')
  handleNav () {
      this.PageNavStoreInstance.SET_ActiveNav(null)
  }
}
</script>

<style lang="scss" scoped>

.grid a {
  padding: 1rem;
  display: block;
  &::before {
     content: '';
     padding-bottom: 75%;
     display: block;
   }
   &:first-child {
     &::before {
       padding-bottom: 20%;
     }
   }
   & > span {
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
   }
  //  &::before,
  //  & > div {
  //    display: grid;
  //    grid-area: 1 / 1 / 2 / 2;
  //  }
}
</style>

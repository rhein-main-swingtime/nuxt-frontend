<template>
  <div class="w-full">
    <nuxt-content class="prose lg:prose-xl" :document="content" />
    <div class="my-4 mb-2 border border-b-4 border-gray-100 md:sticky top-0 bg-gray-100 -ml-1 -mr-1 flex flex-row flex-wrap">
      <activator-button
        v-for="city in cities"
        :key="'learn-filter-button-' + city"
        :button-label="city"
        :button-active="isCitySelected(city)"
        :button-enabled="true"
        @activatorButtonChange="handleClick"
      >
        {{ city }}
        ({{ cityCount(city) }})
      </activator-button>
    </div>
    <transition-group
      id="learn-items"
      tag="div"
      mode="out-in"
      name="fade"
      duration="300ms"
      class=""
    >
      <learn-item
        v-for="(item) in visibleItems"
        :key="'learn-item-' + item.name"
        :name="item.name"
        :city="item.city"
        :category="item.category"
        :desc="item.desc"
        :address="item.address"
        :contact="item.contact"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { isEmpty, toLower } from 'lodash'
import { LearnCardPayload } from '~/types/LearnTypes'
import { ActivatorButtonEventPayloadInterface } from '~/types/ActivatorButton'

interface valueObject {
  [key: string]: Boolean
}

@Component
export default class LearnPage extends Vue {
    cities: string[] = []
    items: LearnCardPayload[] = []
    cityFilter: string | null = ''
    scrollTimeout!: null | NodeJS.Timeout

    private prettyfy (data: any) {
        return JSON.stringify(data, null, 4)
    }

    private getDistinct (items: Array<string>) {
        return [...new Set(items)]
    }

    get visibleItems (): LearnCardPayload[] {
        return this.items.filter(
            (i) => {
                return isEmpty(this.cityFilter) || this.cityFilter === toLower(i.city)
            }
        )
    }

    isCitySelected (city: string) {
        city = toLower(city)

        if (isEmpty(this.cityFilter)) {
            return false
        }
        return this.cityFilter === city
    }

    scrollToOptions (element: HTMLElement | null) {
        if (!element) {
            return 0
        }
        return {
            offset: (element.offsetHeight + 16) * -1
        }
    }

    cityCount (city: string): number {
        return this.items.filter(
            (i) => {
                return i.city === city
            }
        ).length
    }

    handleClick (payload: ActivatorButtonEventPayloadInterface) {
        if (payload.active) {
            const name = toLower(payload.name)
            this.cityFilter = name
            history.replaceState(null, '', name)
        } else {
            history.replaceState(null, '', './')
            this.cityFilter = null
        }

        const targetElement = document.getElementById('page-header')
    console.log(this.scrollToOptions(targetElement || null))
        // @ todo make this work on mobile
        if (targetElement) {
            const scroller = () => {
                this.$scrollTo('#learn-items', 450, this.scrollToOptions(targetElement || null))
            }
            this.scrollTimeout = setTimeout(scroller, 300)
        }
    }

    // @see https://content.nuxtjs.org/
    async asyncData (context: any) {
        const { $content, app, route } = context
        const routeName = route.name.slice(0, route.name.indexOf('___'))
        const content = await $content(`${app.i18n.locale}/${routeName}`).fetch()
        return {
            content
        }
    }

    created () {
        this.items = require('../content/data/learn.json').sort(
            (a: { name: String }, b: { name: String }) => (
            a.name! > b.name)
                ? 1
                : -1
        )
        this.cities = this.getDistinct(
            this.items.map((i: {city: String}) => i.city.toString())
        ).sort()
    }

    mounted () {
        if (this.$route.params.city) {
            this.cityFilter = this.$route.params.city
        } else {
            this.cityFilter = null
        }
    }
}
</script>

<style lang="scss">
</style>

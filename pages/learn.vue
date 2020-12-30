<template>
  <div class="w-full">
    <nuxt-content :document="content[0]" />
    <pre>{{ prettyfy(content) }}</pre>
    <pre>{{ prettyfy(data) }}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class LearnPage extends Vue {
    private prettyfy (data: any) {
        return JSON.stringify(data, null, 4)
    }

    // @see https://content.nuxtjs.org/
    async asyncData (context: any) {
        const { $content, app, route } = context
        const routeName = route.name.slice(0, route.name.indexOf('___'))
        const content = await $content(`${app.i18n.locale}/${routeName}`).fetch()
        const data = await $content(`data/${routeName}`).fetch()
        return {
            content,
            data
        }
    }
}
</script>

<style lang="scss">
</style>

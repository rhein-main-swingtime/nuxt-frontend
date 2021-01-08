<template>
  <div class="w-full">
    <div
      id="homepage-hero"
      class="relative h-64 bg-gray-200 w-full shadow-inner rounded-lg -ml-7"
    />

    <section id="intro-content" class="has-bg relative z-1 overflow-hidden bg-fixed">
      <article id="intro-content-copy" class="prose prose-xl default-content-container">
        <nuxt-content :document="page" />
      </article>
    </section>
    <section id="upcoming-socials" class="has-bg bg-fixed px-2 py-10 flex text-oslo-gray-100 flex-col lg:flex-wrap lg:flex-row">
      <h1 class="text-2xl font-semibold w-full">
        {{ $t('Die nächsten Socials') }}
      </h1>
      <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3 lg:gap-3">
        <DanceEventItemShort
          v-for="(event, key) in previewEvents"
          :key="'preview-event-' + key"
          :summary="event.summary"
          :start-date-time="event.startDateTime"
          :city="event.city"
        />
      </div>
    </section>
    <article v-for="(intro, key) in intros" :key="'homepage-intro-' + key" class="has-bg bg-fixed flex py-10">
      <div id="intro-content-copy" class="prose default-content-container">
        <h2>{{ intro.name }}</h2>
        <p>{{ intro.intro }}</p>
        <a href="#">{{ $t('mehr Infos') }}</a>
      </div>
    </article>
  </div>
</template>

<script >
export default {
    name: 'Index',

    async asyncData ({ $content, params, store, error, app, $config }) {
        // const { , params, app, route, redirect } = context
        // const slug = params.slug
        const page = await $content(`${app.i18n.locale}/index`).fetch()
        const teasers = await $content(`${app.i18n.locale}/_teasers`).fetch()
        const intros = await $content(`${app.i18n.locale}`).search('homepage', 'yes').fetch()

        const previewEvents = await app.$axios.get(
            $config.apiHost + 'events', {
                params: {
                    limit: 4,
                    categories: [
                        'social'
                    ]
                }
            })
            .then(response => response.data)
            .then((payload) => {
                payload.danceEvents.map(
                    (item) => {
                        item.startDateTime = new Date(item.start_date_time)
                        item.endDateTime = new Date(item.end_date_time)
                    })
                return payload.danceEvents
            })

        // store.commit('PageHeader/SET_intro', page)
        return {
            page,
            teasers,
            previewEvents,
            intros
        }
    },
    data () {
    },
    computed: {
        // previewEvents () {
        //     return this.previewEvents
        // }
    }
}
</script>

<style lang="scss">
</style>

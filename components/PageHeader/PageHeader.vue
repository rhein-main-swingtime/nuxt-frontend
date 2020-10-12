
<template>
  <header id="page-header" class="flex max-w-screen-xl flex-wrap w-full">
    <div class="flex flex-col md:grid md:grid-cols-12 md:gap-4 w-full place-items-center min-h-full ">
      <div class="w-full md:col-span-4 font-sans text uppercase mb-4">
        <h1 class="text-6xl font-bold text-right object-right leading-extra-tight">
          <div v-for="(part, idx) in siteTitleParts" :key="idx" :style="getRotationStyle()">
            <span class="relative inline-block">
              <span class="z-10 relative text-red-400">
                {{ part }}
              </span>
              <div class="absolute bottom-0 mb-0 left-0 w-full h-4 bg-white z-0" />
            </span>
          </div>
        </h1>
      </div>
      <div class="w-full md:col-span-8 justify-items-start relative hidden sm:block">
        <div class="relative z-10">
          <h2 class="text-4xl min-w-0 flex flex-col text-red-400 font-sans uppercase leading-none font-bold relative z-10">
            <div>
              <PageHeaderRandom
                :intervall="5000"
                :random-shit-collection="dances"
                :start-after="5000"
                movement="right"
              />
            </div>
            <div class="">
              in
            </div>
            <div>
              <PageHeaderRandom
                :intervall="5000"
                :random-shit-collection="cities"
                :start-after="5000"
                movement="right"
              />
            </div>
          </h2>
          <h3 class="text-2xl text-right min-w-0 flex text-white font-sans uppercase leading-none font-bold relative z-10">
            {{ $t('site-claim') }}
          </h3>
        </div>
      </div>

      <PageHeaderNav :class="'w-full md:col-span-12 text-3xl hidden lg:flex'" />
    </div>

  </header>
</template>

<script>

export default {
    data: () => {
        return {
            dances: [
                'Swing Tanzen', 'Balboa', 'Slow Bal', 'Lindy Hop', 'Collegiate Shag'
            ],
            cities: [
                'Rhein Main', 'Frankfurt', 'Offenbach', 'Mainz', 'Wiesbaden', 'Darmstadt', 'Gießen'
            ],
            rotation: 75
        }
    },
    computed: {
        isRootPage () {
            return this.$route.path === '/' || this.$route.path === '/' + this.$i18n.locale
        },
        introContent () {
            return this.$store.state.PageHeader.intro
        },
        siteTitleParts () {
            return this.$i18n.t('site-title').split(' ')
        }
    },
    methods: {
        getRotationStyle (i, total) {
            return '' // ausgeknippst
            const index = i + 1
            const deg = ((this.rotation / total * index) - (this.rotation / 2)) * -1
            return 'transform: rotate(' + deg + 'deg); transform-origin: 2.2em center;'
        }
    }
}

</script>
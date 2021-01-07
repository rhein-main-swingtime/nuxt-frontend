
<template>
  <header
    id="page-header"
    class="flex max-w-screen-xl flex-col w-full text-gray-500 py-1 px-2
      uppercase text-center md:text-left leading-extra-tight
      md:col-span-3"
    :class="headerClasses"
  >
    <h1>
      <div
        v-for="(part, idx) in siteTitleParts"
        :key="idx"
        :class="headerPartClass"
      >
        <span class="relative inline-block">
          <span class="relative z-10 mx-1">
            {{ part }}
          </span>
          <div class="absolute bottom-0 mb-0 left-0 w-full h-2/6 dark:bg-white bg-gray-500" />
        </span>
      </div>
    </h1>
    <h3 v-if="!isRootPage" class="hidden sm:inline-block mt-1 font-bold">
      {{ $t('site-claim') }}
    </h3>
    <!-- <div class="flex flex-col sm:grid sm:grid-cols-12 sm:gap-4 w-full min-h-full">
      <div class="w-full sm:col-span-4 font-sans text uppercase">
        <h1 class="text-8xl sm:text-6xl text center sm:text-right font-bold leading-extra-tight sm:leading-extra-tight">
          <div v-for="(part, idx) in siteTitleParts" :key="idx">
            <span class="relative inline-block">
              <span class="z-10 relative text-red-500">
                {{ part }}
              </span>
              <div class="absolute bottom-0 mb-0 left-0 w-full h-2/6 dark:bg-white bg-gray-500 z-0" />
            </span>
          </div>
        </h1>
      </div> -->
      <!-- <div class="w-full sm:col-span-8 relative flex flex-col h-full">
        <h2
          class="text-4xl min-w-0 flex flex-col text-red-500 hidden sm:block
              font-sans uppercase leading-none font-bold relative z-10"
        >
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
        <h3
          class="text-2xl text-right min-w-0 flex dark:text-white block
            font-sans uppercase leading-none font-bold relative z-10 place-self-end"
        >
          {{ $t('site-claim') }}
        </h3>
      </div> -->

      <!-- <PageHeaderNav :class="'w-full md:col-span-12 text-3xl hidden lg:flex'" /> -->
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
        },
        headerPartClass () {
            const staticClasses = ['relative', 'font-bold',
                'text-red-400', 'font-sans', 'relative', 'z-10', 'leading-extra-tight']
            if (this.isRootPage) {
                return staticClasses.concat(
                    [
                        'text-8xl', 'text-center', 'sm:text-6xl', 'sm:text-right',
                        'sm:leading-extra-tight'
                    ]
                )
            }
            return staticClasses.concat([
                'text-4xl', 'md:text-6xl', 'md:leading-extra-tight', 'inline-block', 'md:block'
            ])
        },
        headerClasses () {
            if (this.isRootPage) {
                return [
                  'md:row-span-2'
                ]
            }
            return [
                'shadow-md', 'fixed', 'top-0', 'left-0', 'w-full', 'bg-white',
                'md:block', 'md:bg-transparent', 'md:relative', 'md:shadow-none',
                'md:text-right'
            ]
        }
    },
    getters: {

    }
}

</script>

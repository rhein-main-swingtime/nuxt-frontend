<template>
  <article class="relative my-2 rounded bg-limed-spruce grid grid-cols-3 gap-2 border border-oslo-gray p-2 text-base">
    <h3 class="text-xl md:text-base text-left font-sans uppercase font-thin col-span-3" v-html="titleWrapped">
      <!-- {{ title }} -->
    </h3>
    <img :src="image" class="col-span-3 lg:col-span-2">
    <div class="teaser-content" :class="contentColSpan">
      <div :class="contentClass">
        <nuxt-content :document="content" />
      </div>
      <div v-if="url && cta" class="teaser-link flex flex-row-reverse bottom-0 right-0">
        <a class="border font-sans rounded px-2 py-1 uppercase text-base md:text-xs border-big-stone p-1 bg-oslo-gray-200" :href="url">
          {{ cta }}
        </a>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class Teaser extends Vue {
    @Prop({ required: false }) cta!: String
    @Prop({ required: false }) image!: String
    @Prop({ required: false }) url!: String
    @Prop({ required: true }) content!: Object
    @Prop({ required: true }) title!: String

    get contentColSpan (): string {
        return 'col-span-3 ' + (this.image ? 'lg:col-span-2' : 'lg:col-span-3')
    }

    get contentClass (): string {
        const contentClass = 'text-desert-storm'
        if (this.image) {
            return 'hidden lg:block' + ' ' + contentClass
        }
        return contentClass
    }

    get titleWrapped (): String {
        const spanClass = 'box-border bg-oslo-gray-200 m-0 px-1 inline-block'
        return this.title.split(' ')
            .map(part => '<span class="' + spanClass + '">' + part + '</span>')
            .join('')
    }
}

</script>

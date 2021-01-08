<template>
  <article
    name="learn-item"
    class="border border-gray-400 mb-4 shadow-md p-4 grid grid-cols-12 gap-4 bg-white"
  >
    <div class="col-span-12 my-8 text-center font-sans">
      <h3 class="">
        &mdash; {{ $t('page-learn-' + category ) }} &mdash;
      </h3>
      <h1 class=" text-5xl font-light">
        {{ name }}
      </h1>
    </div>
    <div v-if="descLocalized" class="col-span-12">
      {{ descLocalized }}
    </div>
    <!-- <div class="col-span-12 text-center">
      <span class="border-teal-300 bg-teal-500 text-white px-2 rounded-md w-auto">
        <fa icon="arrow-right" /> 12 Termine verfügbar
      </span>
    </div> -->
    <!-- contact -->
    <learn-item-contact
      v-if="contact !== null"
      :web="contact.web"
      :tel="contact.tel"
      :mail="contact.mail"
      :facebook="contact.facebook"
      :instagram="contact.instagram"
      :youtube="contact.youtube"
      :fullwidth="!hasAddress"
    />
    <!-- address -->
    <div v-if="hasAddress" class="col-span-12 sm:col-span-4 border-gray-100 pt-2">
      <h4 class="font-bold">
        {{ $t('page-learn-address') }}
      </h4>
      <div v-for="(part, key) in address" :key="'contact-part-' + key" class="inline-block sm:block">
        {{ part }}<span v-if="key+1 < address.length" class="sm:hidden mr-1">,</span>
      </div>
      <div>
        <fa class="text-gray-400 text-sm" :icon="['fas', 'directions']" />
        <a :href="mapLink">{{ $t('page-learn-route') }}</a>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { LearnCardPayload } from '~/types/LearnTypes'

@Component
export default class LearnItem extends Vue {
    @Prop({ required: true, type: String }) readonly name: undefined
    @Prop({ required: true, type: String }) readonly city: undefined
    @Prop({ required: true, type: String }) readonly category: undefined

    @Prop([String, Object]) readonly desc! : LearnCardPayload['desc']
    @Prop([Array]) readonly address!: string[] | null
    @Prop(Object) readonly contact! : LearnCardPayload['contact']

    get descLocalized (): String {
        if (!this.desc) {
            return ''
        }
        return this.desc[this.$i18n.locale] ?? this.desc
    }

    get addressDivClass () {
        if (this.contact) {
            return ['col-span-5', 'border-l-2']
        }
        return ['col-span-12']
    }

    get hasAddress () {
        return Array.isArray(this.address) && this.address.length > 0
    }

    get mapLink () {
        return 'https://maps.google.com?q=' +
            encodeURI(this.address!.join(' '))
    }
}
</script>
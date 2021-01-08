<template>
  <div :class="contactDivClass">
    <h4 class="font-bold" :class="contactHeadlineClass">
      {{ $t('page-learn-contact') }}
    </h4>
    <div class="grid gap-2 gap-y-0" :class="contactContentClass">
      <div v-if="web">
        <span class="text-gray-400 text-sm inline-block w-5"><fa icon="link" /></span>
        <a target="_blank" :href="web">{{ webWithoutPrefix }}</a>
      </div>
      <div v-if="tel">
        <span class="text-gray-400 text-sm inline-block w-5"><fa icon="phone" /></span>
        <a target="_blank" :href="telLink">{{ telText }}</a>
      </div>
      <div v-if="mail">
        <span class="text-gray-400 text-sm inline-block w-5"><fa icon="envelope-open" /></span>
        <a target="_blank" @click="openMail">{{ mailEncoded }}</a>
      </div>
      <div v-if="facebook">
        <span class="text-gray-400 text-sm inline-block w-5"><fa :icon="['fab', 'facebook-f']" /></span>
        <a target="_blank" :href="facebook">Facebook</a>
      </div>
      <div v-if="instagram">
        <span class="text-gray-400 text-sm inline-block w-5"><fa :icon="['fab', 'instagram']" /></span>
        <a target="_blank" :href="instagram">Instagram</a>
      </div>
      <div v-if="youtube">
        <span class="text-gray-400 text-sm inline-block w-5"><fa :icon="['fab', 'youtube']" /></span>
        <a target="_blank" :href="youtube">Youtube</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
// import { encodeEmail, decodeEmail } from '~/helpers/EmailHelpers'

@Component
export default class LearnItemContact extends Vue {
    @Prop(Boolean) readonly fullwidth! : false
    @Prop(String) readonly web! : null | String
    @Prop(String) readonly tel! : null | String
    @Prop(String) readonly mail! : null | String
    @Prop([String || null]) readonly facebook! : null
    @Prop([String || null]) readonly instagram! : null
    @Prop([String || null]) readonly youtube! : null

    get contactDivClass () {
        if (this.fullwidth) {
            return ['col-span-12', 'flex', 'flex-col']
        }
        return [
            'flex', 'flex-col', 'col-span-12', 'sm:col-span-7', 'sm:border-r-2', 'broder-gray-100', 'pt-2'
        ]
    }

    get contactHeadlineClass () {
        if (this.fullwidth) {
            return []
        }
        return ['col-span-4']
    }

    get contactContentClass () {
        return [
            'sm:grid-cols-2', 'grid-cols-1', 'col-span-12', 'flex', 'flex-row', 'flex-wrap'
        ]
    }

    get webWithoutPrefix () {
        if (this.web === null) {
            return
        }
        const maxLength = 26
        const pretty = this.web.slice(this.web.indexOf('//') + 2)
        if (pretty.length < maxLength) {
            return pretty
        }
        return pretty.slice(0, maxLength) + '...'
    }

    get mailEncoded () {
        const [user, domain] = this.mail?.split('@') || ''
        return user.slice(0, 3) + '...(at)' + domain
    }

    openMail () {
        window.open('mailto:' + this.mail, '_blank')
    }

    get telLink () {
        if (this.tel !== null) {
            return 'tel://+49' + this.tel.replace('/', '').slice(1)
        }
        return ''
    }

    get telText (): String {
        if (!this.tel) {
            return ''
        }
        const [prefix, suffix] = this.tel?.split('/')
        const suffixParts = suffix.match(/.{1,2}/g) || [suffix]
        return prefix + ' / ' + suffixParts.join(' ')
    }
}
</script>

<template>
  <div
    class="
      border inline-block pl-5 text-sm sm:text-base sm:text-bold pr-2 py-1
      rounded-sm mr-2 mb-2 overflow-hidden transition-colors
    "
    :class="buttonStyles"
    @click="handleClick()"
  >
    <slot />
    <fa :class="iconClasses" icon="times" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

export interface ActivatorButtonEventPayloadInterface {
  name: string,
  active: Boolean
}

@Component
export default class ActivatorButton extends Vue {
    @Prop(String) readonly buttonLabel!: string | null
    @Prop(Boolean) readonly buttonActive!: false
    @Prop(Boolean) readonly buttonEnabled: boolean = true
    @Prop(String) readonly buttonStyle!: null

    handleClick () {
        this.$emit('activatorButtonChange', {
            name: this.buttonLabel,
            active: !this.buttonActive
        })
    }

    get iconClasses () {
        return [
            'ml-1', 'inline-block', 'relative', 'top-0.25', 'sm:top-0.5', 'bg-transparent', 'text-white', 'transition-opacity'
        ].concat(this.buttonActive ? ['opacity-100'] : ['opacity-0'])
    }

    get buttonStyles () {
        if (!this.buttonEnabled) {
            return {
                'cursor-not-allowed': true,
                'bg-gray-200': true,
                'border-gray-600': true,
                'opacity-80': true
            }
        }

        if (this.buttonStyle === 'reset') {
            return {
                'cursor-pointer': this.buttonEnabled,
                'border-red-400': this.buttonActive,
                'bg-red-600': this.buttonActive,
                'text-white': this.buttonActive
            }
        }

        return {
            'cursor-pointer': this.buttonEnabled,
            'border-teal-400': !this.buttonActive,
            'border-teal-600': this.buttonActive,
            'bg-gray-100': !this.buttonActive,
            'bg-teal-400': this.buttonActive,
            'text-white': this.buttonActive,
            'text-current': !this.buttonActive
        }
    }
}
</script>

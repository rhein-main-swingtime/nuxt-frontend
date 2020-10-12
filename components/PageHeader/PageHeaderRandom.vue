<template>
  <transition-group name="random-shit" mode="out-in">
    <!-- {{ randomShitPiece }} -->
    <span
      v-for="(shit, idx) in randomShitCollection"
      v-if="shit === stinkingShit"
      :key="idx + 'shit'"
      :class="[movement, staticClass]"
    >
      {{ shit }}
    </span>
  </transition-group>
</template>

<script>
export default {
    props: {
        randomShitCollection: {
            required: true,
            type: Array // array of strings
        },
        intervall: {
            required: true,
            type: Number
        },
        startAfter: {
            required: true,
            type: Number
        },
        movement: {
            required: true,
            type: String
        }
    },
    data () {
        return {
            fuckingTimer: null,
            staticClass: 'random-shit-element w-full leading-extra-tight',
            stinkingShit: null
        }
    },
    computed: {
    },
    beforeDestroy () {
        clearInterval(this.fuckingTimer)
    },
    created () {
        this.popAndFetchShit()
        setTimeout(this.createThatFucker, this.startAfter)
    },
    methods: {
        popAndFetchShit () {
            if (this.stinkingShit === null) { // initial value
                this.stinkingShit = this.randomShitCollection[0]
                return
            }

            const otherValues = this.randomShitCollection.filter(
                curVal => curVal !== this.stinkingShit
            )

            const idx = this.getRandomIndex(otherValues.length - 1)
            this.stinkingShit = otherValues[idx]
        },
        getRandomIndex (collectionSize) {
            return Math.round(Math.random() * collectionSize)
        },
        createThatFucker () {
            this.fuckingTimer = setInterval(() => {
                this.popAndFetchShit()
            }, this.intervall)
        }
    }
}
</script>

<style scoped lang="scss">

.random-shit-element {
    position: relative;
    transition: all 1s;
    display: inline-block;
}
.random-shit-enter, .random-shit-leave-to
/* .random-shit-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.random-shit-enter {
  transition-delay: .7s;
  &.right {
      transform: translateX(-30px);
  }
  &.left {
          transform: translateX(30px);
  }
}
.random-shit-leave-to {
    &.right {
        transform: translateX(30px);
    }
    &.left {
        transform: translateX(-30px);
    }
}
.random-shit-leave-active {
  position: absolute;
}
</style>

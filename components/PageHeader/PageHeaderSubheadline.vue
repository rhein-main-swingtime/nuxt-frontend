<template>
  <div class="">
    {{ text }}
    <div class="highlight" />
  </div>
</template>

<script>
export default {
    props: {
        text: {
            required: true,
            type: String
        },
        level: {
            required: true,
            default: 3,
            type: Number
        },
        highlight: {
            required: false,
            type: String,
            default: ''
        }
    },
    render: () => { return createElement('h1', this.text) }
}
</script>

<style scoped>
    .highlight {
        /* background-color: theme('green'); */
    }
</style>

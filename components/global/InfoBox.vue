<template>
  <div class="rms:infobox border rounded flex flex-row p-2 my-2">
    <div class="mr-4 ml-2 text-red-400">
      <fa icon="info" />
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

// <script lang="ts">
// import Vue from 'vue'
// import Component from 'vue-class-component'

// @Component
// export default class InfoBox extends Vue {
//     // template does it all
// }
// </script>

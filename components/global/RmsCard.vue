<template>
  <article class="rms-card border border-gray-400 mb-4 shadow-md p-4 gap-4 bg-white">
    <slot />
  </article>
</template>

<style lang="scss">
.rms-card.rectangular {
    padding: 0;
    padding-bottom: 100%;
    position: relative;
}
</style>

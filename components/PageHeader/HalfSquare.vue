<template>
  <div class="square absolute left-0 top-0 bottom-0 h-full w-auto block z-10 overflow-hidden">
    <div class="bg-white circle block absolute top-0 bottom-0 right-0 left-0 w-auto h-auto" />
  </div>
</template>

<style lang="scss" scoped="true">
    .square {
      padding-left: 28.5%;
      width: 0;
      border: 0;
      box-sizing: content-box;
      .circle {
          border-radius: 50%;
          transform: translateX(-50%);

      }
    }
</style>

<template>
  <div>
    <div v-for="(checked, name) in cities" class="dings" :class="{checked}">
      <label :for="'city-filter-'+encodeURI(name)" @click="$emit('change', [checked, name])">
        <input id="city-filter-'encodeURI(name)" type="checkbox" value="name" :checked="checked">
        {{ name }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

interface filterItem {
    [key: string]: boolean
}

@Component
export default class LearnItemsFilter extends Vue {
    @Prop(Object) cities: null | filterItem
}
</script>

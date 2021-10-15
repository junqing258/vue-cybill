<template>
  <button>
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ButtonTwo',
})
</script>

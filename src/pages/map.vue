<template>
  <div class="p-0.1">
    <Map />
    <button
      bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
      text="sm white"
      font="mono light"
      p="y-2 x-4"
      border="2 rounded blue-200"
      transform="translate-y-6"
    >
      Button
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {
    // Map: () => import('@/components/Map.vue'),
  },
})
</script>

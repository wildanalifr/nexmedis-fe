<template>
  <button
    :type="buttonType"
    :class="[
      'w-full bg-blue-500 hover:bg-blue-700 transition-colors rounded-md py-2 cursor-pointer text-white',
      classProps,
    ]"
  >
    {{ buttonName }}
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  buttonName: { type: String },
  buttonType: { type: String },
  classProps: { type: String },
})
</script>

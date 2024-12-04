<template>
  <div class="relative">
    <div
      v-if="isOpenAlert"
      class="fixed bg-red-400 top-4 right-4 max-w-xs px-7 py-2 rounded-lg shadow-md text-white transition-transform transform duration-300 ease-in-out"
    >
      {{ msgAlert.toLocaleUpperCase() }}
    </div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useAlertStore } from './stores/alert'
import { storeToRefs } from 'pinia'

const { isOpenAlert, msgAlert } = storeToRefs(useAlertStore())
// const { isOpenAlert } = storeToRefs(alertStore)

// const { isOpenAlert } = useAlertStore()
// const { isOpenAlert } = storeToRefs(alertStore)

// console.log('isOpenAlert,', isOpenAlert)

// watch(
//   () => isOpenAlert,
//   (newValue) => {
//     console.log('Alert state changed:', newValue)
//   },
// )
</script>

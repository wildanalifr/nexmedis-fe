<script setup lang="ts">
import MenuDesktop from './MenuDesktop.vue'
import MenuMobile from './MenuMobile.vue'
</script>

<template>
  <div className="flex justify-between items-center px-4 pt-2 max-w-5xl mx-auto text-white">
    <h3 className="text-3xl font-semibold">Healthy</h3>
    <MenuMobile classProp="block md:hidden" />
    <MenuDesktop classProp="hidden md:flex" />
  </div>
</template>

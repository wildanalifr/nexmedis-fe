<template>
  <section class="py-16 bg-gray-100" id="specialist">
    <div class="container mx-auto px-6">
      <h2 class="text-4xl font-bold text-center text-gray-800 mb-12">Our Specialists</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="specialist in users"
          :key="specialist.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div class="p-6 flex flex-col items-center">
            <img
              :src="specialist.avatar"
              :alt="specialist.first_name"
              class="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h3 class="text-xl font-semibold text-gray-800">
              dr. {{ specialist.first_name }} {{ specialist.last_name }}
            </h3>
            <p class="text-gray-600">{{ specialist.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { tUser } from '@/model/user'
import { defineProps } from 'vue'

defineProps<{
  users: tUser[]
}>()
</script>

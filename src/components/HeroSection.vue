<template>
  <section id="hero" class="relative w-full h-screen">
    <div class="absolute top-0 left-0 right-0 z-20">
      <NavbarSection />
    </div>

    <!-- Full-screen background image -->
    <img
      src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1200&auto=format&fit=crop&q=60"
      alt="Healthy lifestyle image"
      class="w-full h-full object-cover"
    />
    <!-- Overlay with text -->
    <div
      class="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white px-6"
    >
      <h2 class="text-4xl md:text-6xl font-extrabold text-center drop-shadow-lg mb-4">
        Welcome, {{ user.first_name }} {{ user.last_name }}
      </h2>
      <p class="text-lg md:text-2xl text-center max-w-2xl leading-relaxed drop-shadow-md my-2">
        Welcome to Healthy, Access top-tier health consultation services from leading professionals
        in Indonesia. Your well-being is our priority.
      </p>
      <button
        class="mt-8 px-6 py-3 bg-green-500 hover:bg-green-600 transition-colors text-white rounded-full text-lg font-medium shadow-md"
      >
        Book a Consultation
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { tUser } from '@/model/user'
import NavbarSection from './NavbarSection.vue'

defineProps<{
  user: tUser
}>()
</script>

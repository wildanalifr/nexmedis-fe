<template>
  <section class="py-16 bg-gray-50" id="news">
    <div class="container mx-auto px-6">
      <h2 class="text-4xl font-bold text-center text-gray-800 mb-12">Latest News</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- News Card -->
        <div
          v-for="newsItem in news"
          :key="newsItem.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
        >
          <img :src="newsItem.imageUrl" :alt="newsItem.headline" class="w-full h-48 object-cover" />
          <div class="p-6">
            <h3 class="text-2xl font-semibold text-gray-800 mb-4">{{ newsItem.headline }}</h3>
            <p class="text-gray-600 mb-4">{{ newsItem.summary }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in newsItem.tags"
                :key="tag"
                class="text-sm text-blue-600 bg-blue-100 rounded-full px-3 py-1"
              >
                {{ tag }}
              </span>
            </div>
            <p class="mt-4 text-sm text-gray-500">
              Category: <span class="font-semibold">{{ newsItem.category }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const news = ref([
  {
    id: 1,
    headline: 'Health Consultations Reach New Heights',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1699577272317-a64e1eaaa9c8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhbHRoeXxlbnwwfHwwfHx8MA%3D%3D',
    summary:
      'More people are seeking online consultations for health issues, ensuring safe and accessible medical advice.',
    tags: ['Telemedicine', 'Health'],
    category: 'Online Health',
  },
  {
    id: 2,
    headline: 'Advancements in Telemedicine',
    imageUrl:
      'https://images.unsplash.com/photo-1485527172732-c00ba1bf8929?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGVhbHRoeXxlbnwwfHwwfHx8MA%3D%3D',
    summary:
      'New technologies are making telemedicine more efficient and reliable, benefiting patients worldwide.',
    tags: ['Technology', 'Medicine'],
    category: 'Tech in Healthcare',
  },
  {
    id: 3,
    headline: 'Healthy Living Tips for 2024',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1661920538067-c48451160c72?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z3ltfGVufDB8fDB8fHww',
    summary: 'Experts share their top tips for maintaining a healthy lifestyle in the coming year.',
    tags: ['Wellness', 'Lifestyle'],
    category: 'Healthy Living',
  },
])
</script>

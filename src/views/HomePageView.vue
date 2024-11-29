<script setup lang="ts">
import FooterSection from '@/components/FooterSection.vue'
import HeroSection from '@/components/HeroSection.vue'
import NewsSection from '@/components/NewsSection.vue'
import SpecialistSection from '@/components/SpecialistSection.vue'
import { useUserStore } from '@/stores/user'
import { useUserViewModel } from '@/view-model/user'
import { onMounted } from 'vue'

const { fetchAllUsers, users } = useUserViewModel()

const { userData } = useUserStore()

onMounted(() => {
  fetchAllUsers()
})
</script>

<template>
  <HeroSection :user="userData!" />
  <SpecialistSection :users="users" />
  <NewsSection />
  <FooterSection />
</template>

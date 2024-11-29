<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps({
  classProp: String,
})

const router = useRouter()

const handleLogout = () => {
  router.push({ name: 'login' })
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
</script>

<template>
  <nav :class="['items-center justify-between gap-x-10', classProp]">
    <li class="list-none">
      <a class="text-base hover:underline" href="#specialist">Specialist</a>
    </li>
    <li class="list-none">
      <a class="text-base hover:underline" href="#news">News</a>
    </li>

    <li class="list-none">
      <a @click.prevent="handleLogout" class="text-base hover:underline cursor-pointer">Logout</a>
    </li>
  </nav>
</template>

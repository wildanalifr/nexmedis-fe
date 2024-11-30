<script setup lang="ts">
import { ref } from 'vue'
import { Bars3Icon } from '@heroicons/vue/24/solid'
import { useRouter } from 'vue-router'

const isOpen = ref(false)
const router = useRouter()

const handleIsOpen = () => {
  isOpen.value = !isOpen.value
}

defineProps({
  classProp: String,
})

const handleLogout = () => {
  router.push({ name: 'login' })
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
</script>

<template>
  <div :class="classProp">
    <Bars3Icon @click.prevent="handleIsOpen" class="size-12 text-white cursor-pointer" />

    <nav
      :class="[
        'absolute left-0 top-16 z-10 w-full h-[100vh] bg-white flex flex-col items-center justify-center gap-10 text-3xl transition-all transform text-gray-800',
        isOpen ? 'translate-x-0' : 'translate-x-full',
      ]"
    >
      <li class="list-none">
        <a @click="handleIsOpen" class="text-2xl hover:underline" href="#specialist">Specialist</a>
      </li>
      <li class="list-none">
        <a @click="handleIsOpen" class="text-2xl hover:underline" href="#news">News</a>
      </li>

      <li class="list-none">
        <a @click.prevent="handleLogout" class="text-2xl hover:underline cursor-pointer">Logout</a>
      </li>
    </nav>
  </div>
</template>

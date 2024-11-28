<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useUserViewModel } from '@/view-model/user'
import { onMounted } from 'vue'

const { fetchAllUsers, users, userCount } = useUserViewModel()

console.log('anu', users.value)
console.log('count', userCount.value)

const { userData } = useUserStore()

onMounted(() => {
  fetchAllUsers()
})
</script>

<template>
  <main>
    <p>home page wiwkwk</p>
    <h3>selamat datang... {{ userData?.first_name }} {{ userData?.last_name }}</h3>
    <ul>
      <li>anuuu</li>
      <li v-for="user in users" :key="user.id">
        <p>{{ user.id }}</p>
        {{ user.email }}
      </li>
    </ul>
  </main>
</template>

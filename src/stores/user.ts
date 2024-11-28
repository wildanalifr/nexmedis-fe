import type { tUser } from '@/model/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const userData = ref<tUser | null>(null)

    function setUserData(user: tUser) {
      userData.value = user
    }

    return { userData, setUserData }
  },
  {
    persist: {
      storage: localStorage,
      pick: ['userData'],
    },
  },
)

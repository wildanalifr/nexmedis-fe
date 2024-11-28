import type { tUser } from '@/model/user'
import { UserService } from '@/services/user'
import { computed, ref } from 'vue'

export function useUserViewModel() {
  // State
  const users = ref<tUser[]>([])
  const selectedUser = ref<tUser | null>(null)
  const loading = ref(false)
  const error = ref<null | string>(null)

  // Computed properties
  const userCount = computed(() => users.value.length)
  const hasUsers = computed(() => userCount.value > 0)

  async function fetchAllUsers() {
    loading.value = true
    error.value = null
    try {
      const response = await UserService.fetchUsers()
      users.value = response
      console.log('users.value', users.value)
    } catch (err) {
      error.value = 'Failed to fetch users'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    selectedUser,
    loading,
    error,
    userCount,
    hasUsers,
    fetchAllUsers,
  }
}

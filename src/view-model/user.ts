import type { tUser } from '@/model/user'
import { UserService } from '@/services/user'
import { ref } from 'vue'

export function useUserViewModel() {
  // State
  const users = ref<tUser[]>([])
  const selectedUser = ref<tUser | null>(null)
  const loading = ref(false)
  const error = ref<null | string>(null)

  function setSelectedUser({ userProp }: { userProp: tUser }) {
    selectedUser.value = userProp
  }

  async function fetchAllUsers() {
    loading.value = true
    error.value = null
    try {
      const response = await UserService.fetchUsers()
      users.value = response
      loading.value = false
    } catch (err) {
      error.value = 'Failed to fetch users'
      loading.value = false
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function saveUser({ nameProp, jobProp }: { nameProp: string; jobProp: string }) {
    loading.value = true
    error.value = null

    try {
      await UserService.addUser({ nameProp, jobProp })
      fetchAllUsers()
      loading.value = false
    } catch (err) {
      error.value = 'Failed to fetch users'
      loading.value = false
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function editUser({
    nameProp,
    jobProp,
    id,
  }: {
    nameProp: string
    jobProp: string
    id: number
  }) {
    loading.value = true
    error.value = null

    try {
      await UserService.editUser({ nameProp, jobProp, id })
      fetchAllUsers()
      loading.value = false
    } catch (err) {
      error.value = 'Failed to fetch users'
      loading.value = false
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function deleteUser({ id }: { id: number }) {
    loading.value = true
    error.value = null

    try {
      await UserService.deleteUser({ id })
      fetchAllUsers()
      loading.value = false
    } catch (err) {
      error.value = 'Failed to fetch users'
      loading.value = false
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
    fetchAllUsers,
    saveUser,
    setSelectedUser,
    editUser,
    deleteUser,
  }
}

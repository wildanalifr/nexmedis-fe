import { API } from '@/api'
import type { tUser } from '@/model/user'

export const UserService = {
  fetchUsers: async () => {
    try {
      const response = await fetch(`${API}/users`)
      const data = await response.json()
      return data.data as tUser[]
    } catch (error) {
      console.error('Error fetching users:', error)
      return []
    }
  },
}

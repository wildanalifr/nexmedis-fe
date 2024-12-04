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

  addUser: async ({ nameProp, jobProp }: { nameProp: string; jobProp: string }) => {
    try {
      const response = await fetch(`${API}/user`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: nameProp, job: jobProp }),
      })
      const data = await response.json()
      const userData: tUser = {
        id: data.id,
        first_name: data.name,
        last_name: data.name,
        avatar: '',
        email: 'email.com',
      }
      return userData
    } catch (error) {
      console.error('Error fetching users:', error)
      return null
    }
  },

  editUser: async ({
    nameProp,
    jobProp,
    id,
  }: {
    nameProp: string
    jobProp: string
    id: number
  }) => {
    try {
      const response = await fetch(`${API}/user/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: nameProp, job: jobProp }),
      })
      const data = await response.json()
      const userData: tUser = {
        id: data.id,
        first_name: data.name,
        last_name: data.name,
        avatar: '',
        email: 'email.com',
      }
      return userData
    } catch (error) {
      console.error('Error fetching users:', error)
      return null
    }
  },

  deleteUser: async ({ id }: { id: number }) => {
    try {
      await fetch(`${API}/user/${id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.error('Error fetching users:', error)
      return null
    }
  },
}

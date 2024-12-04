<template>
  <div class="container mx-auto p-4 max-w-5xl">
    <div v-if="loading" class="text-center">
      <p class="text-lg font-semibold">Loading...</p>
    </div>

    <div v-else class="mt-20">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-lg font-semibold">Users table</h4>
        <button
          @click="openModal"
          class="bg-orange-500 hover:bg-orange-400 transition-colors rounded-md px-5 py-1 text-white"
        >
          Add
        </button>
      </div>

      <!-- Search Input -->
      <div class="mb-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search users..."
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <!-- Table -->
      <div v-if="filteredUsers.length === 0" class="text-center">
        <p class="text-red-500 font-semibold">No data found, cuy!</p>
      </div>

      <div v-else>
        <table
          class="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md"
        >
          <thead class="bg-gray-200">
            <tr>
              <th class="py-2 px-4 text-left">No.</th>
              <th class="py-2 px-4 text-left">Avatar</th>
              <th class="py-2 px-4 text-left">Name</th>
              <th class="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in filteredUsers"
              :key="user?.id"
              class="hover:bg-gray-100 border border-solid border-[#ddd]"
            >
              <td class="py-2 px-4">{{ index + 1 }}</td>
              <td class="py-2 px-4 flex items-start justify-items-start justify-start">
                <img :src="user.avatar" alt="User Avatar" class="w-10 h-10 rounded-full" />
              </td>
              <td class="py-2 px-4">{{ user.first_name }} {{ user.last_name }}</td>
              <td class="py-2 px-4 flex items-center justify-start gap-x-3">
                <button
                  @click="editUserAction(user)"
                  class="bg-blue-500 rounded-xl hover:bg-blue-600 text-white px-5 py-1"
                >
                  Edit
                </button>

                <button
                  @click="() => deleteUserAction(user)"
                  class="bg-red-500 rounded-xl hover:bg-red-600 text-white px-5 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <ModalUser
    :is-open-prop="isOpenProp"
    :close-modal-prop="closeModal"
    :is-edit-prop="isEditProp"
    :user-prop="selectedUser!"
  />
  <ModalUserDelete
    :is-open-prop="isOpenDelete"
    :close-modal-prop="closeModalDelete"
    :user-prop="selectedUser!"
  />
</template>

<script setup lang="ts">
import ModalUser from '@/components/ModalUser.vue'
import ModalUserDelete from '@/components/ModalUserDelete.vue'
import type { tUser } from '@/model/user'
import { useUserViewModel } from '@/view-model/user'
import { computed, onMounted, ref } from 'vue'

const { fetchAllUsers, users, loading } = useUserViewModel()
const searchQuery = ref<string>('')

const filteredUsers = computed(() => {
  return users.value.filter((user) =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const { setSelectedUser, selectedUser } = useUserViewModel()

onMounted(() => {
  fetchAllUsers()
})

const deleteUserAction = async (user: tUser) => {
  setSelectedUser({ userProp: user })
  openModalDelete()
}

const editUserAction = async (user: tUser) => {
  isEditProp.value = true
  setSelectedUser({ userProp: user })
  openModal()
}

const isEditProp = ref<boolean>(false)
const isOpenProp = ref<boolean>(false)
const openModal = () => (isOpenProp.value = true)
const closeModal = (data: boolean) => (isOpenProp.value = data)

const isOpenDelete = ref<boolean>(false)
const openModalDelete = () => (isOpenDelete.value = true)
const closeModalDelete = (data: boolean) => (isOpenDelete.value = data)
</script>

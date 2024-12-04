<template>
  <TransitionRoot appear :show="isOpenProp" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                Delete User
              </DialogTitle>
              <div class="mt-2">
                <p class="my-2 text-base text-gray-500">Are you sure to delete this user?</p>
                <button
                  @click.prevent="deleteUser"
                  class="bg-red-500 hover:bg-red-600 text-white rounded-lg px-7 py-2"
                >
                  Delete
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { useAlertStore } from '@/stores/alert'
import { useUserViewModel } from '@/view-model/user'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const props = defineProps({
  isOpenProp: {
    type: Boolean,
    required: true,
  },
  closeModalProp: {
    type: Function,
    required: true,
  },
  userProp: {
    type: Object,
    requred: true,
  },
})

const { deleteUser: deleteUserAction } = useUserViewModel()
const { setOpenAlert } = useAlertStore()

const closeModal = () => {
  props.closeModalProp(false)
}

const deleteUser = async () => {
  try {
    await deleteUserAction({ id: props.userProp?.id })
    setOpenAlert('Berhasil Hapus')
    closeModal()
  } catch (error) {
    console.log('error', error)
  }
}
</script>

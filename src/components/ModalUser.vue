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
                {{ props.isEditProp ? 'Edit' : 'Add' }} User
              </DialogTitle>
              <div class="mt-2">
                <form @submit.prevent="onSubmit" class="space-y-3">
                  <InputForm
                    v-model="name"
                    label="Name User"
                    name="name"
                    type="text"
                    placeholder="Enter user name"
                    :binding="nameAttrs"
                  />

                  <div v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</div>

                  <InputForm
                    v-model="job"
                    label="Job"
                    name="job"
                    type="text"
                    placeholder="Enter user job"
                    :binding="jobAttrs"
                  />

                  <div v-if="errors.job" class="text-red-500 text-sm">
                    {{ errors.job }}
                  </div>

                  <ButtonInput buttonName="Submit" buttonType="submit" class="" />
                </form>
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
import { useForm } from 'vee-validate'
import * as Yup from 'yup'
import ButtonInput from './ButtonInput.vue'
import InputForm from './InputForm.vue'
import { watch } from 'vue'

const props = defineProps({
  isOpenProp: {
    type: Boolean,
    required: true,
  },
  closeModalProp: {
    type: Function,
    required: true,
  },
  isEditProp: {
    type: Boolean,
    required: true,
  },
  userProp: {
    type: Object,
    requred: false,
  },
})

interface UserForm {
  name: string
  job: string
}

const { handleSubmit, errors, defineField, resetForm, setValues } = useForm<UserForm>({
  // initialValues: {
  //   name: (props.isEditProp && props.userProp?.first_name + props.userProp?.last_name) || '',
  //   job: 'jobssx',
  // },
  validationSchema: Yup.object({
    name: Yup.string().required('Name is required'),
    job: Yup.string().required('Job is required'),
  }),
})

const closeModal = () => {
  props.closeModalProp(false)
  resetForm()
}

const { setOpenAlert } = useAlertStore()
const { saveUser, editUser } = useUserViewModel()

watch(
  () => props.userProp,
  (newUser) => {
    if (newUser && props.isEditProp) {
      setValues({
        name: newUser?.first_name || '',
        job: 'jobs',
      })
    }
  },
)

const onSubmit = handleSubmit(async (values) => {
  if (props.isEditProp) {
    try {
      await editUser({ nameProp: values.name, jobProp: values.job, id: props.userProp?.id })
      setOpenAlert('Berhasil Update')
      closeModal()
    } catch (error) {
      console.log('error', error)
    }
  } else {
    try {
      await saveUser({ nameProp: values.name, jobProp: values.job })
      setOpenAlert('Berhasil Create')
      closeModal()
    } catch (error) {
      console.log('error', error)
    }
  }
})

const [name, nameAttrs] = defineField('name')
const [job, jobAttrs] = defineField('job')
</script>

<!-- eslint-disable vue/no-parsing-error -->
<script setup lang="ts">
import InputForm from '../components/InputForm.vue'
import ButtonInput from '../components/ButtonInput.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

import { useForm } from 'vee-validate'
import * as Yup from 'yup'
import { UserService } from '@/services/user'

interface LoginForm {
  email: string
  password: string
}

interface LoginResponse {
  token: string
}

const router = useRouter()
const { setUserData } = useUserStore()

const { handleSubmit, errors, defineField } = useForm<LoginForm>({
  validationSchema: Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  }),
})

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: values.email, password: values.password }),
    })

    const data: LoginResponse = await response.json()
    localStorage.setItem('token', data.token)
    const allUser = await UserService.fetchUsers()
    const selectedUser = allUser.filter((item) => item.email === values.email)
    console.log('selectedUser', selectedUser[0])

    if (selectedUser.length) {
      setUserData(selectedUser[0])
      router.push({ name: 'homepage' })
    }
  } catch (error) {
    console.log('error', error)
  }
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
</script>

<template>
  <div class="login min-h-screen flex justify-center items-center">
    <div class="hidden lg:block">
      <img
        src="https://cdn.dribbble.com/userupload/7688436/file/original-0a0cdcf725b83fb74cae366b43f947a3.jpg?resize=1504x1128&vertical=center"
      />
    </div>
    <div class="max-w-md md:max-w-lg w-full mx-5 md:mx-10">
      <h3 class="text-center text-3xl font-semibold mb-10">Login</h3>
      <form @submit.prevent="onSubmit" class="space-y-3">
        <InputForm
          v-model="email"
          label="Email"
          name="email"
          placeholder="Enter your email"
          :binding="emailAttrs"
          type="email"
        />

        <div v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</div>

        <InputForm
          v-model="password"
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          :binding="passwordAttrs"
        />

        <div v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</div>

        <ButtonInput buttonName="Submit" buttonType="submit" class="!mt-8" />
      </form>
    </div>
  </div>
</template>

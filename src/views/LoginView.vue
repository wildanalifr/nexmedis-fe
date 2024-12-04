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
    await localStorage.setItem('token', data.token)

    const isLocaStorage = localStorage.getItem('token')

    if (isLocaStorage) {
      await router.push('/homepage')
    }

    const allUser = await UserService.fetchUsers()
    const selectedUser = allUser.filter((item) => item.email === values.email)
    setUserData(selectedUser[0])
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
        src="https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

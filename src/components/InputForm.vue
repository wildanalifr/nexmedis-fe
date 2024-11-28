<template>
  <div class="flex flex-col gap-1">
    <label :for="name" class="text-base font-normal">{{ label }}</label>

    <div class="relative">
      <input
        :id="name"
        :type="type !== 'password' ? type : isShowPassword ? 'text' : 'password'"
        :value="modelValue"
        v-bind="binding"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        class="border border-gray-300 rounded-md px-2 py-2 w-full"
      />
      <button
        type="button"
        @click.prevent="togglePassword"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
        v-if="type === 'password'"
      >
        <EyeIcon v-if="isShowPassword" class="w-5 h-5 text-sm text-blue-500" />
        <EyeSlashIcon v-else class="w-5 h-5 text-sm text-blue-500" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'

defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  binding: { type: Object, default: () => ({}) },
  modelValue: { type: String, default: '' },
})

// const emit = defineEmits(['update:modelValue'])

const isShowPassword = ref(true)

function togglePassword() {
  isShowPassword.value = !isShowPassword.value
}
</script>

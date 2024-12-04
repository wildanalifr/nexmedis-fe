import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAlertStore = defineStore('alert', () => {
  const isOpenAlert = ref(false)
  const msgAlert = ref<string>('')

  function setOpenAlert(msgAlertProp: string) {
    isOpenAlert.value = true
    msgAlert.value = msgAlertProp

    setTimeout(() => {
      isOpenAlert.value = false
      msgAlert.value = ''
    }, 2000)
  }

  function setCloseAlert() {
    isOpenAlert.value = false
  }

  return { isOpenAlert, setOpenAlert, setCloseAlert, msgAlert }
})

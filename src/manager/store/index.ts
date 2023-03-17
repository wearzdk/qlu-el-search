import { createPinia } from 'pinia'

const store = createPinia()

export type TransferOption = {
  label: string
  value: string
}

export default store

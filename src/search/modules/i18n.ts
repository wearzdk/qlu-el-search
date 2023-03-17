import { createI18n } from 'vue-i18n'
import { type UserModule } from '../types'

// Setup Pinia
// https://pinia.esm.dev/
export const install: UserModule = ({ app }) => {
  // i18n

  const messages = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.entries(import.meta.glob<{ default: any }>('../../locales/*.yml', { eager: true })).map(([key, value]) => {
      return [key.replace(/\.yml$/, '').replace(/.*\//, ''), value.default]
    }),
  )

  const locale = useStorage('locale', navigator.language)

  const i18n = createI18n({
    legacy: false,
    locale: locale.value,
    messages,
  })

  app.use(i18n)
}

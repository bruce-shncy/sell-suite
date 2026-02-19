import { useLocalStorage, usePreferredDark } from '@vueuse/core'
import { computed, watch } from 'vue'

export type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const prefersDark = usePreferredDark()
  const storedTheme = useLocalStorage<Theme>('sellsuite-theme', 'system')

  const isDark = computed(() => {
    if (storedTheme.value === 'system') {
      return prefersDark.value
    }
    return storedTheme.value === 'dark'
  })

  const theme = computed(() => storedTheme.value)

  function setTheme(newTheme: Theme) {
    storedTheme.value = newTheme
  }

  function toggleTheme() {
    if (storedTheme.value === 'light') {
      storedTheme.value = 'dark'
    } else if (storedTheme.value === 'dark') {
      storedTheme.value = 'system'
    } else {
      storedTheme.value = 'light'
    }
  }

  watch(
    isDark,
    (dark) => {
      if (dark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    { immediate: true }
  )

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  }
}

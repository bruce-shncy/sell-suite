<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Search, Sun, Moon, Monitor, Menu, LogOut, Settings, User } from 'lucide-vue-next'
import { ref } from 'vue'

import type { Theme } from '@/composables/useTheme'

import MobileSidebar from '@/components/shared/mobile-sidebar.vue'
import UiAvatarFallback from '@/components/ui/avatar-fallback.vue'
import UiAvatar from '@/components/ui/avatar.vue'
import UiButton from '@/components/ui/button.vue'
import UiDropdownMenuContent from '@/components/ui/dropdown-menu-content.vue'
import UiDropdownMenuItem from '@/components/ui/dropdown-menu-item.vue'
import UiDropdownMenuLabel from '@/components/ui/dropdown-menu-label.vue'
import UiDropdownMenuSeparator from '@/components/ui/dropdown-menu-separator.vue'
import UiDropdownMenuTrigger from '@/components/ui/dropdown-menu-trigger.vue'
import UiDropdownMenu from '@/components/ui/dropdown-menu.vue'
import UiInput from '@/components/ui/input.vue'
import UiSheetContent from '@/components/ui/sheet-content.vue'
import UiSheetTrigger from '@/components/ui/sheet-trigger.vue'
import UiSheet from '@/components/ui/sheet.vue'
import { useTheme } from '@/composables/useTheme'

const { theme, setTheme } = useTheme()

const searchQuery = ref('')
const mobileMenuOpen = ref(false)

const themeOptions: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
]
</script>

<template>
  <header
    class="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <!-- Mobile Menu Button -->
    <ui-sheet v-model:open="mobileMenuOpen">
      <ui-sheet-trigger>
        <ui-button variant="ghost" size="icon" class="md:hidden">
          <menu class="h-5 w-5" />
          <span class="sr-only">Toggle menu</span>
        </ui-button>
      </ui-sheet-trigger>
      <ui-sheet-content side="left" class="w-64 p-0">
        <mobile-sidebar @navigate="mobileMenuOpen = false" />
      </ui-sheet-content>
    </ui-sheet>

    <!-- Search -->
    <div class="relative flex-1 md:max-w-sm">
      <search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <ui-input v-model="searchQuery" type="search" placeholder="Search..." class="pl-9" />
    </div>

    <div class="flex items-center gap-2 ml-auto">
      <!-- Theme Toggle -->
      <ui-dropdown-menu>
        <ui-dropdown-menu-trigger>
          <ui-button variant="ghost" size="icon">
            <sun v-if="theme === 'light'" class="h-5 w-5" />
            <moon v-else-if="theme === 'dark'" class="h-5 w-5" />
            <monitor v-else class="h-5 w-5" />
            <span class="sr-only">Toggle theme</span>
          </ui-button>
        </ui-dropdown-menu-trigger>
        <ui-dropdown-menu-content align="end">
          <ui-dropdown-menu-item
            v-for="option in themeOptions"
            :key="option.value"
            @click="setTheme(option.value)"
          >
            <component :is="option.icon" class="mr-2 h-4 w-4" />
            {{ option.label }}
          </ui-dropdown-menu-item>
        </ui-dropdown-menu-content>
      </ui-dropdown-menu>

      <!-- User Menu -->
      <ui-dropdown-menu>
        <ui-dropdown-menu-trigger>
          <ui-button variant="ghost" class="relative h-9 w-9 rounded-full">
            <ui-avatar class="h-9 w-9">
              <ui-avatar-fallback>JD</ui-avatar-fallback>
            </ui-avatar>
          </ui-button>
        </ui-dropdown-menu-trigger>
        <ui-dropdown-menu-content align="end" class="w-56">
          <ui-dropdown-menu-label class="font-normal">
            <div class="flex flex-col space-y-1">
              <p class="text-sm font-medium leading-none">John Doe</p>
              <p class="text-xs leading-none text-muted-foreground">john@sellsuite.com</p>
            </div>
          </ui-dropdown-menu-label>
          <ui-dropdown-menu-separator />
          <ui-dropdown-menu-item>
            <user class="mr-2 h-4 w-4" />
            Profile
          </ui-dropdown-menu-item>
          <ui-dropdown-menu-item>
            <settings class="mr-2 h-4 w-4" />
            Settings
          </ui-dropdown-menu-item>
          <ui-dropdown-menu-separator />
          <ui-dropdown-menu-item>
            <log-out class="mr-2 h-4 w-4" />
            Log out
          </ui-dropdown-menu-item>
        </ui-dropdown-menu-content>
      </ui-dropdown-menu>
    </div>
  </header>
</template>

<script setup lang="ts">
import { LayoutDashboard, Package, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { cn } from '@/lib/utils'

interface Props {
  collapsed?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:collapsed': [value: boolean]
}>()

const route = useRoute()

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Products', href: '/products', icon: Package },
]

const isActive = (href: string) => {
  if (href === '/') {
    return route.path === '/' || route.path === '/dashboard'
  }
  return route.path.startsWith(href)
}

const sidebarWidth = computed(() => (props.collapsed ? 'w-16' : 'w-64'))
</script>

<template>
  <aside
    :class="
      cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col border-r bg-background transition-all duration-300',
        sidebarWidth
      )
    "
  >
    <!-- Logo -->
    <div class="flex h-16 items-center border-b px-4">
      <div class="flex items-center gap-2">
        <div
          class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
        >
          <span class="text-sm font-bold">S</span>
        </div>
        <span v-if="!collapsed" class="text-lg font-semibold tracking-tight"> SellSuite </span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 space-y-1 p-2">
      <router-link
        v-for="item in navItems"
        :key="item.href"
        :to="item.href"
        :class="
          cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            isActive(item.href)
              ? 'bg-secondary text-secondary-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            collapsed && 'justify-center px-2'
          )
        "
      >
        <component :is="item.icon" class="h-5 w-5 shrink-0" />
        <span v-if="!collapsed">{{ item.name }}</span>
      </router-link>
    </nav>

    <!-- Collapse Toggle -->
    <div class="border-t p-2">
      <button
        class="flex w-full items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        @click="emit('update:collapsed', !collapsed)"
      >
        <chevron-left v-if="!collapsed" class="h-5 w-5" />
        <chevron-right v-else class="h-5 w-5" />
      </button>
    </div>
  </aside>
</template>

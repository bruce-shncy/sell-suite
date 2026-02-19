<script setup lang="ts">
import { LayoutDashboard, Package } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

import { cn } from '@/lib/utils'

const emit = defineEmits<{
  navigate: []
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
</script>

<template>
  <div class="flex h-full flex-col">
    <!-- Logo -->
    <div class="flex h-16 items-center border-b px-6">
      <div class="flex items-center gap-2">
        <div
          class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
        >
          <span class="text-sm font-bold">S</span>
        </div>
        <span class="text-lg font-semibold tracking-tight">SellSuite</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 space-y-1 p-4">
      <router-link
        v-for="item in navItems"
        :key="item.href"
        :to="item.href"
        :class="
          cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            isActive(item.href)
              ? 'bg-secondary text-secondary-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          )
        "
        @click="emit('navigate')"
      >
        <component :is="item.icon" class="h-5 w-5 shrink-0" />
        <span>{{ item.name }}</span>
      </router-link>
    </nav>
  </div>
</template>

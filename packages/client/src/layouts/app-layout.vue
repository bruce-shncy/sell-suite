<script setup lang="ts">
import { ref, computed } from 'vue'

import AppSidebar from '@/components/shared/app-sidebar.vue'
import AppTopbar from '@/components/shared/app-topbar.vue'

const sidebarCollapsed = ref(false)

const mainPadding = computed(() => (sidebarCollapsed.value ? 'md:pl-16' : 'md:pl-64'))
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Desktop Sidebar -->
    <app-sidebar v-model:collapsed="sidebarCollapsed" class="hidden md:flex" />

    <!-- Main Content -->
    <div :class="['flex min-h-screen flex-col transition-all duration-300', mainPadding]">
      <app-topbar />
      <main class="flex-1 p-4 md:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

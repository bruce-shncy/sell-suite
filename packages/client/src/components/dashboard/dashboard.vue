<script setup lang="ts">
import { ref, onMounted } from 'vue'

import DueToday from '@/components/dashboard/due-today.vue'
import KpiRow from '@/components/dashboard/kpi-row.vue'
import RecentOrders from '@/components/dashboard/recent-orders.vue'
import PageHeader from '@/components/shared/page-header.vue'

const loading = ref(true)

onMounted(() => {
  // Simulate loading
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<template>
  <div class="space-y-6">
    <page-header title="Dashboard" description="Overview of your store performance" />

    <kpi-row :loading="loading" />

    <div class="grid gap-6 lg:grid-cols-3">
      <div class="lg:col-span-2">
        <recent-orders :loading="loading" />
      </div>
      <div>
        <due-today :loading="loading" />
      </div>
    </div>
  </div>
</template>

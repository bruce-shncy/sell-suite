<script setup lang="ts">
import { DollarSign, CreditCard, Wallet, AlertTriangle } from 'lucide-vue-next'

import StatCard from '@/components/shared/stat-card.vue'
import { dashboardStats, formatCurrency } from '@/mock/data'

interface Props {
  loading?: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <stat-card
      title="Today's Sales"
      :value="formatCurrency(dashboardStats.todaysSales)"
      :icon="DollarSign"
      :trend="{ value: 12.5, isPositive: true }"
      :loading="loading"
    />
    <stat-card
      title="Collections Today"
      :value="formatCurrency(dashboardStats.collectionsToday)"
      :icon="CreditCard"
      :trend="{ value: 8.2, isPositive: true }"
      :loading="loading"
    />
    <stat-card
      title="Outstanding Balance"
      :value="formatCurrency(dashboardStats.outstandingBalance)"
      :icon="Wallet"
      :loading="loading"
    />
    <stat-card
      title="Overdue Accounts"
      :value="String(dashboardStats.overdueAccounts)"
      :icon="AlertTriangle"
      :trend="{ value: 2, isPositive: false }"
      :loading="loading"
    />
  </div>
</template>

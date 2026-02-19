<script setup lang="ts">
import type { Column } from '@/components/shared/data-table.vue'
import type { Order } from '@/mock/data'

import DataTable from '@/components/shared/data-table.vue'
import UiBadge from '@/components/ui/badge.vue'
import UiCardContent from '@/components/ui/card-content.vue'
import UiCardHeader from '@/components/ui/card-header.vue'
import UiCardTitle from '@/components/ui/card-title.vue'
import UiCard from '@/components/ui/card.vue'
import { recentOrders, formatCurrency } from '@/mock/data'

interface Props {
  loading?: boolean
}

defineProps<Props>()

const columns: Column[] = [
  { key: 'orderNo', header: 'Order' },
  { key: 'customer', header: 'Customer' },
  { key: 'type', header: 'Type' },
  { key: 'status', header: 'Status' },
  { key: 'total', header: 'Total', class: 'text-right' },
]

function getStatusVariant(status: Order['status']) {
  switch (status) {
    case 'completed':
      return 'success'
    case 'processing':
      return 'warning'
    case 'pending':
      return 'secondary'
    default:
      return 'secondary'
  }
}

function getTypeVariant(type: Order['type']) {
  return type === 'installment' ? 'outline' : 'secondary'
}
</script>

<template>
  <ui-card>
    <ui-card-header>
      <ui-card-title>Recent Orders</ui-card-title>
    </ui-card-header>
    <ui-card-content>
      <data-table :columns="columns" :data="recentOrders" :loading="loading">
        <template #orderNo="{ value }">
          <span class="font-medium">{{ value }}</span>
        </template>

        <template #type="{ value }">
          <ui-badge :variant="getTypeVariant(value as Order['type'])">
            {{ value === 'installment' ? 'Installment' : 'Cash' }}
          </ui-badge>
        </template>

        <template #status="{ value }">
          <ui-badge :variant="getStatusVariant(value as Order['status'])">
            {{ (value as string).charAt(0).toUpperCase() + (value as string).slice(1) }}
          </ui-badge>
        </template>

        <template #total="{ value }">
          <span class="text-right font-medium">{{ formatCurrency(value as number) }}</span>
        </template>
      </data-table>
    </ui-card-content>
  </ui-card>
</template>

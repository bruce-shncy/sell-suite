<script setup lang="ts">
import { Phone, AlertCircle } from 'lucide-vue-next'

import EmptyState from '@/components/shared/empty-state.vue'
import UiBadge from '@/components/ui/badge.vue'
import UiCardContent from '@/components/ui/card-content.vue'
import UiCardHeader from '@/components/ui/card-header.vue'
import UiCardTitle from '@/components/ui/card-title.vue'
import UiCard from '@/components/ui/card.vue'
import UiSkeleton from '@/components/ui/skeleton.vue'
import { dueTodayItems, formatCurrency, formatDate } from '@/mock/data'

interface Props {
  loading?: boolean
}

defineProps<Props>()

const dueItems = dueTodayItems.filter((item) => !item.overdue)
const overdueItems = dueTodayItems.filter((item) => item.overdue)
</script>

<template>
  <ui-card>
    <ui-card-header>
      <ui-card-title>Due Today</ui-card-title>
    </ui-card-header>
    <ui-card-content class="space-y-4">
      <!-- Loading State -->
      <template v-if="loading">
        <div
          v-for="i in 4"
          :key="i"
          class="flex items-center justify-between rounded-lg border p-3"
        >
          <div class="space-y-2">
            <ui-skeleton class="h-4 w-32" />
            <ui-skeleton class="h-3 w-24" />
          </div>
          <ui-skeleton class="h-6 w-20" />
        </div>
      </template>

      <template v-else>
        <!-- Due Today Items -->
        <div
          v-for="item in dueItems"
          :key="item.id"
          class="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
        >
          <div class="min-w-0 flex-1">
            <p class="truncate font-medium">{{ item.customer }}</p>
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <phone class="h-3 w-3" />
              <span>{{ item.phone }}</span>
            </div>
          </div>
          <div class="text-right">
            <p class="font-semibold">{{ formatCurrency(item.amount) }}</p>
            <p class="text-xs text-muted-foreground">{{ formatDate(item.dueDate) }}</p>
          </div>
        </div>

        <!-- Overdue Section -->
        <div v-if="overdueItems.length > 0" class="mt-6">
          <div class="mb-3 flex items-center gap-2">
            <alert-circle class="h-4 w-4 text-destructive" />
            <span class="text-sm font-medium text-destructive">Overdue</span>
          </div>
          <div
            v-for="item in overdueItems"
            :key="item.id"
            class="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-3"
          >
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <p class="truncate font-medium">{{ item.customer }}</p>
                <ui-badge variant="destructive" class="text-xs">Overdue</ui-badge>
              </div>
              <div class="flex items-center gap-2 text-sm text-muted-foreground">
                <phone class="h-3 w-3" />
                <span>{{ item.phone }}</span>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold text-destructive">{{ formatCurrency(item.amount) }}</p>
              <p class="text-xs text-muted-foreground">{{ formatDate(item.dueDate) }}</p>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <empty-state
          v-if="dueItems.length === 0 && overdueItems.length === 0"
          title="No payments due today"
          description="All caught up! Check back tomorrow."
        />
      </template>
    </ui-card-content>
  </ui-card>
</template>

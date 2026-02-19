<script setup lang="ts">
import type { Component } from 'vue'

import UiCard from '@/components/ui/card.vue'
import UiSkeleton from '@/components/ui/skeleton.vue'

interface Props {
  title: string
  value: string
  icon?: Component
  trend?: {
    value: number
    isPositive: boolean
  }
  loading?: boolean
}

defineProps<Props>()
</script>

<template>
  <ui-card class="p-6">
    <div class="flex items-center justify-between">
      <p class="text-sm font-medium text-muted-foreground">{{ title }}</p>
      <component :is="icon" v-if="icon" class="h-4 w-4 text-muted-foreground" />
    </div>
    <div class="mt-2">
      <ui-skeleton v-if="loading" class="h-8 w-24" />
      <p v-else class="text-2xl font-bold">
        {{ value }}
      </p>
    </div>
    <div v-if="trend && !loading" class="mt-1 flex items-center text-xs">
      <span
        :class="
          trend.isPositive
            ? 'text-emerald-600 dark:text-emerald-400'
            : 'text-red-600 dark:text-red-400'
        "
      >
        {{ trend.isPositive ? '+' : '' }}{{ trend.value }}%
      </span>
      <span class="ml-1 text-muted-foreground">from last month</span>
    </div>
  </ui-card>
</template>

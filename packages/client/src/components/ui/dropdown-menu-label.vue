<script setup lang="ts">
import { DropdownMenuLabel } from 'radix-vue'

import { cn } from '@/lib/utils'

interface Props {
  class?: string
  inset?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <dropdown-menu-label
    :class="cn('px-2 py-1.5 text-sm font-semibold', props.inset && 'pl-8', props.class)"
  >
    <slot />
  </dropdown-menu-label>
</template>

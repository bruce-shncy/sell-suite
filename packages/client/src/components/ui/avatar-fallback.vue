<script setup lang="ts">
import { AvatarFallback } from 'radix-vue'

import { cn } from '@/lib/utils'

interface Props {
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <avatar-fallback
    :class="
      cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium',
        props.class
      )
    "
  >
    <slot />
  </avatar-fallback>
</template>

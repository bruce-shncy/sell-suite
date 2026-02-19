<script setup lang="ts">
import { DialogDescription } from 'radix-vue'

import { cn } from '@/lib/utils'

interface Props {
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <dialog-description :class="cn('text-sm text-muted-foreground', props.class)">
    <slot />
  </dialog-description>
</template>

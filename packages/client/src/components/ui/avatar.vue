<script setup lang="ts">
import { AvatarRoot } from 'radix-vue'

import { cn } from '@/lib/utils'

interface Props {
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <avatar-root
    :class="cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', props.class)"
  >
    <slot />
  </avatar-root>
</template>

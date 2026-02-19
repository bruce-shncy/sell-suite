<script setup lang="ts">
import { AvatarImage } from 'radix-vue'

import { cn } from '@/lib/utils'

interface Props {
  src?: string
  alt?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
})
</script>

<template>
  <avatar-image :src="src" :alt="alt" :class="cn('aspect-square h-full w-full', props.class)" />
</template>

<script setup lang="ts">
import { DialogRoot } from 'radix-vue'

interface Props {
  open?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <dialog-root :open="props.open" @update:open="emit('update:open', $event)">
    <slot />
  </dialog-root>
</template>

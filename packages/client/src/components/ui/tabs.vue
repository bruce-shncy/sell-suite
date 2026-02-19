<script setup lang="ts">
import { TabsRoot } from 'radix-vue'

interface Props {
  defaultValue?: string
  modelValue?: string
}

defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <tabs-root
    :default-value="defaultValue"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </tabs-root>
</template>

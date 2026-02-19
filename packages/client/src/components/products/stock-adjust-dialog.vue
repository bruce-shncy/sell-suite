<script setup lang="ts">
import { ref, watch } from 'vue'

import type { Product } from '@/mock/data'

import UiButton from '@/components/ui/button.vue'
import UiDialogContent from '@/components/ui/dialog-content.vue'
import UiDialogDescription from '@/components/ui/dialog-description.vue'
import UiDialogFooter from '@/components/ui/dialog-footer.vue'
import UiDialogHeader from '@/components/ui/dialog-header.vue'
import UiDialogTitle from '@/components/ui/dialog-title.vue'
import UiDialog from '@/components/ui/dialog.vue'
import UiInput from '@/components/ui/input.vue'
import UiLabel from '@/components/ui/label.vue'

interface Props {
  open: boolean
  product: Product | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const adjustmentType = ref<'add' | 'remove'>('add')
const quantity = ref('')
const reason = ref('')

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      adjustmentType.value = 'add'
      quantity.value = ''
      reason.value = ''
    }
  }
)

function handleSubmit() {
  // Static demo - just close the dialog
  emit('update:open', false)
}
</script>

<template>
  <ui-dialog :open="open" @update:open="emit('update:open', $event)">
    <ui-dialog-content class="sm:max-w-md">
      <ui-dialog-header>
        <ui-dialog-title>Adjust Stock</ui-dialog-title>
        <ui-dialog-description>
          {{ product?.name }} - Current stock: {{ product?.stock }}
        </ui-dialog-description>
      </ui-dialog-header>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="space-y-2">
          <ui-label>Adjustment Type</ui-label>
          <div class="flex gap-2">
            <ui-button
              type="button"
              :variant="adjustmentType === 'add' ? 'default' : 'outline'"
              class="flex-1"
              @click="adjustmentType = 'add'"
            >
              Add Stock
            </ui-button>
            <ui-button
              type="button"
              :variant="adjustmentType === 'remove' ? 'default' : 'outline'"
              class="flex-1"
              @click="adjustmentType = 'remove'"
            >
              Remove Stock
            </ui-button>
          </div>
        </div>

        <div class="space-y-2">
          <ui-label for="quantity">Quantity</ui-label>
          <ui-input
            id="quantity"
            v-model="quantity"
            type="number"
            min="1"
            placeholder="Enter quantity"
          />
        </div>

        <div class="space-y-2">
          <ui-label for="reason">Reason (Optional)</ui-label>
          <ui-input id="reason" v-model="reason" placeholder="e.g., New shipment, Damaged goods" />
        </div>

        <div class="rounded-lg bg-muted p-3">
          <p class="text-sm text-muted-foreground">
            New stock level:
            <span class="font-semibold text-foreground">
              {{
                adjustmentType === 'add'
                  ? (product?.stock || 0) + (Number(quantity) || 0)
                  : Math.max(0, (product?.stock || 0) - (Number(quantity) || 0))
              }}
            </span>
          </p>
        </div>

        <ui-dialog-footer>
          <ui-button type="button" variant="outline" @click="emit('update:open', false)">
            Cancel
          </ui-button>
          <ui-button type="submit">Update Stock</ui-button>
        </ui-dialog-footer>
      </form>
    </ui-dialog-content>
  </ui-dialog>
</template>

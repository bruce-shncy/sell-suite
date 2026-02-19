<script setup lang="ts">
import { ref } from 'vue'

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
}

defineProps<Props>()
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const form = ref({
  name: '',
  sku: '',
  category: 'phone',
  price: '',
  stock: '',
})

function handleSubmit() {
  // Static demo - just close the dialog
  emit('update:open', false)
}
</script>

<template>
  <ui-dialog :open="open" @update:open="emit('update:open', $event)">
    <ui-dialog-content class="sm:max-w-md">
      <ui-dialog-header>
        <ui-dialog-title>Add Product</ui-dialog-title>
        <ui-dialog-description> Add a new product to your inventory. </ui-dialog-description>
      </ui-dialog-header>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="space-y-2">
          <ui-label for="name">Product Name</ui-label>
          <ui-input id="name" v-model="form.name" placeholder="iPhone 15 Pro Max" />
        </div>

        <div class="space-y-2">
          <ui-label for="sku">SKU</ui-label>
          <ui-input id="sku" v-model="form.sku" placeholder="IPH-15PM-256" />
        </div>

        <div class="space-y-2">
          <ui-label for="category">Category</ui-label>
          <select
            id="category"
            v-model="form.category"
            class="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="phone">Phone</option>
            <option value="accessory">Accessory</option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <ui-label for="price">Price</ui-label>
            <ui-input id="price" v-model="form.price" type="number" placeholder="0.00" />
          </div>
          <div class="space-y-2">
            <ui-label for="stock">Initial Stock</ui-label>
            <ui-input id="stock" v-model="form.stock" type="number" placeholder="0" />
          </div>
        </div>

        <ui-dialog-footer>
          <ui-button type="button" variant="outline" @click="emit('update:open', false)">
            Cancel
          </ui-button>
          <ui-button type="submit">Add Product</ui-button>
        </ui-dialog-footer>
      </form>
    </ui-dialog-content>
  </ui-dialog>
</template>

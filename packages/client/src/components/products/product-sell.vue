<script setup lang="ts">
import { MoreHorizontal, Eye, Package, Plus } from 'lucide-vue-next'
import { ref, computed } from 'vue'

import type { Column } from '@/components/shared/data-table.vue'
import type { Product } from '@/mock/data'

import ProductDialog from '@/components/products/product-dialog.vue'
import StockAdjustDialog from '@/components/products/stock-adjust-dialog.vue'
import DataTable from '@/components/shared/data-table.vue'
import UiBadge from '@/components/ui/badge.vue'
import UiButton from '@/components/ui/button.vue'
import UiCardContent from '@/components/ui/card-content.vue'
import UiCardHeader from '@/components/ui/card-header.vue'
import UiCardTitle from '@/components/ui/card-title.vue'
import UiCard from '@/components/ui/card.vue'
import UiDropdownMenuContent from '@/components/ui/dropdown-menu-content.vue'
import UiDropdownMenuItem from '@/components/ui/dropdown-menu-item.vue'
import UiDropdownMenuTrigger from '@/components/ui/dropdown-menu-trigger.vue'
import UiDropdownMenu from '@/components/ui/dropdown-menu.vue'
import UiTabsContent from '@/components/ui/tabs-content.vue'
import UiTabsList from '@/components/ui/tabs-list.vue'
import UiTabsTrigger from '@/components/ui/tabs-trigger.vue'
import UiTabs from '@/components/ui/tabs.vue'
import { products, formatCurrency } from '@/mock/data'

interface Props {
  loading?: boolean
}

defineProps<Props>()

const activeTab = ref('all')
const addProductOpen = ref(false)
const stockAdjustOpen = ref(false)
const selectedProduct = ref<Product | null>(null)

const columns: Column[] = [
  { key: 'name', header: 'Product' },
  { key: 'category', header: 'Category' },
  { key: 'stock', header: 'Stock' },
  { key: 'price', header: 'Price', class: 'text-right' },
  { key: 'status', header: 'Status' },
  { key: 'actions', header: '', class: 'w-12' },
]

const filteredProducts = computed(() => {
  if (activeTab.value === 'all') return products
  return products.filter((p) => p.category === activeTab.value)
})

function isLowStock(stock: number) {
  return stock > 0 && stock <= 5
}

function isOutOfStock(stock: number) {
  return stock === 0
}

function openStockAdjust(product: Product) {
  selectedProduct.value = product
  stockAdjustOpen.value = true
}
</script>

<template>
  <ui-card>
    <ui-card-header
      class="flex flex-col gap-4 space-y-0 sm:flex-row sm:items-center sm:justify-between"
    >
      <ui-card-title>Products</ui-card-title>
      <ui-button @click="addProductOpen = true">
        <plus class="mr-2 h-4 w-4" />
        Add Product
      </ui-button>
    </ui-card-header>
    <ui-card-content>
      <ui-tabs v-model="activeTab" default-value="all">
        <ui-tabs-list class="mb-4">
          <ui-tabs-trigger value="all">All</ui-tabs-trigger>
          <ui-tabs-trigger value="phone">Phones</ui-tabs-trigger>
          <ui-tabs-trigger value="accessory">Accessories</ui-tabs-trigger>
        </ui-tabs-list>

        <ui-tabs-content value="all">
          <data-table :columns="columns" :data="filteredProducts" :loading="loading">
            <template #name="{ row }">
              <div>
                <p class="font-medium">{{ row.name }}</p>
                <p class="text-xs text-muted-foreground">{{ row.sku }}</p>
              </div>
            </template>

            <template #category="{ value }">
              <ui-badge variant="secondary">
                {{ value === 'phone' ? 'Phone' : 'Accessory' }}
              </ui-badge>
            </template>

            <template #stock="{ value }">
              <div class="flex items-center gap-2">
                <span :class="{ 'text-destructive': isOutOfStock(value as number) }">
                  {{ value }}
                </span>
                <ui-badge v-if="isLowStock(value as number)" variant="warning" class="text-xs">
                  Low
                </ui-badge>
                <ui-badge
                  v-if="isOutOfStock(value as number)"
                  variant="destructive"
                  class="text-xs"
                >
                  Out
                </ui-badge>
              </div>
            </template>

            <template #price="{ value }">
              <span class="font-medium">{{ formatCurrency(value as number) }}</span>
            </template>

            <template #status="{ value }">
              <ui-badge :variant="value === 'active' ? 'success' : 'secondary'">
                {{ (value as string).charAt(0).toUpperCase() + (value as string).slice(1) }}
              </ui-badge>
            </template>

            <template #actions="{ row }">
              <ui-dropdown-menu>
                <ui-dropdown-menu-trigger>
                  <ui-button variant="ghost" size="icon" class="h-8 w-8">
                    <more-horizontal class="h-4 w-4" />
                    <span class="sr-only">Actions</span>
                  </ui-button>
                </ui-dropdown-menu-trigger>
                <ui-dropdown-menu-content align="end">
                  <ui-dropdown-menu-item>
                    <eye class="mr-2 h-4 w-4" />
                    View Details
                  </ui-dropdown-menu-item>
                  <ui-dropdown-menu-item @click="openStockAdjust(row)">
                    <package class="mr-2 h-4 w-4" />
                    Adjust Stock
                  </ui-dropdown-menu-item>
                </ui-dropdown-menu-content>
              </ui-dropdown-menu>
            </template>
          </data-table>
        </ui-tabs-content>

        <ui-tabs-content value="phone">
          <data-table :columns="columns" :data="filteredProducts" :loading="loading">
            <template #name="{ row }">
              <div>
                <p class="font-medium">{{ row.name }}</p>
                <p class="text-xs text-muted-foreground">{{ row.sku }}</p>
              </div>
            </template>

            <template #category="{ value }">
              <ui-badge variant="secondary">
                {{ value === 'phone' ? 'Phone' : 'Accessory' }}
              </ui-badge>
            </template>

            <template #stock="{ value }">
              <div class="flex items-center gap-2">
                <span :class="{ 'text-destructive': isOutOfStock(value as number) }">
                  {{ value }}
                </span>
                <ui-badge v-if="isLowStock(value as number)" variant="warning" class="text-xs">
                  Low
                </ui-badge>
                <ui-badge
                  v-if="isOutOfStock(value as number)"
                  variant="destructive"
                  class="text-xs"
                >
                  Out
                </ui-badge>
              </div>
            </template>

            <template #price="{ value }">
              <span class="font-medium">{{ formatCurrency(value as number) }}</span>
            </template>

            <template #status="{ value }">
              <ui-badge :variant="value === 'active' ? 'success' : 'secondary'">
                {{ (value as string).charAt(0).toUpperCase() + (value as string).slice(1) }}
              </ui-badge>
            </template>

            <template #actions="{ row }">
              <ui-dropdown-menu>
                <ui-dropdown-menu-trigger>
                  <ui-button variant="ghost" size="icon" class="h-8 w-8">
                    <more-horizontal class="h-4 w-4" />
                    <span class="sr-only">Actions</span>
                  </ui-button>
                </ui-dropdown-menu-trigger>
                <ui-dropdown-menu-content align="end">
                  <ui-dropdown-menu-item>
                    <eye class="mr-2 h-4 w-4" />
                    View Details
                  </ui-dropdown-menu-item>
                  <ui-dropdown-menu-item @click="openStockAdjust(row)">
                    <package class="mr-2 h-4 w-4" />
                    Adjust Stock
                  </ui-dropdown-menu-item>
                </ui-dropdown-menu-content>
              </ui-dropdown-menu>
            </template>
          </data-table>
        </ui-tabs-content>

        <ui-tabs-content value="accessory">
          <data-table :columns="columns" :data="filteredProducts" :loading="loading">
            <template #name="{ row }">
              <div>
                <p class="font-medium">{{ row.name }}</p>
                <p class="text-xs text-muted-foreground">{{ row.sku }}</p>
              </div>
            </template>

            <template #category="{ value }">
              <ui-badge variant="secondary">
                {{ value === 'phone' ? 'Phone' : 'Accessory' }}
              </ui-badge>
            </template>

            <template #stock="{ value }">
              <div class="flex items-center gap-2">
                <span :class="{ 'text-destructive': isOutOfStock(value as number) }">
                  {{ value }}
                </span>
                <ui-badge v-if="isLowStock(value as number)" variant="warning" class="text-xs">
                  Low
                </ui-badge>
                <ui-badge
                  v-if="isOutOfStock(value as number)"
                  variant="destructive"
                  class="text-xs"
                >
                  Out
                </ui-badge>
              </div>
            </template>

            <template #price="{ value }">
              <span class="font-medium">{{ formatCurrency(value as number) }}</span>
            </template>

            <template #status="{ value }">
              <ui-badge :variant="value === 'active' ? 'success' : 'secondary'">
                {{ (value as string).charAt(0).toUpperCase() + (value as string).slice(1) }}
              </ui-badge>
            </template>

            <template #actions="{ row }">
              <ui-dropdown-menu>
                <ui-dropdown-menu-trigger>
                  <ui-button variant="ghost" size="icon" class="h-8 w-8">
                    <more-horizontal class="h-4 w-4" />
                    <span class="sr-only">Actions</span>
                  </ui-button>
                </ui-dropdown-menu-trigger>
                <ui-dropdown-menu-content align="end">
                  <ui-dropdown-menu-item>
                    <eye class="mr-2 h-4 w-4" />
                    View Details
                  </ui-dropdown-menu-item>
                  <ui-dropdown-menu-item @click="openStockAdjust(row)">
                    <package class="mr-2 h-4 w-4" />
                    Adjust Stock
                  </ui-dropdown-menu-item>
                </ui-dropdown-menu-content>
              </ui-dropdown-menu>
            </template>
          </data-table>
        </ui-tabs-content>
      </ui-tabs>
    </ui-card-content>
  </ui-card>

  <!-- Dialogs -->
  <product-dialog v-model:open="addProductOpen" />
  <stock-adjust-dialog v-model:open="stockAdjustOpen" :product="selectedProduct" />
</template>

<script setup lang="ts" generic="T">
import UiSkeleton from '@/components/ui/skeleton.vue'
import UiTableBody from '@/components/ui/table-body.vue'
import UiTableCell from '@/components/ui/table-cell.vue'
import UiTableHead from '@/components/ui/table-head.vue'
import UiTableHeader from '@/components/ui/table-header.vue'
import UiTableRow from '@/components/ui/table-row.vue'
import UiTable from '@/components/ui/table.vue'

export interface Column {
  key: string
  header: string
  class?: string
}

interface Props {
  columns: Column[]
  data: T[]
  loading?: boolean
  rowKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  rowKey: 'id',
})

defineSlots<{
  [key: string]: (props: { row: T; value: unknown }) => unknown
}>()

function getRowKey(row: T): string {
  return String((row as Record<string, unknown>)[props.rowKey])
}

function getCellValue(row: T, key: string): unknown {
  return (row as Record<string, unknown>)[key]
}
</script>

<template>
  <ui-table>
    <ui-table-header>
      <ui-table-row>
        <ui-table-head v-for="column in columns" :key="column.key" :class="column.class">
          {{ column.header }}
        </ui-table-head>
      </ui-table-row>
    </ui-table-header>
    <ui-table-body>
      <!-- Loading State -->
      <template v-if="loading">
        <ui-table-row v-for="i in 5" :key="i">
          <ui-table-cell v-for="column in columns" :key="column.key">
            <ui-skeleton class="h-5 w-full" />
          </ui-table-cell>
        </ui-table-row>
      </template>

      <!-- Data Rows -->
      <template v-else>
        <ui-table-row v-for="row in data" :key="getRowKey(row)">
          <ui-table-cell v-for="column in columns" :key="column.key" :class="column.class">
            <slot :name="column.key" :row="row" :value="getCellValue(row, column.key)">
              {{ getCellValue(row, column.key) }}
            </slot>
          </ui-table-cell>
        </ui-table-row>
      </template>
    </ui-table-body>
  </ui-table>
</template>

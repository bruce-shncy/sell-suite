<script setup lang="ts">
import { ref, onMounted } from 'vue'

import ProductSell from '@/components/products/product-sell.vue'
import PageHeader from '@/components/shared/page-header.vue'

const loading = ref(true)

onMounted(() => {
  // Simulate loading
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<template>
  <div class="space-y-6">
    <page-header title="Products" description="Manage your product inventory" />
    <product-sell :loading="loading" />
  </div>
</template>

<!-- components/TestGenerate/TestList.vue -->
<template>
  <ul>
    <li v-for="test in tests" :key="test.id">
      <span>{{ test.name }} - Môn: {{ test.subject?.name }}</span>
      <button @click="onViewDetail(test.id)">Xem chi tiết</button>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  tests: Array,
  onViewDetail: Function
})
</script>

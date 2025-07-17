<template>
  <div class="generate-test-form">
    <h2>Tạo đề thi</h2>

    <div v-for="(item, i) in structure" :key="i" class="structure-item">
      <select v-model="item.subject_id">
        <option disabled value="">Chọn môn học</option>
        <option v-for="s in subjects" :value="s.id">{{ s.name }}</option>
      </select>

      <select v-model="item.type_id">
        <option disabled value="">Loại câu hỏi</option>
        <option v-for="t in types" :value="t.id">{{ t.name }}</option>
      </select>

      <input type="number" v-model.number="item.quantity" placeholder="Số lượng" min="1" />
    </div>

    <div class="buttons">
      <button @click="addBlock">+ Thêm khối</button>
      <button @click="submit">Tạo đề</button>
    </div>

    <div v-if="warnings.length" class="warnings">
      <h4>Cảnh báo:</h4>
      <ul>
        <li v-for="w in warnings" :key="w">{{ w }}</li>
      </ul>
    </div>

    <div v-if="questions.length" class="result">
      <h4>Danh sách câu hỏi:</h4>
      <ul>
        <li v-for="(q, i) in questions" :key="q.id">
          {{ i + 1 }}. <span v-html="renderContent(q.content)"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGenerateTest } from '@/store/useGenerateTest.js'

const {
  structure, subjects, types,
  warnings, questions,
  fetchData, addBlock, submit,
  renderContent
} = useGenerateTest()

onMounted(fetchData)
</script>

<style scoped src="@/assets/css/generate-test.css" />

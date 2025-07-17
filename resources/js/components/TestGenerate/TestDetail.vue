<template>
  <div class="test-preview">
    <h2>📘 Đề thi</h2>

    <div v-for="(detail, index) in test.details" :key="detail.id" class="question-block">
      <p class="question-index">Câu {{ index + 1 }}:</p>

      <!-- ✅ Hiển thị nội dung câu hỏi: phân tích $...$ và $$...$$ -->
      <p>
        <template v-for="(part, i) in parseFormula(detail.question.content)" :key="`content-${i}`">
          <template v-if="part.type === 'text'">{{ part.value }}</template>
          <template v-else><math-jax :formula="part.value" /></template>
        </template>
      </p>

      <!-- ✅ Đáp án đúng -->
      <div v-if="detail.question.correct_answer" class="correct-answer">
        <strong>Đáp án đúng:</strong>
        <span>
          <template v-for="(part, i) in parseFormula(detail.question.correct_answer)" :key="`answer-${i}`">
            <template v-if="part.type === 'text'">{{ part.value }}</template>
            <template v-else><math-jax :formula="part.value" /></template>
          </template>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MathJax } from 'vue-mathjax-next'

/**
 * Tách chuỗi thành đoạn văn bản và công thức toán học (dấu $ hoặc $$)
 */
function parseFormula(content) {
  if (!content) return []

  // Gộp cả $...$ và $$...$$
  const regex = /\${1,2}(.*?)\${1,2}/gs
  const result = []
  let lastIndex = 0
  let match

  while ((match = regex.exec(content)) !== null) {
    const index = match.index
    const math = match[1]

    // Thêm phần text trước biểu thức toán
    if (index > lastIndex) {
      result.push({
        type: 'text',
        value: content.slice(lastIndex, index),
      })
    }

    // Thêm phần biểu thức toán
    result.push({
      type: 'math',
      value: math.trim(),
    })

    lastIndex = regex.lastIndex
  }

  // Thêm phần còn lại
  if (lastIndex < content.length) {
    result.push({
      type: 'text',
      value: content.slice(lastIndex),
    })
  }

  return result
}


defineProps({
  test: Object
})
</script>

<style scoped>
.test-preview {
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
  background-color: #ffffff;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.question-block {
  margin-bottom: 2rem;
  padding: 1rem 1.5rem;
  background: #f5faff;
  border-left: 4px solid #0d6efd;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.question-index {
  font-weight: bold;
  color: #333;
  margin-bottom: 0.75rem;
}

.correct-answer {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #e6f4ea;
  color: #1d7a33;
  border-left: 3px solid #2ecc71;
  border-radius: 4px;
}
</style>

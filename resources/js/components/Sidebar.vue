<template>
  <aside class="sidebar" :class="{ collapsed: isCollapsed }">
    <button class="toggle-btn" @click="toggleSidebar">☰</button>
    <nav v-if="!isCollapsed" class="menu">
      <router-link to="/admin">🏠 Trang chủ</router-link>
      <router-link to="/admin/users">👤 Quản lý người dùng</router-link>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import '@/assets/css/sidebar.css'

const isCollapsed = ref(false)
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

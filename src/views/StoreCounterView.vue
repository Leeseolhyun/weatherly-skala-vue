<script setup>
import { RouterLink } from 'vue-router'
import StoreCounter from '../components/practices/library/StoreCounter.vue'
</script>

<template>
  <div class="counter-page">
    <h3>관심 도시</h3>
    <p>관심 있는 도시를 추가하고 현재 선택 상태를 확인하세요.</p>
    <hr />

    <StoreCounter />

    <RouterLink to="/" class="home-link">← 여행 추천으로 돌아가기</RouterLink>
  </div>
</template>

<style scoped>
.counter-page {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.counter-page :deep(.practice-section) {
  margin-top: 18px;
  padding: 16px;
  border-radius: 6px;
  background: #f8f9fa;
}

.counter-page button {
  padding: 8px 12px;
  border: 0;
  border-radius: 4px;
  background: #42b883;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

.home-link {
  display: inline-block;
  margin-top: 18px;
  color: #3498db;
  font-weight: bold;
  text-decoration: none;
}
</style>

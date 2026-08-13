<script setup>
import { RouterLink } from 'vue-router'
import ElementPlus from '@/components/practices/library/ElementPlus.vue'
</script>

<template>
  <div class="element-plus-page">
    <h2>내 설정</h2>
    <p>알림 수신, 화면 표시, 데이터 동기화 설정을 관리하세요.</p>
    <hr />

    <ElementPlus />

    <RouterLink to="/" class="home-link">← 여행 추천으로 돌아가기</RouterLink>
  </div>
</template>

<style scoped>
.element-plus-page {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(40, 77, 108, 0.08);
}

.element-plus-page > p {
  color: #617286;
}

.home-link {
  display: inline-block;
  margin-top: 20px;
  color: #3498db;
  font-weight: bold;
  text-decoration: none;
}
</style>

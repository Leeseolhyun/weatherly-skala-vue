<script setup>
import { RouterLink } from 'vue-router'
import AxiosWeather from '@/components/practices/library/AxiosWeather.vue'
</script>

<template>
  <div class="axios-page">
    <h2>실시간 날씨</h2>
    <p>현재 날씨, 5일 예보, 대기질 정보를 조회할 수 있습니다.</p>
    <hr />

    <section class="axios-section">
      <h3>현재 날씨와 예보</h3>
      <AxiosWeather />
    </section>

    <RouterLink to="/" class="home-link">← 여행 추천으로 돌아가기</RouterLink>
  </div>
</template>

<style scoped>
.axios-page {
  background: linear-gradient(145deg, #ffffff, #fbfefb);
  padding: 24px;
  border: 1px solid #dbece0;
  border-radius: 20px;
  box-shadow: 0 8px 22px rgba(47, 104, 65, 0.08);
}

.axios-page > p {
  color: #617865;
}

.axios-page :deep(.practice-section) {
  margin-top: 12px;
  padding: 18px;
  border-radius: 10px;
  background: #f6fcf7;
  border: 1px solid #deede1;
}

.axios-section {
  margin-top: 24px;
}

.axios-section h3 {
  margin-bottom: 10px;
  color: #2d6943;
}

.home-link {
  display: inline-block;
  margin-top: 20px;
  color: #2c8650;
  font-weight: bold;
  text-decoration: none;
}
</style>

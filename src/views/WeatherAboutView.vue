<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleGoHome = () => {
  router.push('/')
}
</script>

<template>
  <div>
    <h3>ℹ️ 서비스 소개</h3>
    <hr />

    <div class="description-box">
      <p><strong>Weatherly</strong>는 주요 도시의 날씨와 외출 정보를 빠르게 확인할 수 있는 날씨 서비스입니다.</p>
      <ul>
        <li>도시별 날씨와 외출 준비 정보 제공</li>
        <li>5일 예보와 대기질 정보 조회</li>
        <li>관심 도시와 개인 설정 관리</li>
      </ul>
    </div>

    <button @click="handleGoHome" class="home-btn">대시보드 홈으로 이동</button>
  </div>
</template>

<style scoped>
.description-box {
  background-color: #f8f9fa;
  padding: 12px;
  border-radius: 6px;
  line-height: 1.5;
  font-size: 14px;
}

ul {
  padding-left: 20px;
  margin: 8px 0 0 0;
}

li {
  margin-bottom: 6px;
  color: #555;
}

.home-btn {
  width: 100%;
  margin-top: 15px;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}
</style>

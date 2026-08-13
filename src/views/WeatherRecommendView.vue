<script setup>
import { RouterLink } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()

const travelList = [
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', place: '실내 전시회 또는 카페', particle: '를' },
  { id: 'city_02', name: '수원', temp: 24, status: '비', place: '행궁동 실내 카페', particle: '를' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름', place: '해운대 산책', particle: '을' },
  { id: 'city_04', name: '울산', temp: 22, status: '맑음', place: '태화강 국가정원 산책', particle: '을' },
  { id: 'city_05', name: '대전', temp: 30, status: '맑음', place: '시원한 실내 미술관', particle: '을' },
  { id: 'city_06', name: '제주', temp: 27, status: '비', place: '실내 박물관 또는 카페', particle: '를' },
  { id: 'city_07', name: '광주', temp: 23, status: '구름', place: '국립아시아문화전당', particle: '을' },
  { id: 'city_08', name: '대구', temp: 29, status: '맑음', place: '동성로 실내 카페', particle: '를' },
  { id: 'city_09', name: '춘천', temp: 21, status: '구름', place: '의암호 산책', particle: '을' },
  { id: 'city_10', name: '강릉', temp: 24, status: '맑음', place: '안목해변 커피거리', particle: '를' },
  { id: 'city_11', name: '속초', temp: 22, status: '구름', place: '영금정 해안 산책', particle: '을' },
  { id: 'city_12', name: '포항', temp: 25, status: '맑음', place: '스페이스워크와 영일대', particle: '를' },
  { id: 'city_13', name: '경주', temp: 24, status: '맑음', place: '대릉원과 황리단길', particle: '을' },
  { id: 'city_14', name: '여수', temp: 23, status: '구름', place: '오동도 해안 산책', particle: '을' },
  { id: 'city_15', name: '전주', temp: 26, status: '맑음', place: '전주한옥마을', particle: '을' },
  { id: 'city_16', name: '안동', temp: 22, status: '구름', place: '하회마을 산책', particle: '을' },
  { id: 'city_17', name: '청주', temp: 25, status: '맑음', place: '국립청주박물관', particle: '을' },
  { id: 'city_18', name: '목포', temp: 23, status: '구름', place: '근대역사문화공간', particle: '을' },
]
</script>

<template>
  <div class="recommend-container">
    <h3>🧭 도시별 나들이 추천</h3>
    <hr />

    <div v-for="item in travelList" :key="item.id" class="recommend-card">
      <h4>{{ item.name }} · {{ configStore.formatTemperature(item.temp) }} · {{ item.status }}</h4>

      <p v-if="item.status === '비'">
        ☂️ 비가 오니 <strong>{{ item.place }}</strong
        >{{ item.particle }} 추천해요.
      </p>
      <p v-else-if="item.temp >= 26">
        🧊 더운 날이니 <strong>{{ item.place }}</strong
        >{{ item.particle }} 추천해요.
      </p>
      <p v-else>
        🌳 선선한 날이니 <strong>{{ item.place }}</strong
        >{{ item.particle }} 추천해요.
      </p>
    </div>

    <RouterLink to="/" class="home-link">← 여행 추천으로 돌아가기</RouterLink>
  </div>
</template>

<style scoped>
.recommend-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.recommend-card {
  margin: 12px 0;
  padding: 12px;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  background: #f8f9fa;
}

.recommend-card h4,
.recommend-card p {
  margin: 4px 0;
}

.home-link {
  display: inline-block;
  margin-top: 12px;
  color: #3498db;
  font-weight: bold;
  text-decoration: none;
}
</style>

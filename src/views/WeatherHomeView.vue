<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'

const router = useRouter()
const route = useRoute()

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '울산', temp: 22, status: '맑음' },
  { id: 'city_05', name: '대전', temp: 30, status: '맑음' },
  { id: 'city_06', name: '제주', temp: 27, status: '비' },
  { id: 'city_07', name: '광주', temp: 23, status: '구름' },
  { id: 'city_08', name: '대구', temp: 29, status: '맑음' },
])

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search
  }
})

watch(searchQuery, (newQuery) => {
  router.push({
    path: route.path,
    query: { search: newQuery || undefined },
  })
})

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) return weatherList.value
  return weatherList.value.filter((item) => item.name.includes(query))
})

const handleDetailJump = (id) => {
  router.push(`/weather/${id}`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <section class="hero-section">
      <p class="hero-label">WEATHERLY</p>
      <h2>오늘의 날씨를 빠르게 확인하세요</h2>
      <p>도시별 날씨를 비교하고 외출 계획을 세워보세요.</p>
    </section>

    <BaseDashboardCard>
      <SearchBar :current-query="searchQuery" @update-query="(val) => (searchQuery = val)" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h3>주요 도시 날씨</h3>
      <WeatherCard v-for="item in filteredWeatherList" :key="item.id" :city-item="item" @select-card="(msg) => (selectedCityInfo = msg)" @click-detail="() => handleDetailJump(item.id)" />

      <p v-if="filteredWeatherList.length === 0" class="no-result">
        검색 결과가 없습니다. 다른 도시 이름을 입력해 보세요.
      </p>
    </BaseDashboardCard>
    <div class="status-bar">{{ selectedCityInfo }}</div>
  </div>
</template>

<style scoped>
.status-bar {
  background: #e8f5e9;
  padding: 10px;
  text-align: center;
  color: #2e7d32;
  font-weight: bold;
  border-radius: 6px;
}

.hero-section {
  margin-bottom: 22px;
  padding: 26px 28px;
  border-radius: 14px;
  background: linear-gradient(120deg, #e7f6eb, #f8fdf8 60%, #fffcef);
  border: 1px solid #d8ebdc;
}

.hero-section h2 {
  margin: 5px 0 8px;
}

.hero-section p {
  margin: 0;
  color: #5b7462;
}

.hero-label {
  color: #2d8b51 !important;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.no-result {
  padding: 10px 0;
  color: #e74c3c;
  text-align: center;
}
</style>

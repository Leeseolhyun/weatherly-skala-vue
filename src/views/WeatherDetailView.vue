<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()

const mockDetails = {
  city_01: { name: '대한민국 서울특별시', temp: 28, status: '맑음', humidity: '55%', wind: '2.5m/s' },
  city_02: { name: '경기도 수원시 영통구', temp: 24, status: '비', humidity: '85%', wind: '4.1m/s' },
  city_03: { name: '부산광역시 해운대구', temp: 26, status: '구름', humidity: '65%', wind: '5.0m/s' },
  city_04: { name: '울산광역시', temp: 22, status: '맑음', humidity: '50%', wind: '2.0m/s' },
  city_05: { name: '대전광역시', temp: 30, status: '맑음', humidity: '45%', wind: '1.8m/s' },
  city_06: { name: '제주특별자치도 제주시', temp: 27, status: '비', humidity: '90%', wind: '6.2m/s' },
  city_07: { name: '광주광역시', temp: 23, status: '구름', humidity: '60%', wind: '3.2m/s' },
  city_08: { name: '대구광역시', temp: 29, status: '맑음', humidity: '48%', wind: '2.3m/s' },
}

const cityData = ref(null)

const displayTemp = computed(() => {
  if (!cityData.value) return ''

  if (configStore.unit === 'fahrenheit') {
    return Math.round((cityData.value.temp * 9) / 5 + 32)
  }

  return cityData.value.temp
})

onMounted(() => {
  const id = route.params.cityId
  if (mockDetails[id]) {
    cityData.value = mockDetails[id]
  }
})
</script>

<template>
  <div class="detail-container">
    <h3>📊 지역별 상세 기상 관측 정보</h3>
    <hr />

    <div v-if="cityData" class="info-card">
      <h4>📍 지정 지역: {{ cityData.name }}</h4>
      <p>
        실시간 기온: <strong>{{ displayTemp }}{{ configStore.unitSymbol }}</strong>
      </p>
      <p>기상 현황: {{ cityData.status }}</p>
      <p>대기 습도: {{ cityData.humidity }}</p>
      <p>현재 풍속: {{ cityData.wind }}</p>
    </div>
    <div v-else>
      <p>해당 지역의 상세 정보를 찾을 수 없습니다.</p>
    </div>

    <button @click="router.push('/')" class="back-btn">← 메인 대시보드로 돌아가기</button>
  </div>
</template>

<style scoped>
.detail-container {
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.info-card {
  background: #f1f2f6;
  padding: 15px;
  border-radius: 6px;
  margin: 15px 0;
}
.back-btn {
  padding: 8px 12px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>

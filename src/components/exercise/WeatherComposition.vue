<script setup>
import { ref } from 'vue'
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '울산', temp: 22, status: '맑음' },
  { id: 'city_05', name: '대전', temp: 30, status: '맑음' },
  { id: 'city_06', name: '제주', temp: 27, status: '비' },
  { id: 'city_07', name: '광주', temp: 23, status: '구름' },
  { id: 'city_08', name: '대구', temp: 29, status: '맑음' },
  { id: 'city_09', name: '춘천', temp: 21, status: '구름' },
  { id: 'city_10', name: '강릉', temp: 24, status: '맑음' },
  { id: 'city_11', name: '속초', temp: 22, status: '구름' },
  { id: 'city_12', name: '포항', temp: 25, status: '맑음' },
  { id: 'city_13', name: '경주', temp: 24, status: '맑음' },
  { id: 'city_14', name: '여수', temp: 23, status: '구름' },
  { id: 'city_15', name: '전주', temp: 26, status: '맑음' },
  { id: 'city_16', name: '안동', temp: 22, status: '구름' },
  { id: 'city_17', name: '청주', temp: 25, status: '맑음' },
  { id: 'city_18', name: '목포', temp: 23, status: '구름' },
])

const heatThreshold = ref(26)
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

const getSubjectParticle = (cityName) => {
  const lastCode = cityName.charCodeAt(cityName.length - 1)
  const hasFinalConsonant = (lastCode - 0xac00) % 28 !== 0

  return hasFinalConsonant ? '이' : '가'
}
</script>

<template>
  <div class="dashboard-wrapper">
    <section class="sensitivity-box">
      <h3>🌡️ 더위 민감도 설정</h3>
      <label>
        내가 더위를 느끼는 기준:
        <input v-model.number="heatThreshold" type="number" min="20" max="35" step="1" />
        °C 이상
      </label>
      <p>기준 온도를 바꾸면 카드의 날씨 판단과 추천이 바로 달라집니다.</p>
    </section>

    <section class="recommend-box">
      <h3>🧭 오늘의 추천 도시 🧭</h3>
      <p>비가 오지 않고, 내가 설정한 더위 기준보다 선선한 도시를 추천해요.</p>
      <ul>
        <template v-for="item in weatherList" :key="item.id">
          <li v-if="item.status !== '비' && item.temp >= 20 && item.temp < heatThreshold">
            {{ item.name }} · {{ configStore.formatTemperature(item.temp) }} · {{ item.status }}
          </li>
        </template>
      </ul>
    </section>

    <section class="list-box">
      <h3>🏙️ 지역별 날씨 현황</h3>

      <div v-for="item in weatherList" :key="item.id" class="weather-card" @click="selectedCityInfo = `${item.name}${getSubjectParticle(item.name)} 선택되었습니다.`">
        <h4>{{ item.name }} ({{ item.status }})</h4>
        <p>현재 기온: {{ configStore.formatTemperature(item.temp) }}</p>

        <span v-if="item.temp >= heatThreshold" class="badge hot">🔥 더움 ({{ heatThreshold }}도 이상)</span>
        <span v-else class="badge cool">❄️ 선선함 ({{ heatThreshold }}도 미만)</span>

        <p v-if="item.status !== '비' && item.temp >= 20 && item.temp < heatThreshold" class="travel-tip">
          ⭐ 오늘의 추천 도시 ⭐ 
        </p>

        <button class="btn-detail" @click.stop="showDetail(item.name, item.status)">상세보기</button>
      </div>

    </section>

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>

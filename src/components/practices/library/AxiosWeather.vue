<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useConfigStore } from '@/stores/configStore'

const route = useRoute()
const configStore = useConfigStore()
const weatherData = ref(null)
const forecastList = ref([])
const airQualityData = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')
const selectedCity = ref('Ulsan,KR')

const cityOptions = [
  { label: '울산', value: 'Ulsan,KR', latitude: 35.5384, longitude: 129.3114 },
  { label: '서울', value: 'Seoul,KR', latitude: 37.5665, longitude: 126.978 },
  { label: '부산', value: 'Busan,KR', latitude: 35.1796, longitude: 129.0756 },
  { label: '제주', value: 'Jeju,KR', latitude: 33.4996, longitude: 126.5312 },
  { label: '대구', value: 'Daegu,KR', latitude: 35.8714, longitude: 128.6014 },
  { label: '인천', value: 'Incheon,KR', latitude: 37.4563, longitude: 126.7052 },
  { label: '광주', value: 'Gwangju,KR', latitude: 35.1595, longitude: 126.8526 },
  { label: '대전', value: 'Daejeon,KR', latitude: 36.3504, longitude: 127.3845 },
  { label: '춘천', value: 'Chuncheon,KR', latitude: 37.8813, longitude: 127.7298 },
  { label: '강릉', value: 'Gangneung,KR', latitude: 37.7519, longitude: 128.8761 },
  { label: '속초', value: 'Sokcho,KR', latitude: 38.207, longitude: 128.5912 },
  { label: '포항', value: 'Pohang,KR', latitude: 36.019, longitude: 129.3435 },
  { label: '경주', value: 'Gyeongju,KR', latitude: 35.8562, longitude: 129.2247 },
  { label: '여수', value: 'Yeosu,KR', latitude: 34.7604, longitude: 127.6622 },
  { label: '전주', value: 'Jeonju,KR', latitude: 35.8242, longitude: 127.148 },
  { label: '안동', value: 'Andong,KR', latitude: 36.5684, longitude: 128.7294 },
  { label: '청주', value: 'Cheongju,KR', latitude: 36.6424, longitude: 127.489 },
  { label: '목포', value: 'Mokpo,KR', latitude: 34.8118, longitude: 126.3922 },
]

const applyCityFromQuery = () => {
  const cityValue = route.query.city
  const selectedOption = cityOptions.find((city) => city.value === cityValue)

  if (selectedOption) {
    selectedCity.value = selectedOption.value
  }
}

const getWeatherLabel = (weather) => {
  const labelMap = {
    온흐림: '흐림',
    실비: '약한 비',
    '실 비': '약한 비',
    '가벼운 비': '약한 비',
    '보통 비': '비',
    '맑은 하늘': '맑음',
    튼구름: '구름 많음',
    '흩어진 구름': '구름 조금',
  }

  return labelMap[weather.description] || weather.description
}

const getAirQualityLabel = (aqi) => {
  if (aqi <= 50) return '좋음'
  if (aqi <= 100) return '보통'
  if (aqi <= 150) return '민감군 주의'
  if (aqi <= 200) return '나쁨'
  return '매우 나쁨'
}

const getAirQualityGuide = (aqi) => {
  if (aqi <= 50) return '야외 활동하기 좋아요.'
  if (aqi <= 100) return '장시간 야외 활동은 주의하세요.'
  if (aqi <= 150) return '호흡기가 민감하다면 마스크를 착용하세요.'
  return '외출할 때 마스크를 착용하세요.'
}

const getTravelScore = (temp, weatherMain, aqi) => {
  let score = 70
  const guides = []

  if (weatherMain === 'Rain' || weatherMain === 'Drizzle' || weatherMain === 'Thunderstorm') {
    score -= 32
    guides.push('우산을 챙기고 실내 일정도 함께 준비하세요.')
  } else if (weatherMain === 'Mist' || weatherMain === 'Fog' || weatherMain === 'Haze') {
    score -= 18
    guides.push('시야가 흐릴 수 있으니 이동 시간을 여유 있게 잡아보세요.')
  } else if (weatherMain === 'Clear') {
    score += 10
  }

  if (temp >= 31) {
    score -= 18
    guides.push('더운 시간대는 피하고 실내 또는 저녁 일정을 추천합니다.')
  } else if (temp >= 28) {
    score -= 7
    guides.push('햇볕이 강할 수 있으니 실내 휴식 시간을 넣어보세요.')
  } else if (temp >= 18 && temp <= 25) {
    score += 10
  } else if (temp >= 26 && temp <= 27) {
    score += 4
  } else if (temp <= 8) {
    score -= 18
    guides.push('기온이 낮으니 따뜻한 옷을 준비하세요.')
  }

  if (aqi > 150) {
    score -= 35
    guides.push('대기질이 좋지 않아 실내 관광을 추천합니다.')
  } else if (aqi > 100) {
    score -= 20
    guides.push('호흡기가 민감하다면 마스크를 준비하세요.')
  } else if (aqi > 50) {
    score -= 7
    guides.push('장시간 야외 활동은 조금만 줄여보세요.')
  } else {
    score += 5
  }

  return {
    score: Math.max(0, score),
    guides,
  }
}

const getScoreLabel = (score) => {
  if (score >= 88) return '오늘 떠나기 좋아요'
  if (score >= 70) return '가벼운 외출을 추천해요'
  if (score >= 50) return '일정을 조절해 보세요'
  return '실내 중심 일정이 좋아요'
}

const getScoreTone = (score) => {
  if (score >= 88) return 'excellent'
  if (score >= 70) return 'good'
  if (score >= 50) return 'caution'
  return 'poor'
}

const travelSuitability = computed(() => {
  if (!weatherData.value || !airQualityData.value) return null

  const weather = weatherData.value.weather[0]
  const result = getTravelScore(weatherData.value.main.temp, weather.main, airQualityData.value.us_aqi)

  return {
    ...result,
    label: getScoreLabel(result.score),
    tone: getScoreTone(result.score),
    guide: result.guides[0] || '현재 날씨와 대기질이 여행하기 좋은 편입니다.',
  }
})

const weeklyRecommendation = computed(() => {
  if (!forecastList.value.length) return null

  const scoredForecasts = forecastList.value.map((item) => {
    const result = getTravelScore(item.main.temp, item.weather[0].main, 70)

    return {
      ...item,
      ...result,
    }
  })
  const bestForecast = scoredForecasts.reduce((best, item) => (item.score > best.score ? item : best))

  return {
    ...bestForecast,
    label: getScoreLabel(bestForecast.score),
  }
})

const formatDate = (dateText) => {
  const date = new Date(`${dateText}T00:00:00`)
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
  }).format(date)
}

const getDailyForecasts = (hourlyList) => {
  const forecastsByDate = {}

  hourlyList.forEach((item) => {
    const [date, time] = item.dt_txt.split(' ')
    const hour = Number(time.slice(0, 2))
    const previous = forecastsByDate[date]

    if (!previous || Math.abs(hour - 12) < Math.abs(previous.hour - 12)) {
      forecastsByDate[date] = { ...item, hour }
    }
  })

  return Object.entries(forecastsByDate)
    .slice(0, 5)
    .map(([date, item]) => ({ ...item, date }))
}

const handleFetchWeather = async () => {
  isLoading.value = true
  errorMessage.value = ''

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
  const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'
  const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'
  const AIR_QUALITY_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality'
  const selectedCityInfo = cityOptions.find((city) => city.value === selectedCity.value)
  const requestParams = {
    q: selectedCity.value,
    appid: API_KEY,
    units: 'metric',
    lang: 'kr',
  }

  if (!API_KEY) {
    errorMessage.value = 'OpenWeather API 키 설정이 필요합니다. .env 파일을 확인하세요.'
    isLoading.value = false
    return
  }

  try {
    const [weatherResponse, forecastResponse, airQualityResponse] = await Promise.all([
      axios.get(CURRENT_WEATHER_URL, { params: requestParams }),
      axios.get(FORECAST_URL, { params: requestParams }),
      axios.get(AIR_QUALITY_URL, {
        params: {
          latitude: selectedCityInfo.latitude,
          longitude: selectedCityInfo.longitude,
          current: 'pm2_5,pm10,us_aqi',
          timezone: 'Asia/Seoul',
        },
      }),
    ])

    weatherData.value = weatherResponse.data
    forecastList.value = getDailyForecasts(forecastResponse.data.list)
    airQualityData.value = airQualityResponse.data.current
  } catch (error) {
    console.error('통신 중 에러가 발생했습니다:', error)
    errorMessage.value = '날씨 데이터를 가져오지 못했습니다. API 키와 네트워크를 확인하세요.'
  } finally {
    isLoading.value = false
  }
}

watch(
  () => route.query.city,
  () => {
    applyCityFromQuery()
    handleFetchWeather()
  },
)

onMounted(() => {
  applyCityFromQuery()
  handleFetchWeather()
})
</script>

<template>
  <div class="practice-section">
    <h2>현재 날씨</h2>
    <div class="search-row">
      <label for="weather-city">조회 도시</label>
      <select id="weather-city" v-model="selectedCity" :disabled="isLoading">
        <option v-for="city in cityOptions" :key="city.value" :value="city.value">
          {{ city.label }}
        </option>
      </select>
      <button @click="handleFetchWeather" :disabled="isLoading">
        {{ isLoading ? '데이터 로딩 중...' : '현재 날씨 조회' }}
      </button>
    </div>

    <div v-if="weatherData" class="result-card">
      <p>
        📍 위치: <strong>{{ weatherData.name }}</strong>
      </p>
      <p>
        🌡️ 현재 기온: <strong>{{ configStore.formatTemperature(weatherData.main.temp) }}</strong>
      </p>
      <p>
        ☁️ 날씨 상태: <strong>{{ getWeatherLabel(weatherData.weather[0]) }}</strong>
      </p>
      <p>
        💧 습도: <strong>{{ weatherData.main.humidity }}%</strong>
      </p>
    </div>

    <section v-if="airQualityData" class="air-quality-section">
      <h3>💨 오늘의 대기질</h3>
      <div class="air-quality-card">
        <p>
          공기질 지수: <strong>{{ Math.round(airQualityData.us_aqi) }} · {{ getAirQualityLabel(airQualityData.us_aqi) }}</strong>
        </p>
        <p>초미세먼지(PM2.5): {{ Math.round(airQualityData.pm2_5) }} μg/m³</p>
        <p>미세먼지(PM10): {{ Math.round(airQualityData.pm10) }} μg/m³</p>
        <p class="air-quality-guide">{{ getAirQualityGuide(airQualityData.us_aqi) }}</p>
      </div>
    </section>

    <section v-if="travelSuitability" class="travel-score-section">
      <div class="section-heading">
        <div>
          <p class="section-kicker">TRAVEL SCORE</p>
          <h3>오늘의 여행 적합도</h3>
        </div>
        <el-tag :type="travelSuitability.score >= 65 ? 'success' : 'warning'" effect="light">
          실제 날씨 기준
        </el-tag>
      </div>

      <div class="travel-score-card" :class="travelSuitability.tone">
        <div class="score-number">
          <strong>{{ travelSuitability.score }}</strong>
          <span>점</span>
        </div>
        <div>
          <h4>{{ travelSuitability.label }}</h4>
          <p>{{ travelSuitability.guide }}</p>
        </div>
      </div>
    </section>

    <section v-if="weeklyRecommendation" class="weekly-recommendation">
      <div class="weekly-icon">✦</div>
      <div>
        <p class="section-kicker">BEST DAY THIS WEEK</p>
        <h3>이번 주 추천 여행일: {{ formatDate(weeklyRecommendation.date) }}</h3>
        <p>
          예보 기준 {{ weeklyRecommendation.score }}점 · {{ getWeatherLabel(weeklyRecommendation.weather[0]) }} ·
          {{ configStore.formatTemperature(weeklyRecommendation.main.temp) }} · {{ weeklyRecommendation.label }}
        </p>
      </div>
    </section>

    <section v-if="forecastList.length" class="forecast-section">
      <h3>📅 5일 예보</h3>
      <p class="forecast-guide">각 날짜에서 정오와 가장 가까운 예보를 표시합니다.</p>

      <div class="forecast-grid">
        <article
          v-for="item in forecastList"
          :key="item.dt"
          class="forecast-card"
          :class="{ 'best-day': weeklyRecommendation && item.dt === weeklyRecommendation.dt }"
        >
          <strong>{{ formatDate(item.date) }}</strong>
          <img
            :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
            :alt="getWeatherLabel(item.weather[0])"
          />
          <p>{{ configStore.formatTemperature(item.main.temp) }} · {{ getWeatherLabel(item.weather[0]) }}</p>
          <el-tag v-if="weeklyRecommendation && item.dt === weeklyRecommendation.dt" size="small" type="success">
            추천 여행일
          </el-tag>
          <small v-if="item.weather[0].main === 'Rain'">☂️ 우산을 챙기세요</small>
          <small v-else>🧥 외출 전 날씨를 확인하세요</small>
        </article>
      </div>
    </section>

    <p v-else-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <div v-else>
      <p>현재 날씨 데이터를 불러오는 중입니다.</p>
    </div>
  </div>
</template>

<style scoped>
.search-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.search-row label {
  font-weight: bold;
  color: #355f44;
}

.search-row select {
  min-width: 120px;
  padding: 8px 10px;
  border: 1px solid #b9d9c1;
  border-radius: 6px;
  background: #fff;
}

.search-row button {
  padding: 8px 12px;
  border: 0;
  border-radius: 6px;
  background: #33865a;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

.search-row button:disabled {
  opacity: 0.65;
  cursor: default;
}

.result-card {
  background: #f7fcf8;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #dcece0;
  line-height: 1.8;
  animation: slide-up 0.45s ease both;
}
.result-card strong {
  color: #27814c;
}

.air-quality-section {
  margin-top: 22px;
}

.air-quality-section h3 {
  margin-bottom: 8px;
  color: #2d6943;
}

.air-quality-card {
  padding: 14px 16px;
  border: 1px solid #d9ece5;
  border-radius: 10px;
  background: #f3fbf7;
  animation: slide-up 0.5s ease both;
}

.air-quality-card p {
  margin: 5px 0;
}

.air-quality-card strong {
  color: #168458;
}

.air-quality-guide {
  margin-top: 10px !important;
  color: #486a5b;
  font-weight: bold;
}

.travel-score-section {
  margin-top: 22px;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 9px;
}

.section-heading h3,
.weekly-recommendation h3 {
  margin: 0;
  color: #2d6943;
}

.section-kicker {
  margin: 0 0 3px;
  color: #5a9e70;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.travel-score-card {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px 20px;
  border: 1px solid #d4e9d9;
  border-radius: 13px;
  background: linear-gradient(120deg, #f2fbf4, #fff);
  box-shadow: 0 8px 18px rgba(65, 121, 82, 0.08);
  animation: score-pop 0.55s ease both;
}

.score-number {
  display: flex;
  align-items: baseline;
  min-width: 92px;
  color: #2b8751;
}

.score-number strong {
  font-size: 44px;
  line-height: 1;
  letter-spacing: -0.06em;
}

.score-number span {
  margin-left: 4px;
  font-size: 15px;
  font-weight: 700;
}

.travel-score-card h4 {
  margin: 0 0 5px;
  color: #315d41;
  font-size: 18px;
}

.travel-score-card p {
  margin: 0;
  color: #5d7463;
  line-height: 1.55;
}

.travel-score-card.excellent {
  border-color: #bde7d2;
  background: linear-gradient(120deg, #effbf5, #fff);
}

.travel-score-card.excellent .score-number {
  color: #21885e;
}

.travel-score-card.good {
  border-color: #bfdfc8;
}

.travel-score-card.caution {
  border-color: #f0dcae;
  background: linear-gradient(120deg, #fff9e9, #fff);
}

.travel-score-card.caution .score-number {
  color: #ba7c22;
}

.travel-score-card.poor {
  border-color: #f0c9c4;
  background: linear-gradient(120deg, #fff4f2, #fff);
}

.travel-score-card.poor .score-number {
  color: #c65d52;
}

.weekly-recommendation {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 18px;
  padding: 16px 18px;
  border: 1px solid #e3d6ac;
  border-radius: 12px;
  background: linear-gradient(120deg, #fffbeb, #fffdf7);
  animation: slide-up 0.65s ease both;
}

.weekly-icon {
  display: grid;
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  background: #fff1b8;
  color: #bd861d;
  font-size: 20px;
  animation: gentle-spin 6s linear infinite;
}

.weekly-recommendation p:last-child {
  margin: 5px 0 0;
  color: #6c756d;
  line-height: 1.5;
}

.forecast-section {
  margin-top: 22px;
}

.forecast-section h3 {
  margin-bottom: 4px;
  color: #2d6943;
}

.forecast-guide {
  margin-top: 0;
  color: #6a806f;
  font-size: 13px;
}

.forecast-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(120px, 1fr));
  gap: 10px;
}

.forecast-card {
  padding: 12px 8px;
  border: 1px solid #d5e8d9;
  border-radius: 10px;
  background: linear-gradient(180deg, #fff, #f1faf3);
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  animation: slide-up 0.45s ease both;
}

.forecast-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 9px 18px rgba(65, 121, 82, 0.13);
}

.forecast-card.best-day {
  border: 2px solid #8dccaa;
  background: linear-gradient(180deg, #f4fff8, #ecf9f1);
}

.forecast-card img {
  display: block;
  width: 58px;
  height: 58px;
  margin: 3px auto;
}

.forecast-card p {
  margin: 2px 0 8px;
  font-size: 13px;
}

.forecast-card :deep(.el-tag) {
  margin-bottom: 2px;
}

.forecast-card small {
  display: block;
  margin-top: 5px;
  color: #55735d;
}

.error-message {
  color: #c0392b;
  font-weight: bold;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes score-pop {
  from {
    opacity: 0;
    transform: scale(0.97);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes gentle-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 760px) {
  .forecast-grid {
    grid-template-columns: repeat(2, minmax(120px, 1fr));
  }

  .travel-score-card {
    align-items: flex-start;
    gap: 12px;
  }
}
</style>

<script setup>
import { ref } from 'vue'
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', tips: ['선크림', '물', '선글라스'] },
  { id: 'city_02', name: '수원', temp: 24, status: '비', tips: ['우산', '방수 신발', '얇은 겉옷'] },
  { id: 'city_03', name: '부산', temp: 26, status: '구름', tips: ['가벼운 가방', '물', '얇은 겉옷'] },
  { id: 'city_04', name: '울산', temp: 22, status: '맑음', tips: ['얇은 겉옷', '물', '모자'] },
  { id: 'city_05', name: '대전', temp: 30, status: '맑음', tips: ['선크림', '물', '휴대용 선풍기'] },
  { id: 'city_06', name: '제주', temp: 27, status: '비', tips: ['우산', '방수 신발', '여벌 양말'] },
  { id: 'city_07', name: '광주', temp: 23, status: '구름', tips: ['얇은 겉옷', '물', '접이식 우산'] },
  { id: 'city_08', name: '대구', temp: 29, status: '맑음', tips: ['선크림', '물', '모자'] },
  { id: 'city_09', name: '춘천', temp: 21, status: '구름', tips: ['얇은 겉옷', '물', '카메라'] },
  { id: 'city_10', name: '강릉', temp: 24, status: '맑음', tips: ['선크림', '물', '선글라스'] },
  { id: 'city_11', name: '속초', temp: 22, status: '구름', tips: ['얇은 겉옷', '물', '편한 신발'] },
  { id: 'city_12', name: '포항', temp: 25, status: '맑음', tips: ['선크림', '물', '모자'] },
  { id: 'city_13', name: '경주', temp: 24, status: '맑음', tips: ['편한 신발', '물', '카메라'] },
  { id: 'city_14', name: '여수', temp: 23, status: '구름', tips: ['얇은 겉옷', '물', '접이식 우산'] },
  { id: 'city_15', name: '전주', temp: 26, status: '맑음', tips: ['선크림', '물', '편한 신발'] },
  { id: 'city_16', name: '안동', temp: 22, status: '구름', tips: ['얇은 겉옷', '물', '카메라'] },
  { id: 'city_17', name: '청주', temp: 25, status: '맑음', tips: ['선크림', '물', '편한 신발'] },
  { id: 'city_18', name: '목포', temp: 23, status: '구름', tips: ['얇은 겉옷', '물', '바람막이'] },
])

const searchQuery = ref('')
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
    <section class="search-box">
      <h3>🔍 도시 검색</h3>
      <!-- input type="text" v-model="searchQuery" placeholder="검색할 도시 이름 입력" / -->
      <input type="text" :value="searchQuery" @input="(e) => (searchQuery = e.target.value)" placeholder="검색할 도시 이름 입력" />
      <p>
        검색 중인 도시: <strong>{{ searchQuery }}</strong>
      </p>
    </section>

    <section class="list-box">
      <h3>🏙️ 지역별 날씨 현황</h3>

      <div v-for="item in weatherList" :key="item.id" class="weather-card" @click="selectedCityInfo = `${item.name}${getSubjectParticle(item.name)} 선택되었습니다.`">
        <h4>{{ item.name }} ({{ item.status }})</h4>
        <p>현재 기온: {{ configStore.formatTemperature(item.temp) }}</p>

        <span v-if="item.temp > 26 && (item.status === '비' || item.status === '습함')" class="badge muggy">😓 찝찝함 (고온·비/습함)</span>
        <span v-else-if="item.temp >= 26" class="badge hot">🔥 더움 (26도 이상)</span>
        <span v-else class="badge cool">❄️ 선선함 (26도 미만)</span>

        <p v-if="item.status === '비'" class="travel-tip">☂️ 여행 팁: 우산을 챙기세요</p>
        <p v-else-if="item.temp >= 26" class="travel-tip">👕 여행 팁: 반팔을 추천해요</p>
        <p v-else class="travel-tip">🧥 여행 팁: 얇은 겉옷을 챙기세요!</p>

        <p class="packing-title">🎒 추천 준비물</p>
        <ul class="packing-list">
          <li v-for="tip in item.tips" :key="tip">{{ tip }}</li>
        </ul>

        <button class="btn-detail" @click.stop="showDetail(item.name, item.status)">상세보기</button>
      </div>
    </section>

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>

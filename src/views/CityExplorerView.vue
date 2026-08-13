<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import koreaMap from '@/assets/maps/south-korea-administrative.svg'

const router = useRouter()
const configStore = useConfigStore()

const cities = [
  {
    id: 'seoul',
    name: '서울',
    apiCity: 'Seoul,KR',
    icon: '🏯',
    mapX: '30.8%',
    mapY: '23.8%',
    weather: '맑음',
    temp: 28,
    description: '도심에서 즐기는 전시와 산책을 추천합니다.',
    places: ['국립중앙박물관', '북촌한옥마을', '한강공원'],
  },
  {
    id: 'incheon',
    name: '인천',
    apiCity: 'Incheon,KR',
    icon: '✈️',
    mapX: '22.8%',
    mapY: '25.8%',
    weather: '구름',
    temp: 25,
    description: '바다 풍경과 근대 문화 공간을 둘러보기 좋아요.',
    places: ['송도 센트럴파크', '차이나타운', '월미도'],
  },
  {
    id: 'suwon',
    name: '수원',
    apiCity: 'Suwon,KR',
    icon: '🏰',
    mapX: '31.4%',
    mapY: '29.5%',
    weather: '비',
    temp: 24,
    description: '비 오는 날에는 실내 카페와 전시를 추천합니다.',
    places: ['수원화성', '행궁동 카페거리', '수원시립미술관'],
  },
  {
    id: 'daejeon',
    name: '대전',
    apiCity: 'Daejeon,KR',
    icon: '🔭',
    mapX: '40.9%',
    mapY: '50.3%',
    weather: '맑음',
    temp: 30,
    description: '더운 날에는 실내 문화 공간에서 쉬어가세요.',
    places: ['국립중앙과학관', '한밭수목원', '성심당 본점'],
  },
  {
    id: 'daegu',
    name: '대구',
    apiCity: 'Daegu,KR',
    icon: '🍎',
    mapX: '70.3%',
    mapY: '60.7%',
    weather: '맑음',
    temp: 29,
    description: '해가 강한 날에는 실내 명소를 함께 즐겨보세요.',
    places: ['김광석다시그리기길', '동성로', '대구미술관'],
  },
  {
    id: 'ulsan',
    name: '울산',
    apiCity: 'Ulsan,KR',
    icon: '🐋',
    mapX: '87.4%',
    mapY: '67.3%',
    weather: '맑음',
    temp: 22,
    description: '선선한 날에는 강변과 정원 산책이 좋습니다.',
    places: ['태화강 국가정원', '장생포 고래문화마을', '대왕암공원'],
  },
  {
    id: 'busan',
    name: '부산',
    apiCity: 'Busan,KR',
    icon: '🌊',
    mapX: '82.3%',
    mapY: '75.7%',
    weather: '구름',
    temp: 26,
    description: '바닷바람을 맞으며 해안 산책을 즐겨보세요.',
    places: ['해운대 해수욕장', '감천문화마을', '흰여울문화마을'],
  },
  {
    id: 'gwangju',
    name: '광주',
    apiCity: 'Gwangju,KR',
    icon: '🎨',
    mapX: '26.5%',
    mapY: '76.1%',
    weather: '구름',
    temp: 23,
    description: '여유롭게 문화 공간과 도심 산책을 즐겨보세요.',
    places: ['국립아시아문화전당', '양림동 역사문화마을', '무등산'],
  },
  {
    id: 'jeju',
    name: '제주',
    apiCity: 'Jeju,KR',
    icon: '🗿',
    mapX: '86.4%',
    mapY: '93.6%',
    weather: '비',
    temp: 27,
    description: '비가 오는 날에는 실내 전시와 카페를 추천합니다.',
    places: ['제주현대미술관', '아르떼뮤지엄', '성산일출봉'],
  },
  {
    id: 'chuncheon',
    name: '춘천',
    apiCity: 'Chuncheon,KR',
    icon: '🌿',
    mapX: '44%',
    mapY: '16%',
    weather: '구름',
    temp: 21,
    description: '호수 주변을 따라 천천히 걷기 좋은 도시입니다.',
    places: ['의암호 스카이워크', '김유정문학촌', '공지천 산책로'],
  },
  {
    id: 'gangneung',
    name: '강릉',
    apiCity: 'Gangneung,KR',
    icon: '☕',
    mapX: '78.4%',
    mapY: '20.4%',
    weather: '맑음',
    temp: 24,
    description: '바다를 보며 커피와 해안 산책을 즐겨보세요.',
    places: ['안목해변 커피거리', '경포호', '오죽헌'],
  },
  {
    id: 'sokcho',
    name: '속초',
    apiCity: 'Sokcho,KR',
    icon: '🐟',
    mapX: '70.2%',
    mapY: '8.2%',
    weather: '구름',
    temp: 22,
    description: '동해와 설악산의 풍경을 함께 즐기기 좋습니다.',
    places: ['속초해수욕장', '영금정', '설악산 국립공원'],
  },
  {
    id: 'pohang',
    name: '포항',
    apiCity: 'Pohang,KR',
    icon: '🌅',
    mapX: '89.5%',
    mapY: '56.5%',
    weather: '맑음',
    temp: 25,
    description: '해안 드라이브와 야경 산책을 추천합니다.',
    places: ['스페이스워크', '영일대해수욕장', '호미곶'],
  },
  {
    id: 'gyeongju',
    name: '경주',
    apiCity: 'Gyeongju,KR',
    icon: '🏛️',
    mapX: '83.4%',
    mapY: '63%',
    weather: '맑음',
    temp: 24,
    description: '고즈넉한 유적지와 골목을 둘러보기 좋은 날입니다.',
    places: ['대릉원', '황리단길', '동궁과 월지'],
  },
  {
    id: 'yeosu',
    name: '여수',
    apiCity: 'Yeosu,KR',
    icon: '🚠',
    mapX: '46.8%',
    mapY: '84.4%',
    weather: '구름',
    temp: 23,
    description: '바다 풍경과 낭만적인 밤바다를 즐겨보세요.',
    places: ['여수해상케이블카', '오동도', '향일암'],
  },
  {
    id: 'jeonju',
    name: '전주',
    apiCity: 'Jeonju,KR',
    icon: '🍲',
    mapX: '33.2%',
    mapY: '59.2%',
    weather: '맑음',
    temp: 26,
    description: '한옥 골목과 맛집을 여유롭게 둘러보세요.',
    places: ['전주한옥마을', '경기전', '남부시장'],
  },
  {
    id: 'andong',
    name: '안동',
    apiCity: 'Andong,KR',
    icon: '🎭',
    mapX: '71.4%',
    mapY: '43%',
    weather: '구름',
    temp: 22,
    description: '전통 마을과 강변 풍경을 즐기기 좋습니다.',
    places: ['하회마을', '월영교', '도산서원'],
  },
  {
    id: 'cheongju',
    name: '청주',
    apiCity: 'Cheongju,KR',
    icon: '📚',
    mapX: '43.4%',
    mapY: '43.1%',
    weather: '맑음',
    temp: 25,
    description: '박물관과 고즈넉한 도심 산책을 추천합니다.',
    places: ['국립청주박물관', '청남대', '성안길'],
  },
  {
    id: 'mokpo',
    name: '목포',
    apiCity: 'Mokpo,KR',
    icon: '⛴️',
    mapX: '13.5%',
    mapY: '84.2%',
    weather: '구름',
    temp: 23,
    description: '항구와 근대 문화 공간을 함께 둘러보세요.',
    places: ['목포해상케이블카', '근대역사문화공간', '갓바위'],
  },
]

const selectedCity = ref(cities[0])

const selectCity = (city) => {
  selectedCity.value = city
}

const goToLiveWeather = () => {
  router.push({
    name: 'AxiosJson',
    query: { city: selectedCity.value.apiCity },
  })
}
</script>

<template>
  <div class="city-explorer-page">
    <section class="explorer-hero">
      <p class="eyebrow">CITY GUIDE</p>
      <h2>어디로 떠날까요?</h2>
      <p>지도에서 도시를 선택하면 날씨에 어울리는 관광지를 확인할 수 있습니다.</p>
    </section>

    <div class="explorer-layout">
      <el-card class="map-card" shadow="never">
        <template #header>
          <div class="card-header">
            <span class="map-title"><span aria-hidden="true">🌿</span> 대한민국 주요 도시</span>
            <small>도시 마커를 선택하세요</small>
          </div>
        </template>

        <div class="map-stage">
          <img :src="koreaMap" alt="대한민국 행정구역 지도" class="map-image" />
          <el-tooltip v-for="city in cities" :key="city.id" :content="`${city.icon} ${city.name} 선택`" placement="top">
            <button
              type="button"
              class="city-marker"
              :class="{ selected: selectedCity.id === city.id }"
              :style="{ left: city.mapX, top: city.mapY }"
              :aria-label="`${city.name} 선택`"
              @click="selectCity(city)"
            >
              <span class="marker-icon" aria-hidden="true">{{ city.icon }}</span>
            </button>
          </el-tooltip>
        </div>
        <div class="map-legend" aria-label="도시 선택 목록">
          <button
            v-for="city in cities"
            :key="city.id"
            type="button"
            :class="{ selected: selectedCity.id === city.id }"
            @click="selectCity(city)"
          >
            <span class="city-choice-icon" aria-hidden="true">{{ city.icon }}</span>
            <span>{{ city.name }}</span>
          </button>
        </div>
        <p class="map-credit">
          지도 출처:
          <a href="https://commons.wikimedia.org/wiki/File:Administrative_divisions_map_of_South_Korea.svg" target="_blank" rel="noreferrer">Wikimedia Commons</a>
        </p>
      </el-card>

      <el-card class="guide-card" shadow="never">
        <template #header>
          <div class="card-header">
            <span class="guide-title">
              <span class="guide-city-icon" aria-hidden="true">{{ selectedCity.icon }}</span>
              {{ selectedCity.name }} 나들이 가이드
            </span>
            <el-tag :type="selectedCity.weather === '비' ? 'info' : 'success'" effect="light">
              {{ selectedCity.weather }} · {{ configStore.formatTemperature(selectedCity.temp) }}
            </el-tag>
          </div>
        </template>

        <p class="guide-description">{{ selectedCity.description }}</p>
        <h3>추천 장소</h3>
        <ul class="place-list">
          <li v-for="place in selectedCity.places" :key="place"><span aria-hidden="true">●</span>{{ place }}</li>
        </ul>
        <el-button type="primary" class="weather-button" @click="goToLiveWeather">
          {{ selectedCity.name }} 실시간 날씨 보기
        </el-button>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.city-explorer-page {
  width: min(100%, 1040px);
  margin: 0 auto;
}

.explorer-hero {
  margin-bottom: 22px;
  padding: 26px 28px;
  border: 1px solid #d7ead9;
  border-radius: 22px;
  background:
    radial-gradient(circle at 92% 15%, rgba(250, 205, 107, 0.26), transparent 20%),
    linear-gradient(120deg, #e6f6eb, #fbfefa 62%, #fffdf4);
  box-shadow: 0 10px 24px rgba(46, 112, 72, 0.07);
}

.eyebrow {
  margin: 0;
  color: #2c8a53;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.explorer-hero h2 {
  margin: 6px 0;
  color: #234a32;
}

.explorer-hero p:last-child {
  margin: 0;
  color: #587365;
}

.explorer-layout {
  display: grid;
  grid-template-columns: minmax(310px, 0.9fr) minmax(320px, 1.1fr);
  gap: 18px;
}

.map-card,
.guide-card {
  border-color: #d8eadc;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 24px rgba(49, 111, 72, 0.07);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: #2c5d3c;
  font-weight: 700;
}

.card-header small {
  color: #7b9985;
  font-size: 12px;
  font-weight: 400;
}

.map-stage {
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 18px;
  background: radial-gradient(circle at 50% 38%, #f7fcf7, #edf7ef);
}

.map-image {
  display: block;
  width: 100%;
  max-height: 530px;
  object-fit: contain;
  filter: saturate(0.56) contrast(1.04) sepia(0.08) hue-rotate(54deg);
}

.city-marker {
  position: absolute;
  z-index: 1;
  transform: translate(-50%, -50%);
  display: grid;
  width: 24px;
  height: 24px;
  padding: 0;
  place-items: center;
  border: 2px solid #f9fff9;
  border-radius: 999px;
  background: #3f9861;
  box-shadow: 0 3px 9px rgba(34, 91, 54, 0.28);
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.city-marker:hover,
.city-marker.selected {
  background: #dba23c;
  transform: translate(-50%, -50%) scale(1.18);
}

.marker-icon {
  font-size: 12px;
  line-height: 1;
}

.city-marker.selected {
  animation: marker-pulse 1.8s ease-in-out infinite;
}

.map-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 14px;
}

.map-legend button {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px 4px 4px;
  border: 1px solid #d6e9d9;
  border-radius: 999px;
  background: #fafffa;
  color: #587461;
  cursor: pointer;
  font-size: 11px;
  transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.city-choice-icon {
  display: grid;
  width: 24px;
  height: 24px;
  place-items: center;
  border-radius: 50%;
  background: #e8f6ea;
  font-size: 13px;
}

.map-legend button:hover,
.map-legend button.selected {
  border-color: #82bd91;
  background: #eff9f0;
  color: #207142;
  font-weight: 700;
  transform: translateY(-2px);
}

.map-legend button.selected .city-choice-icon {
  background: #d2efd7;
}

.map-credit {
  margin: 8px 0 0;
  color: #85988a;
  font-size: 11px;
  text-align: right;
}

.map-credit a {
  color: #427e55;
}

@keyframes marker-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(219, 162, 60, 0.38);
  }

  50% {
    box-shadow: 0 0 0 8px rgba(219, 162, 60, 0);
  }
}

.guide-description {
  margin: 0 0 22px;
  color: #587361;
  line-height: 1.7;
}

.guide-card h3 {
  margin: 0 0 10px;
  font-size: 16px;
  color: #2d653f;
}

.place-list {
  margin: 0;
  padding-left: 20px;
  color: #587361;
  line-height: 2;
}

.guide-title,
.map-title {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.guide-city-icon {
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border-radius: 50%;
  background: #e8f5e9;
  font-size: 16px;
}

.place-list li::marker {
  content: '';
}

.place-list li span {
  margin-right: 8px;
  color: #5ca371;
  font-size: 9px;
  vertical-align: 1px;
}

.weather-button {
  width: 100%;
  margin-top: 24px;
}

@media (max-width: 720px) {
  .explorer-layout {
    grid-template-columns: 1fr;
  }
}
</style>

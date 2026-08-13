<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from './components/exercise/UnitToggler.vue'

const router = useRouter()
const searchKeyword = ref('')
const searchMessage = ref('')

const citySearchList = [
  { name: '서울', apiCity: 'Seoul,KR' },
  { name: '인천', apiCity: 'Incheon,KR' },
  { name: '수원', apiCity: 'Suwon,KR' },
  { name: '대전', apiCity: 'Daejeon,KR' },
  { name: '대구', apiCity: 'Daegu,KR' },
  { name: '울산', apiCity: 'Ulsan,KR' },
  { name: '부산', apiCity: 'Busan,KR' },
  { name: '광주', apiCity: 'Gwangju,KR' },
  { name: '제주', apiCity: 'Jeju,KR' },
  { name: '춘천', apiCity: 'Chuncheon,KR' },
  { name: '강릉', apiCity: 'Gangneung,KR' },
  { name: '속초', apiCity: 'Sokcho,KR' },
  { name: '포항', apiCity: 'Pohang,KR' },
  { name: '경주', apiCity: 'Gyeongju,KR' },
  { name: '여수', apiCity: 'Yeosu,KR' },
  { name: '전주', apiCity: 'Jeonju,KR' },
  { name: '안동', apiCity: 'Andong,KR' },
  { name: '청주', apiCity: 'Cheongju,KR' },
  { name: '목포', apiCity: 'Mokpo,KR' },
]

const searchWeather = () => {
  const keyword = searchKeyword.value.trim()
  const city = citySearchList.find((item) => item.name === keyword)

  if (!keyword) {
    searchMessage.value = '도시 이름을 입력해 주세요.'
    return
  }

  if (!city) {
    searchMessage.value = '서울, 부산, 울산 등 등록된 도시 이름으로 검색해 주세요.'
    return
  }

  searchMessage.value = ''
  router.push({ name: 'AxiosJson', query: { city: city.apiCity } })
}
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <div class="brand-group">
        <RouterLink to="/" class="brand"><span aria-hidden="true">🌿</span> Weatherly</RouterLink>
        <p>날씨를 보고, 오늘 떠날 곳을 고르세요.</p>
      </div>

      <form class="site-search" @submit.prevent="searchWeather">
        <label for="city-search" class="sr-only">도시 검색</label>
        <input id="city-search" v-model="searchKeyword" type="search" placeholder="도시 이름으로 실시간 날씨 검색" />
        <button type="submit" aria-label="도시 날씨 검색">⌕</button>
      </form>

      <div class="header-tools">
        <UnitToggler />
      </div>
    </header>
    <p v-if="searchMessage" class="search-message">{{ searchMessage }}</p>

    <nav class="navigation-bar">
      <RouterLink to="/" class="nav-item">여행 추천</RouterLink>
      <span class="divider">|</span>
      <RouterLink to="/weather" class="nav-item">실시간 날씨</RouterLink>
      <span class="divider">|</span>
      <RouterLink to="/tips" class="nav-item">외출 준비</RouterLink>
      <span class="divider">|</span>
      <RouterLink to="/recommend" class="nav-item">나들이 추천</RouterLink>
      <span class="divider">|</span>
      <RouterLink to="/assignment" class="nav-item">여행 스타일</RouterLink>
      <span class="divider">|</span>
      <RouterLink to="/about" class="nav-item">서비스 안내</RouterLink>
      <span class="divider">|</span>
      <RouterLink to="/element-plus" class="nav-item">내 설정</RouterLink>
    </nav>

    <nav class="quick-menu" aria-label="주요 기능 바로가기">
      <RouterLink to="/weather" class="quick-link">
        <span class="quick-icon">☀️</span>
        <span><strong>오늘의 날씨</strong><small>실시간·예보·대기질</small></span>
      </RouterLink>
      <RouterLink to="/" class="quick-link">
        <span class="quick-icon">🧭</span>
        <span><strong>여행지 찾기</strong><small>도시별 명소 추천</small></span>
      </RouterLink>
      <RouterLink to="/tips" class="quick-link">
        <span class="quick-icon">🎒</span>
        <span><strong>외출 준비</strong><small>날씨별 준비물</small></span>
      </RouterLink>
      <RouterLink to="/recommend" class="quick-link">
        <span class="quick-icon">🌱</span>
        <span><strong>나들이 추천</strong><small>가벼운 하루 계획</small></span>
      </RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<style>
@import '@/assets/exercise.css';

.navigation-bar .router-link-exact-active {
  color: #28834d;
  border-bottom: 2px solid #43a665;
  padding-bottom: 2px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>

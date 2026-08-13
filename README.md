# Vue 4일차 종합실습 - Weatherly

## 프로젝트 소개

Vue 3로 만든 여행 날씨 서비스입니다. 도시별 날씨와 대기질, 5일 예보를 확인하고 여행 적합도와 관광지를 함께 볼 수 있습니다.

## 실행 방법

프로젝트 루트에 `.env` 파일을 만들고 OpenWeather API 키를 입력합니다.

```bash
VITE_OPENWEATHER_API_KEY=발급받은_OpenWeather_API_키
```

그다음 터미널에서 아래 명령어를 실행합니다.

```bash
npm install
npm run dev
```

## 종합실습 1 : Weather Mockup

- 도시 이름, 기온, 날씨 상태 데이터를 배열로 작성
- `v-for`와 `:key`를 사용하여 도시별 날씨 카드를 반복 출력
- `v-if`, `v-else-if`, `v-else`를 사용하여 기온과 날씨 상태에 따라 더움, 선선함, 찝찝함 표시
- 비가 오는 도시에는 우산, 더운 도시에는 반팔 추천 팁 표시
- 도시별 추천 준비물과 카드 클릭, 상세보기 버튼 이벤트 구현

## 종합실습 2 : Weather Composition

- `ref`로 더위 기준 온도 데이터를 관리
- `v-model.number`로 사용자가 더위 민감도 기준을 변경하도록 구현
- `computed`로 검색어와 일치하는 도시를 필터링
- `watch`와 `watchEffect`로 선택 도시와 검색어 변화를 확인
- 비가 오지 않고 기준보다 선선한 도시를 오늘의 추천 도시로 표시

## 종합실습 3 : Weather Component

- 날씨 화면을 `SearchBar`, `WeatherCard`, `BaseDashboardCard` 컴포넌트로 분리
- 부모 컴포넌트에서 데이터를 관리하고, 자식 컴포넌트에 `props`와 `emits`로 전달
- 도시 검색과 상세보기 이동 기능 구현

![종합실습 3 - Component 화면](./screenshots%20day3/weather-component.png)

## 종합실습 4 : Vue Router 적용

- `RouterLink`, `RouterView`, 지연 로딩, Catch-all Route 적용
- 날씨 대시보드, 서비스 소개, 외출 준비, 나들이 추천, 여행 스타일, 설정 화면 구성
- 도시 선택 후 실시간 날씨 화면으로 이동하도록 구현
- 여행지 추천용 추가 View와 한국 지도 도시 선택 기능 구현

![종합실습 4 - Router 상세 화면](./screenshots%20day3/weather-router-detail.png)

## 종합실습 5 : Pinia Store 적용

- Counter Store를 만들어 state, getter, action 동작 확인
- Config Store로 섭씨(℃)와 화씨(℉) 단위를 전환
- 지도 도시 가이드, 여행 추천, 실시간 날씨, 5일 예보의 온도를 선택 단위에 맞춰 변환

![종합실습 5 - Counter Store](./screenshots%20day3/pinia-counter.png)

![종합실습 5 - 온도 단위 전환](./screenshots%20day3/pinia-unit-toggle.png)

## 종합실습 6 : Weather Axios

- Axios로 OpenWeatherMap Current Weather API와 5일 예보 API를 호출
- Open-Meteo Air Quality API로 초미세먼지, 미세먼지, 공기질 지수 확인
- 실제 기온, 비 여부, 대기질을 기준으로 여행 적합도 점수 계산
- 5일 예보에서 점수가 가장 높은 날을 이번 주 추천 여행일로 표시
- API 키는 `.env` 환경 변수로 분리하여 관리

## 종합실습 7 : UI Library 및 서비스 개선

- Element Plus의 버튼, 태그, 카드 등 UI 컴포넌트 적용
- Weatherly 로고, 도시 검색창, 서비스 메뉴, 기능 바로가기 영역을 포함한 메인 화면 구성
- 초록색 자연 여행 테마와 반응형 레이아웃 적용
- 한국 지도에서 도시를 선택하면 관광지와 실시간 날씨를 확인하도록 구현
- 기존 도시와 함께 춘천, 강릉, 속초, 포항, 경주, 여수, 전주, 안동, 청주, 목포를 추가
- 도시별 아이콘과 관광지 정보를 직접 구성

## 배포 주소

- 배포 주소: https://weatherly-skala-vue.vercel.app

## 실행 화면

![Weatherly 메인 화면](./screenshots%20day4/weatherly-main.png)

![실시간 날씨·대기질·5일 예보 화면](./screenshots%20day4/weatherly-live-weather.png)

![여행 스타일 도시 검색 화면](./screenshots%20day4/weatherly-travel-style.png)

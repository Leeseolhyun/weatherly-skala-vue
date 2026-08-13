<script setup>
import WeatherMockup from '@/components/exercise/WeatherMockup.vue'
import WeatherComposition from '@/components/exercise/WeatherComposition.vue'
</script>

<template>
  <section>
    <div class="page-heading">
      <p class="eyebrow">TRAVEL STYLE</p>
      <h2>나에게 맞는 여행 조건</h2>
      <p>더위를 느끼는 기준과 날씨 조건에 따라 여행하기 좋은 도시를 찾아보세요.</p>
    </div>

    <section class="assignment-section">
      <h3>여행 전 날씨 확인</h3>
      <WeatherMockup />
    </section>

    <section class="assignment-section">
      <h3>나의 여행 스타일</h3>
      <WeatherComposition />
    </section>
  </section>
</template>

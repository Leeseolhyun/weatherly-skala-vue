<script setup>
import { useCounterStore } from '@/stores/counter.js'

const counterStore = useCounterStore()
</script>

<template>
  <div class="practice-section">
    <h2>관심 도시 현황</h2>

    <p>
      선택한 관심 도시: <strong>{{ counterStore.count }}</strong>
    </p>
    <p>
      최대 추가 가능 도시: <span>{{ counterStore.doubleCount }}</span>
    </p>

    <button @click="counterStore.increment">관심 도시 추가</button>
  </div>
</template>

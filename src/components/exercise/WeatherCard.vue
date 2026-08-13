<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'

const props = defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore()

const getSubjectParticle = (cityName) => {
  const lastCode = cityName.charCodeAt(cityName.length - 1)
  const hasFinalConsonant = (lastCode - 0xac00) % 28 !== 0

  return hasFinalConsonant ? '이' : '가'
}

const displayTemp = computed(() => {
  const rawTemp = props.cityItem.temp

  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }

  return rawTemp
})
</script>

<template>
  <div class="weather-card" @click="emit('select-card', `${cityItem.name}${getSubjectParticle(cityItem.name)} 선택되었습니다.`)">
    <h4>{{ cityItem.name }} ({{ cityItem.status }})</h4>
    <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>

    <el-tag v-if="cityItem.temp >= 25" type="danger" effect="light">더움</el-tag>
    <el-tag v-else type="primary" effect="light">선선함</el-tag>

    <el-button class="btn-detail" size="small" plain @click.stop="emit('click-detail', cityItem.name, cityItem.status)">상세 보기</el-button>
  </div>
</template>

<style scoped>
.weather-card {
  background: #fff;
  border: 1px solid #dee2e6;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
}
.btn-detail {
  position: absolute;
  right: 12px;
  top: 15px;
  padding: 6px 10px;
  cursor: pointer;
}
</style>

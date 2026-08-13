<script setup>
defineEmits(['update-query'])

defineProps({
  currentQuery: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="search-inner">
    <h3>도시 검색</h3>
    <el-input
      :model-value="currentQuery"
      placeholder="도시 이름을 입력하세요"
      clearable
      @update:model-value="$emit('update-query', $event)"
    />
    <p v-if="currentQuery">검색 결과: <strong>{{ currentQuery }}</strong></p>
    <p v-else>원하는 도시를 검색해 보세요.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const userForm = ref({
  email: '',
  agree: false,
})

const handleRegister = () => {
  if (!userForm.value.email.includes('@')) {
    ElMessage.error('올바른 이메일 주소를 입력하세요.')
    return
  }
  if (!userForm.value.agree) {
    ElMessage.warning('개인정보 수집 및 이용에 동의해 주세요.')
    return
  }
  ElMessage.success('알림 수신 설정이 저장되었습니다.')
}

const displayCount = ref(5)
const serviceRate = ref(4)

const downloadProgress = ref(0)
const isDownloading = ref(false)

const confirmDelete = () => {
  ElMessageBox.confirm('저장된 개인 설정을 삭제하시겠습니까?', '설정 삭제', {
    confirmButtonText: '네, 삭제합니다',
    cancelButtonText: '취소',
    type: 'danger',
  })
    .then(() => {
      ElMessage.success('저장된 설정을 삭제했습니다.')
    })
    .catch(() => {
      ElMessage.info('삭제를 취소했습니다.')
    })
}

const startDownload = () => {
  if (isDownloading.value) return
  downloadProgress.value = 0

  const interval = setInterval(() => {
    downloadProgress.value += 20
    if (downloadProgress.value >= 100) {
      clearInterval(interval)
      isDownloading.value = false
      ElMessage.success('데이터 동기화가 완료되었습니다.')
    }
  }, 400)
}
</script>

<template>
  <div class="practice-section">
    <h2>계정 및 데이터 관리</h2>
    <p class="subtitle">알림 수신과 데이터 표시 설정을 관리할 수 있습니다.</p>

    <el-card class="box-card">
      <template #header><strong>알림 수신 설정</strong></template>
      <div class="card-body">
        <div class="input-group">
          <span>이메일 주소</span>
          <el-input v-model="userForm.email" placeholder="example@email.com" clearable style="width: 300px" />
        </div>

        <div class="input-group">
          <el-switch v-model="userForm.agree" active-text="개인정보 수집 및 이용에 동의합니다." />
        </div>

        <el-button type="primary" @click="handleRegister">저장하기</el-button>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header><strong>표시 및 만족도 설정</strong></template>
      <div class="card-body">
        <div class="input-group">
          <span>도시 목록 표시 수</span>
          <el-input-number v-model="displayCount" :min="1" :max="10" />
          <span class="hint-text">최대 10개까지 설정할 수 있습니다.</span>
        </div>

        <div class="input-group">
          <span>서비스 만족도</span>
          <el-rate v-model="serviceRate" show-score score-template="{value} 점" />
        </div>

        <div class="result-preview"><strong>현재 설정:</strong> 도시 {{ displayCount }}개 표시 / 만족도 {{ serviceRate }}점</div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header><strong>데이터 관리</strong></template>
      <div class="card-body">
        <div class="btn-zone">
          <el-button type="danger" plain @click="confirmDelete">저장 설정 삭제</el-button>

          <el-button type="primary" :loading="isDownloading" @click="startDownload">
            {{ isDownloading ? '동기화 중...' : '데이터 동기화' }}
          </el-button>
        </div>

        <div class="progress-zone">
          <el-progress :percentage="downloadProgress" :status="downloadProgress === 100 ? 'success' : ''" />
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.subtitle {
  color: #909399;
  margin-bottom: 30px;
}
.box-card {
  margin-bottom: 25px;
  border-radius: 8px;
}
.card-body {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.input-group {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 14px;
}
.hint-text {
  color: #909399;
  font-size: 12px;
}
.result-preview {
  background: #f4f4f5;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
}
.btn-zone {
  display: flex;
  gap: 10px;
}
.progress-zone {
  margin-top: 10px;
}
</style>

<template>
  <div class="tips-container">
    <h3>🎒 날씨별 준비물 안내</h3>
    <hr />

    <div class="tip-card">
      <h4>☀️ 맑고 더운 날</h4>
      <p>선크림, 물, 선글라스를 챙기면 좋아요.</p>
    </div>

    <div class="tip-card">
      <h4>🌧️ 비 오는 날</h4>
      <p>우산과 방수 신발을 준비하세요.</p>
    </div>

    <div class="tip-card">
      <h4>☁️ 흐린 날</h4>
      <p>가벼운 겉옷을 챙기면 편안합니다.</p>
    </div>

    <RouterLink to="/" class="home-link">← 여행 추천으로 돌아가기</RouterLink>
  </div>
</template>

<style scoped>
.tips-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.tip-card {
  margin: 12px 0;
  padding: 12px;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  background: #f8f9fa;
}

.tip-card h4,
.tip-card p {
  margin: 4px 0;
}

.home-link {
  display: inline-block;
  margin-top: 12px;
  color: #3498db;
  font-weight: bold;
  text-decoration: none;
}
</style>

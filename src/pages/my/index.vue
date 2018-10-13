<template>
  <div>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
// import card from '@/components/card'
// import { $wuxGallery } from '@/utils/wux'

export default {
  components: {
  },

  data() {
    return {
      logs: [],
      show: true,
      urls: [
        'https://unsplash.it/200/200',
        'https://unsplash.it/300/300',
        'https://unsplash.it/400/400',
        'https://unsplash.it/600/600',
        'https://unsplash.it/800/800',
        'https://unsplash.it/900/900',
        'https://unsplash.it/1000/1000',
        'https://unsplash.it/1200/1200',
      ]
    }
  },

  created() {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
  },
  methods: {
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>

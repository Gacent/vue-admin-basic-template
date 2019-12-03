<template>
  <div class="dashboard-container">
    <div v-if="parseTime" class="dashboard-text">parseTime：{{ parseTime }}</div>
    <div v-if="formatTime" class="dashboard-text">formatTime：{{ formatTime }}</div>
    <div v-if="param2Obj" class="dashboard-text">param2Obj：{{ param2Obj }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseTime, formatTime, param2Obj } from '@/utils'

export default {
  name: 'Home',
  data() {
    return {
      parseTime: null,
      formatTime: null,
      param2Obj: null
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.parseTime = parseTime(new Date())
    this.formatTime = formatTime(new Date('2019-11-11 20:00:00'))
    this.param2Obj = param2Obj('https://www.baidu.com?s=456')
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

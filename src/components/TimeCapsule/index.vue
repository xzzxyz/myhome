<template>
  <div class="time-capsule">
    <div class="title">
      <hourglass-full theme="two-tone" size="24" :fill="['#efefef', '#00000020']" />
      <span>时光胶囊</span>
    </div>
    <template v-for="i in timeDatas">
      <span class="text">{{ i.s1 }}已经度过了&nbsp;{{ timeData[i.type].elapsed.toFixed(2) }}&nbsp;{{ i.s2 }}</span>
      <el-progress :text-inside="true" :stroke-width="20" :percentage="parseFloat(timeData[i.type].pass.toFixed(2))" />
    </template>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { HourglassFull } from "@icon-park/vue-next";
import { getTimeCapsule } from "@/utils/getTime.js";
const timeDatas = [
  {
    type: "day",
    s1: "今日",
    s2: "小时",
  },
  {
    type: "week",
    s1: "本周",
    s2: "天",
  },
  {
    type: "month",
    s1: "本月",
    s2: "天",
  },
  {
    type: "year",
    s1: "今年",
    s2: "个月",
  },
];
// 进度条数据
let timeData = ref(getTimeCapsule());
let timeInterval = null;

onMounted(() => {
  timeInterval = setInterval(() => {
    timeData.value = getTimeCapsule();
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timeInterval);
});
</script>

<style lang="scss" scoped>
.time-capsule {
  width: 100%;

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.2rem 0 1.5rem;
    font-size: 1.1rem;

    .i-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 6px;
    }
  }

  .text {
    display: block;
    margin: 1rem 0rem 0.5rem 0rem;
    font-size: 0.95rem;
  }
}
</style>
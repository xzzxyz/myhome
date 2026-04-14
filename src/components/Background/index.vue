<template>
  <div class="cover">
    <img class="bg" :src="bgUrl" alt="cover" />
    <div :class="store.backgroundShow ? 'gray sm' : 'gray'" />
    <transition name="el-fade-in-linear">
      <div class="down" @click="downloadBg" v-show="store.backgroundShow">下载壁纸</div>
      <!-- <a class="down" :href="bgUrl" target="_blank" v-show="store.backgroundShow && store.coverType != '3'">下载壁纸</a> -->
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, h } from "vue";
import { SuccessPicture } from "@icon-park/vue-next";
import { mainStore } from "@/store";
const store = mainStore();

// 由 Vite 在构建时注入本地背景图库清单，后续只需要按 background*.* 命名追加文件即可。
const localBackgrounds = __LOCAL_BACKGROUNDS__

let bgUrl = ref(null); // 壁纸链接
let objectUrl = null;
const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)]
const requestWithTimeout = (url, timeout = 1500) => {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  return fetch(url, { signal: controller.signal })
    .finally(() => clearTimeout(timer))
}

const pickRandomApis = (apis, count = 1) => {
  const shuffled = [...apis].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

const changeBg = (type) => {
  const clearObjectUrl = () => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl)
      objectUrl = null
    }
  }
  const defaultSet = () => {
    clearObjectUrl()
    bgUrl.value = getRandomItem(localBackgrounds)
  }

  // 在线图源按主池 + 备用池抽样；每次只并发尝试 2 个，避免过多请求拖慢首屏。
  const primaryApis = [
    `https://loremflickr.com/1920/1080/landscape?random=${Math.floor(Math.random() * 10000)}`,
    `https://picsum.photos/1920/1080?random=${Math.floor(Math.random() * 1000)}`,
  ]
  const backupApis = [
    'https://tu.ltyuanfang.cn/api/fengjing.php',
    'https://api.dujin.org/bing/1920.php',
  ]
  const apis = [
    ...pickRandomApis(primaryApis),
    ...pickRandomApis(backupApis),
  ]

  // 先给在线图源一个短暂窗口（1500ms）争取高质量随机图；
  // 只要任一成功就直接使用，否则立即回退本地随机图，避免长时间空白。
  Promise.any(
    apis.map((url) =>
      requestWithTimeout(url, 1500)
        .then((response) => {
          if (!response.ok) throw new Error('API请求失败')
          return response.blob()
        })
    )
  )
    .then((blob) => {
      clearObjectUrl()
      objectUrl = URL.createObjectURL(blob)
      bgUrl.value = objectUrl
    })
    .catch(() => {
      console.log('背景图片 API 全部失败或超时，使用本地壁纸')
      defaultSet()
    })
};

const downloadBg = () => {
  fetch(bgUrl.value)
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'background.jpg';
      a.click();
      URL.revokeObjectURL(url);
    })
}

onMounted(() => {
  // 加载壁纸
  // changeBg(store.coverType);
  changeBg();
});

watch(bgUrl, (value) => {
  if (value) {
    store.bged = true
    if (store.load) {
      store.setLoadingBoxed();
    }
  }
})

// 监听壁纸种类变化
watch(
  () => store.coverType,
  (value) => {
    changeBg(value);
    ElMessage({
      message: "壁纸设置成功",
      icon: h(SuccessPicture, {
        theme: "filled",
        fill: "#efefef",
      }),
    });
  }
);
</script>

<style lang="scss" scoped>
.cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.25s;
  z-index: -1;

  .bg {
    transform: scale(1);
    filter: blur(0);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 1.5s ease 0s;
    backface-visibility: hidden;
  }

  .gray {
    opacity: 1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(rgba(0, 0, 0, 0) 0,
        rgba(0, 0, 0, 0.5) 100%),
      radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);

    transition: 1.5s;

    &.sm {
      opacity: 0;
      transition: 1.5s;
    }
  }

  .down {
    font-size: 16px;
    color: white;
    position: absolute;
    bottom: 70px;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: block;
    padding: 20px 26px;
    border-radius: 8px;
    background-color: #00000030;
    width: 120px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      transform: scale(1.05);
      background-color: #00000060;
    }

    &:active {
      transform: scale(1);
    }
  }
}

// 加载时动画
.loading {
  .cover {
    .bg {
      transition: 1.5s;
      transform: scale(1.1);
      filter: blur(10px);
    }

    .gray {
      transition: 1.5s;
      opacity: 0;
    }
  }
}
</style>

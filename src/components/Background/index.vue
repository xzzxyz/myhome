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

let bgUrl = ref(null); // 壁纸链接
const getRandomNumber = n => Math.floor(Math.random() * n) + 1;
const changeBg = (type) => {
  const n = getRandomNumber(9)
  const defaultSet = () => bgUrl.value = `/images/background${n}.webp`
  if (n > 5) {
    defaultSet()
  } else {
    // 尝试多个风景图片API，按优先级顺序
    const apis = [
      'https://api.fuchenboke.cn/api/fengjing.php', // 浮沉API - 高清风景壁纸
      'https://tu.ltyuanfang.cn/api/fengjing.php',   // 远方随机风景壁纸
      'https://api.dujin.org/pic/fengjing',          // 缙哥哥风景API
      'https://picsum.photos/1920/1080',             // Picsum随机图片
    ]
    
    // 递归尝试API列表
    const tryApi = (index) => {
      if (index >= apis.length) {
        defaultSet()
        return
      }
      
      fetch(apis[index])
        .then(response => {
          if (!response.ok) throw new Error('API请求失败')
          return response.blob()
        })
        .then(blob => {
          const url = URL.createObjectURL(blob)
          bgUrl.value = url
        })
        .catch(() => {
          console.log(`API ${apis[index]} 失败，尝试下一个...`)
          tryApi(index + 1)
        })
    }
    
    tryApi(0)
  }
}

  // if (type == 0) {
  //   bgUrl.value = `/images/background${getRandomNumber(16)}.webp`;
  // } else if (type == 1) {
  //   bgUrl.value = "https://api.dujin.org/bing/1920.php";
  // } else if (type == 2) {
  //   bgUrl.value = "https://api.ixiaowai.cn/gqapi/gqapi.php";
  // } else if (type == 3) {
  //   bgUrl.value = "https://api.ixiaowai.cn/api/api.php";
  // }
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
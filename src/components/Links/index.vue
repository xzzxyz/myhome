<template>
  <div class="links">
    <div class="line">
      <Icon size="20">
        <Link />
      </Icon>
      <span class="title">网站列表</span>
    </div>
    <el-row class="link-all" :gutter="20">
      <el-col :span="8" v-for="(item, index) in linksData" :key="item" @click="jumpLink(item.link)">
        <div class="item cards" :style="index > 2 ? 'margin-top: 20px' : null">
          <Icon size="26">
            <component :is="item.icon" />
          </Icon>
          <span class="name">{{ item.name }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@vicons/utils";
import {
  Link,
  Blog,
  CompactDisc,
  Cloud,
  Compass,
  Book,
  Flask,
  Robot,
  Bookmark,
  Home
} from "@vicons/fa";

// 网站链接数据
let linksData = [
  {
    icon: Cloud,
    name: "网盘",
    link: "https://xzzxyz.top",
  },
  {
    icon: Robot,
    name: "ChatGPT",
    link: "http://chat.xzzxyz.top",
  },
  {
    icon: Bookmark,
    name: "书签",
    link: "https://pintree.xzzxyz.top",
  },
  {
    icon: Compass,
    name: "起始页",
    link: "https://yuindex.xzzxyz.top",
  },
  {
    icon: Home,
    name: "首页",
    link: "https://home.xzzxyz.top",
  },
  {
    icon: Flask,
    name: "实验室",
    link: "",
  },
];

// 链接跳转
const jumpLink = (url) => {
  if (!url) return ElMessage(`网站建设中~`);
  window.open(url, "_blank");
};
</script>

<style lang="scss" scoped>
.links {
  .line {
    margin: 2rem 0.25rem 1rem;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    animation: fade;
    -webkit-animation: fade 0.5s;

    .title {
      margin-left: 8px;
      font-size: 1.15rem;
      text-shadow: 0 0 5px #00000050;
    }
  }

  .link-all {
    .item {
      height: 100px;
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: center;
      animation: fade;
      -webkit-animation: fade 0.5s;

      &:hover {
        transform: scale(1.02);
        background: rgb(0 0 0 / 40%);
        transition: 0.3s;
      }

      .name {
        font-size: 1.1rem;
        margin-left: 8px;
      }

      @media (min-width: 720px) and (max-width: 820px) {
        .name {
          display: none;
        }
      }

      @media (max-width: 720px) {
        height: 80px;
      }

      @media (max-width: 460px) {
        flex-direction: column;

        .name {
          font-size: 1rem;
          margin-left: 0;
          margin-top: 8px;
        }
      }
    }
  }
}
</style>
<template>
  <div class="links">
    <div class="line">
      <Icon size="20">
        <Link />
      </Icon>
      <span class="title">网站列表</span>
    </div>
    <el-row class="link-all" :gutter="20">
      <el-col :span="8" v-for="(item, index) in linksData" :key="item" @click="handleClick(item)">
        <div class="item cards" :class="{ 'not-maintained': item.notMaintained }" :style="index > 2 ? 'margin-top: 20px' : null">
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
    name: "网盘/NAS",
    link: "http://101.5.88.161:5244/",
    notMaintained: false,
  },
  {
    icon: Home,
    name: "首页",
    link: "https://home.xzzxyz.top",
    notMaintained: false,
  },
  {
    icon: Bookmark,
    name: "书签",
    link: "https://bookmark.xzzxyz.top/",
    notMaintained: false,
  },
  {
    icon: Robot,
    name: "ChatGPT",
    link: "http://chat.xzzxyz.top",
    notMaintained: true,
  },
  {
    icon: Bookmark,
    name: "书签(旧)",
    link: "https://pintree.xzzxyz.top",
    notMaintained: true,
  },
  {
    icon: Compass,
    name: "起始页",
    link: "https://yuindex.xzzxyz.top",
    notMaintained: true,
  },
  // {
  //   icon: Flask,
  //   name: "实验室",
  //   link: "",
  // },
];

// 处理点击事件
const handleClick = (item) => {
  if (item.notMaintained) {
    // 使用自动导入的 ElMessageBox
    ElMessageBox.confirm(
      `该链接 (${item.name}) 已不再维护，是否继续访问？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(() => {
        jumpLink(item.link);
      })
      .catch(() => {
        // 用户取消，不执行任何操作
      });
  } else {
    jumpLink(item.link);
  }
};

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

        &.not-maintained {
          opacity: 0.5;
          
          &:hover {
            opacity: 0.7;
          }
          
          .name {
            text-decoration: line-through;
            text-decoration-thickness: 3px;
            text-decoration-color: currentColor;
          }
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
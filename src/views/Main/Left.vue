<template>
  <div :class="store.mobileOpenState !== 0 ? 'left hidden' : 'left'">
    <Message />
    <SocialLinks />
  </div>
</template>

<script setup>
import { mainStore } from "@/store";
import Message from "@/components/Message/index.vue";
import SocialLinks from "@/components/SocialLinks/index.vue";
const store = mainStore();
</script>

<style lang="scss" scoped>
.left {
  flex: 1 0 0%;
  margin-right: 10px;
  transform: translateY(20px);

  &.hidden {
    display: none;
  }

  @media (max-width: 720px) {
    margin-right: 0;
  }

  @media (min-width: 720px) {
    display: unset !important;
  }
}
</style>
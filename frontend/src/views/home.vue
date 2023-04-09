<template>
  <n-card class="h-full mb-6 flex justify-center items-center">
    {{ $t('tips.jumpingPage') }}
  </n-card>
</template>

<script setup lang="ts">
// 这里是初始跳转的页面，从这里根据用户是否登陆进行区分然后跳转，通过router控制，入口函数是这个home.vue
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store';

const router = useRouter();
const userStore = useUserStore();

let target = "";
if (!userStore.user) {
  target = "login";
} else {
  target = "conversation";
}

router.push({
  name: target,
}).then(() => {
  window.location.reload();
})
</script>
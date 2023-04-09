<template>
  <!-- register Form -->
  <div class="flex justify-center items-center mt-20">
    <n-form ref="formRef" :model="formValue" :rules="registerRules" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
      <n-form-item :label="$t('commons.username')" path="username">
        <n-input v-model:value="formValue.username" :placeholder="$t('tips.pleaseEnterUsername')" :input-props="{
          autoComplete: 'username'
        }" />
      </n-form-item>
      <n-form-item :label="$t('commons.password')" path="password">
        <n-input type="password" show-password-on="click" v-model:value="formValue.password" :placeholder="$t('tips.pleaseEnterPassword')" :input-props="{
          autoComplete: 'current-password'
        }" />
      </n-form-item>
      <n-form-item :label="$t('commons.retypePassword')" path="retypePassword">
        <n-input type="password" show-password-on="click" v-model:value="retypePass" :placeholder="$t('tips.pleaseEnterPassword')" :input-props="{
          autoComplete: 'current-password'
        }" @keyup.enter="register" />
      </n-form-item>
      <n-form-item :label="$t('commons.email')" path="email">
        <n-auto-complete v-model:value="formValue.email" :placeholder="$t('tips.pleaseEnterEmail')" :options="autoCompleteEmail" />
      </n-form-item>
      <n-form-item :label="$t('commons.nickname')" path="nickname">
        <n-input v-model:value="formValue.nickname" :placeholder="$t('tips.pleaseEnterNickname')" :input-props="{
          autoComplete: 'nickname'
        }" />
      </n-form-item>
      <n-form-item wrapper-col="{ span: 16, offset: 8 }">
        <n-button type="primary" @click="register" :enabled="loading">{{ $t("commons.registers") }}</n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useUserStore } from '@/store';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { loginApi } from '@/api/user';
import { Message } from '@/utils/tips';
import { FormValidationError } from 'naive-ui/es/form';
import { FormInst } from 'naive-ui'
import { UserCreate } from "@/types/schema";

const router = useRouter();
const { t } = useI18n();
const userStore = useUserStore();
const formRef = ref<FormInst>();

const formValue = reactive({
  username: '',
  password: '',
  retypePassword: '',
  email: '',
  nickname: ''
});
const retypePass = ref('')
const loading = ref(false);
// this is the which will 
const registerRules = {
  username: { required: true, message: t("tips.pleaseEnterUsername"), trigger: 'blur' },
  password: { required: true, message: t("tips.pleaseEnterPassword"), trigger: 'blur' },
  retypePassword: { required: true, message: t("tips.pleaseEnterPassword"), trigger: 'blur' },
  email: {requred: true, message: t("commons.email"), trigger: 'blur'},
  nickname: {requred: false, mesasge: t("commons.nickname"), trigger: 'blur'}
}

// 这里是对应的触发事件 methods
const register = async () => {   // 这个写法是js的function写法
  if (loading.value) return;     
  formRef.value?.validate(async (errors?: Array<FormValidationError>) => {
    if (errors == undefined) {
      loading.value = true;
      try {
        // prepare the UserCreate message
        await userStore.register(formValue as UserCreate);
        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        await userStore.fetchUserInfo();
        Message.success(t('tips.loginSuccess'));
        await router.push({    // 登陆成功跳转其他页面
          name: userStore.user?.is_superuser ? 'admin' : 'login'
        });
        // TODO: 记住密码
      } finally {
        loading.value = false;
      }
    }
  });
}

const autoCompleteEmail = computed(
  () => {
    return ['@gmail.com', '@163.com', '@qq.com', '@126.com'].map((suffix) => {
          const prefix = formValue.email.split('@')[0]
          return {
            label: prefix + suffix,
            value: prefix + suffix
          }
        })
  }
)

if (userStore.user) {
  router.push({ name: 'login' });
}
</script>
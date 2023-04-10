<template>
  <!-- register Form -->
  <div class="flex justify-center items-center mt-20">
    <n-form ref="formRef" :model="formValue" :rules="registerRules" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
      <n-form-item :label="$t('commons.username')" path="username">
        <n-input v-model:value="formValue.username" :placeholder="$t('tips.pleaseEnterUsername')" :input-props="{
          autoComplete: 'username'
        }" @keydown.enter.prevent/>
      </n-form-item>
      <n-form-item :label="$t('commons.nickname')" path="nickname">
        <n-input v-model:value="formValue.nickname" :placeholder="$t('tips.pleaseEnterNickname')" :input-props="{
          autoComplete: 'nickname'
        }" @keydown.enter.prevent/>
      </n-form-item>
      <n-form-item :label="$t('commons.email')" path="email">
        <n-auto-complete v-model:value="formValue.email" :placeholder="$t('tips.pleaseEnterEmail')" :options="autoCompleteEmail" />
      </n-form-item>
      <n-form-item :label="$t('commons.password')" path="password">
        <n-input type="password" show-password-on="click" v-model:value="formValue.password" :placeholder="$t('tips.pleaseEnterPassword')" :input-props="{
          autoComplete: 'current-password'
        }" @input="handlePasswordInput" @keydown.enter.prevent/>
      </n-form-item>
      <n-form-item :label="$t('commons.retypePassword')" path="retypePassword" ref="rPasswordFormItemRef">
        <n-input type="password" show-password-on="click" v-model:value="retypePass" :placeholder="$t('tips.pleaseEnterPassword')" :input-props="{
          autoComplete: 'current-password' 
        }" @keyup.enter="register"/>
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
import { FormInst, FormItemRule, FormItemInst } from 'naive-ui'
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
let userCreate: UserCreate| null;
const retypePass = ref('')
const loading = ref(false);
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
// this is the which will 
const registerRules = {
  username: 
    [
      { 
        required: true, message: t("tips.UsernameIllegal"), trigger: 'blur',  
      },
      {
        validator: validateUserName, message: t("tips.UsernameIllegal"), trigger: ['blur', 'input']
      }
    ],
  password: 
    { required: true, message: t("tips.pleaseEnterPassword"), trigger: 'blur'},
  retypePassword: 
    [
      { required: true, message: t("tips.PasswordNotSame"), trigger: 'blur'},
      {
        validator: validatePasswordStartWith, message: t("tips.PasswordNotSame"), trigger: ['input']
      },
      {
        validator: validatePasswordSame, message: t("tips.PasswordNotSame"), trigger: ['blur', 'password-input']
      }
    ],            
  email: 
    {requred: true, message: t("commons.email"), trigger: 'blur'},
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
        userCreate = {email:formValue.email, password: formValue.password, username:formValue.username,
                      nickname:formValue.nickname}
        // get overall method on userstore
        await userStore.register(userCreate as UserCreate);
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

function handlePasswordInput() {
          if (formValue.retypePassword) {
            rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
          }
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

// password Setting
function validatePasswordStartWith (
  rule: FormItemRule,
  value: string
): boolean {
  return (
    !!formValue.password &&
    formValue.password.startsWith(value) &&
    formValue.password.length >= value.length
  )
}

// retype password should same as password
function validatePasswordSame (rule: FormItemRule, value: string): boolean {
  return value === formValue.password
}

//validate user name
function validateUserName (rule: FormItemRule, value: string): boolean {
  return (/^[A-Za-z][A-Za-z0-9_]{4,30}$/.test(formValue.username))
    

if (userStore.user) {
  router.push({ name: 'login' });
}
</script>
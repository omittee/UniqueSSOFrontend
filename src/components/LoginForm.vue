<script setup lang="ts">
import { Ref, ref, reactive, computed } from "vue";
import type { Rule, FormInstance } from "ant-design-vue/es/form";
type currentLoginWayType = Ref<LoginWay[]>;
enum LoginWay {
  phoneCode = "phoneCode", //验证码登录
  phonePassword = "phonePassword", //手机号密码登录
  emailPassword = "emailPassword", //邮箱密码登录
}
const currentLoginWay: currentLoginWayType = ref([LoginWay.phoneCode]);
const formState = reactive({
  phoneNum: "",
  email: "",
  verificationCode: "", //验证码登录
  password: "", //手机号/邮箱密码登录
});

//是否为验证码登录
const isCodeLogin = computed(
  () => currentLoginWay.value[0] === LoginWay.phoneCode
);
//是否使用邮箱
const isEmailLogin = computed(
  () => currentLoginWay.value[0] === LoginWay.emailPassword
);

//表单填写内容
const account = computed({
  get() {
    return isEmailLogin ? formState.email : formState.phoneNum;
  },
  set(newValue: string) {
    isEmailLogin
      ? (formState.email = newValue)
      : (formState.phoneNum = newValue);
  },
});
const accountPasswordOrCode = computed({
  get() {
    return isCodeLogin ? formState.verificationCode : formState.password;
  },
  set(newValue: string) {
    isCodeLogin
      ? (formState.verificationCode = newValue)
      : (formState.password = newValue);
  },
});

//重置表单
const formRef = ref<FormInstance>();
const resetForm = () => {
  formRef?.value?.resetFields();
};


//表单验证规则
const rules: Record<string, Rule[]> = {
  phoneNum: [
    {
      required: true,
      validator: async (_rule: Rule, value: string) => {
        if (value === "") return Promise.reject("请输入手机号码");
        else if (/\D/.test(value)) return Promise.reject("手机号码格式不正确");
        else return Promise.resolve();
      },
      trigger: "blur",
    },
  ],
  email: [
    {
      required: true,
      validator: async (_rule: Rule, value: string) => {
        if (value === "") return Promise.reject("请输入邮箱");
        else if (
          !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
        )
          return Promise.reject("邮箱格式不正确");
        else return Promise.resolve();
      },
      trigger: "blur",
    },
  ],
  passwordOrCode: [
    {
      required: true,
      validator: async (_rule: Rule, value: string) => {
        return value
          ? Promise.resolve()
          : Promise.reject("请输入" + (isCodeLogin.value ? "验证码" : "密码"));
      },
      trigger: "blur",
    },
  ],
};
</script>

<template>
  <div class="login-model">
    <a-menu
      v-model:selectedKeys="currentLoginWay"
      mode="horizontal"
      class="switch-login-way"
      @select="resetForm"
    >
      <a-menu-item :key="LoginWay.phoneCode"> 手机号码登录 </a-menu-item>
      <a-menu-item :key="LoginWay.phonePassword"> 密码登录</a-menu-item>
      <a-menu-item :key="LoginWay.emailPassword"> 邮箱登录</a-menu-item>
    </a-menu>

    <a-form
      layout="vertical"
      class="login-form"
      :rules="rules"
      :model="formState"
      ref="formRef"
    >
      <!-- 手机号码登录 -->
      <div v-show="isCodeLogin">
        <a-form-item name="phoneNum">
          <a-input
            placeholder="请输入手机号码"
            class="login-phone-num-ipt"
            v-model:value="account"
          >
          </a-input>
        </a-form-item>
        <a-form-item name="passwordOrCode">
          <div class="verification-code-container">
            <a-input
              placeholder="请输入验证码"
              class="login-code-ipt"
              v-model:value="accountPasswordOrCode"
            >
            </a-input>
            <a-button type="primary" html-type="submit" class="login-code-btn">
              获取验证码
            </a-button>
          </div>
        </a-form-item>
      </div>
      <!-- 手机号/邮箱密码登录 -->
      <div v-show="!isCodeLogin">
        <a-form-item :name="isEmailLogin ? 'email' : 'phoneNum'">
          <a-input
            :placeholder="'请输入' + (isEmailLogin ? '邮箱' : '手机号码')"
            class="login-phone-email-ipt"
            v-model:value="account"
          >
          </a-input>
        </a-form-item>
        <a-form-item name="passwordOrCode">
          <a-input
            type="password"
            placeholder="请输入密码"
            class="login-password-ipt"
            v-model:value="accountPasswordOrCode"
          >
          </a-input>
        </a-form-item>
      </div>

      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-btn" >
          登录
        </a-button>
        <span class="remind-info">未注册的手机号码验证后将自动创建帐号</span>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="less">
.login-model {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  width: 40rem;
  height: 27rem;
  background-color: #fff;
  border-radius: 2rem;
  .switch-login-way {
    display: flex;
    justify-content: flex-start;
    width: 29rem;
    font-size: 1.5rem;
  }
  .login-form {
    width: 27rem;
    .verification-code-container {
      height: 2.25rem;
      display: flex;
      .login-code-ipt {
        border-top-left-radius: 3rem;
        border-bottom-left-radius: 3rem;
      }
      .login-code-btn {
        border-top-right-radius: 3rem;
        border-bottom-right-radius: 3rem;
        height: 100%;
      }
    }
    .login-phone-num-ipt,
    .login-phone-email-ipt,
    .login-password-ipt,
    .login-btn {
      border-radius: 3rem;
      height: 2.25rem;
    }

    .login-phone-email-ipt,
    .login-phone-num-ipt {
      margin-bottom: 0.25rem;
    }
    .login-btn {
      margin-top: 2rem;
      width: 100%;
    }
    .remind-info {
      display: inline-block;
      width: 100%;
      font-size: 0.7rem;
      font-weight: bold;
      color: grey;
      text-align: start;
    }
  }
}
</style>

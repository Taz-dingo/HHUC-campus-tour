<!-- sign_up -->
<template>
    <div
        v-if="loginModel === '注册'"
        class="container a-container"
        id="a-container"
    >
        <form class="form" id="a-form" method="" action="">
            <h2 class="form_title title">欢迎使用</h2>
            <div class="form__icons">
                <img class="form__icon" src=" " />
                <img class="form__icon" src=" " />
                <img class="form__icon" src=" " />
            </div>
            <!-- <span class="form__span">or use email for registration</span> -->
            <input class="form__input" type="text" placeholder="用户名" />
            <input class="form__input" type="password" placeholder="密码" />
            <input class="form__input" type="text" placeholder="Token" />
            <div class="login-info">
                <a class="form__link" @click="forgetPassword">忘记密码了？</a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a class="form__link" @click="switchModel('token')"
                    >获取Token教程</a
                >
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a class="form__link" @click="switchModel('登陆')"
                    >使用账号登陆
                </a>
            </div>
            <button class="form__button button submit">
                注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册
            </button>
        </form>
    </div>
    <div
        v-else-if="loginModel === '登陆' || loginModel === 'token'"
        class="container b-container"
        id="b-container"
    >
        <form class="form" id="b-form" method="" action="">
            <h2 class="form_title title">欢迎登陆</h2>
            <div class="form__icons">
                <img class="form__icon" src=" " />
                <img class="form__icon" src=" " />
                <img class="form__icon" src=" " />
            </div>
            <!-- <span class="form__span">或者使用Token登陆</span> -->
            <input
                v-if="loginModel === '登陆'"
                class="form__input"
                type="text"
                placeholder="用户名"
            />
            <input
                v-if="loginModel === '登陆'"
                class="form__input"
                type="password"
                placeholder="密码"
            />
            <input
                v-if="loginModel === 'token'"
                class="form__input"
                type="password"
                placeholder="Token"
            />
            <div class="login-info">
                <a class="form__link" @click="forgetPassword">忘记密码了？</a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <template v-if="loginModel === '登陆'">
                    <a class="form__link" @click="switchModel('token')"
                        >使用Token登陆
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </template>
                <template v-if="loginModel === 'token'">
                    <a class="form__link" @click="switchModel('登陆')"
                        >使用账号登陆
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </template>
                <a class="form__link" @click="switchModel('注册')"
                    >注册新账户</a
                >
            </div>
            <button class="form__button button submit">
                登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;陆
            </button>
        </form>
    </div>
</template>
 
<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
 
// 忘记密码提示
const forgetPassword = () => {
  ElMessage({
    message: '请联系管理员',
    type: 'success',
  })
}
 
// 模式：登陆，token，注册
let loginModel = ref('登陆')
 
const switchModel = (model: string) => {
    loginModel.value = model
}
</script>
 
<style scoped>
 
.login-info {
    margin-top: 10px;
}
*, *::after, *::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}
 
 
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* position: absolute; */
  top: 0;
  width: 100%;
  height: 100%;
  padding: 25px;
  background-color: var(--bg-color);
  /* background-color: #ecf0f3; */
  transition: 1.25s;
}
 
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.form__icon {
  object-fit: contain;
  width: 30px;
  margin: 0 5px;
  opacity: 0.5;
  transition: 0.15s;
}
.form__icon:hover {
  opacity: 1;
  transition: 0.15s;
  cursor: pointer;
}
.form__input {
  width: 350px;
  height: 40px;
  margin: 4px 0;
  padding-left: 16px;
  font-size: 13px;
  letter-spacing: 0.15px;
  border: none;
  outline: none;
  color: var(--input-color);
  font-family: "Montserrat", sans-serif;
  background-color: #ecf0f3;
  transition: 0.25s ease;
  border-radius: 8px;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}
.form__input:focus {
  box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
}
.form__span {
  margin-top: 30px;
  margin-bottom: 12px;
}
.form__link {
  /* color: #181818; */
  font-size: 15px;
  margin-top: 25px;
  border-bottom: 1px solid #a0a5a8;
  line-height: 2;
  cursor: pointer;
  text-decoration: none;
}
 
.title {
  font-size: 34px;
  font-weight: 700;
  line-height: 3;
  color: var(--text-color);
}
 
.description {
  font-size: 14px;
  letter-spacing: 0.25px;
  text-align: center;
  line-height: 1.6;
}
 
.button {
  width: 180px;
  height: 50px;
  border-radius: 25px;
  margin-top: 30px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1.15px;
  background-color: #4B70E2;
  color: #f9f9f9;
  box-shadow: var(--box-shadow);
  border: none;
  outline: none;
}
 
/**/
.a-container {
  z-index: 100;
}
 
.b-container {
  z-index: 0;
}
 
.switch {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 400px;
  padding: 50px;
  z-index: 200;
  transition: 1.25s;
  background-color: #ecf0f3;
  overflow: hidden;
  box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #f9f9f9;
}
.switch__circle {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: #ecf0f3;
  box-shadow: inset 8px 8px 12px #d1d9e6, inset -8px -8px 12px #f9f9f9;
  bottom: -60%;
  left: -60%;
  transition: 1.25s;
}
.switch__circle--t {
  top: -30%;
  left: 60%;
  width: 300px;
  height: 300px;
}
.switch__container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 400px;
  padding: 50px 55px;
  transition: 1.25s;
}
.switch__button {
  cursor: pointer;
}
.switch__button:hover {
  box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
  transform: scale(0.985);
  transition: 0.25s;
}
.switch__button:active, .switch__button:focus {
  box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
  transform: scale(0.97);
  transition: 0.25s;
}
 
/**/
.is-txr {
  left: calc(100% - 400px );
  transition: 1.25s;
  transform-origin: left;
}
 
.is-txl {
  left: 0;
  transition: 1.25s;
  transform-origin: right;
}
 
.is-z200 {
  z-index: 200;
  transition: 1.25s;
}
 
.is-hidden {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  transition: 1.25s;
}
 
.is-gx {
  animation: is-gx 1.25s;
}
 
@keyframes is-gx {
  0%, 10%, 100% {
    width: 400px;
  }
  30%, 50% {
    width: 500px;
  }
}
</style>
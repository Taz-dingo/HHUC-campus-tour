<template>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">注册</el-button>
      </el-form-item>
    </el-form>
  </template>
   
  <script>
  import { reactive } from "vue";
  import axios from "axios";
   
  export default {
    setup() {
      const form = reactive({ username: "", password: "" });
   
      const submitForm = async () => {
        try {
          await axios.post("/api/user/register", form);
          alert("注册成功");
        } catch (error) {
          alert("注册失败");
        }
      };
   
      return { form, submitForm };
    },
  };
  </script>
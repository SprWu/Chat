<template>
  <div class="login-main-contaner">
    <div class="login-container">
      <el-input class="name" placeholder="请输入昵称" v-model="name" clearable></el-input>
      <el-input class="password" placeholder="密码123" v-model="password" show-password></el-input>
      <el-button class="connect" type="primary" round @click="connect">连接</el-button>
    </div>
  </div>
</template>

<script>
import { getConnect } from "@/api/login";
import { setTimeout } from 'timers';
export default {
  name: "Login",
  data() {
    return {
      name: "",
      password: ""
    };
  },
  methods: {
    connect() {
      if (this.name.trim().length === 0) {
        this.$message("请输出昵称！");
        return;
      }
      if (this.password !== "123") {
        this.$message("密码不正确！");
        return;
      }
      const loading = this.$loading({
        lock: true,
        text: "连接中...",
        spinner: "el-icon-loading",
        backgournd: "rgba(0, 0, 0, 0.3)"
      });
      setTimeout( () => {
          loading.close()
      },5000);
      let data = {
        name: this.name,
        password: this.password
      };
      getConnect(data).then(res => {
        if (res.data.type === 1) {
          loading.close();
          this.$message({
            message: "连接服务器成功！",
            type: "success"
          });
          //this.$store.commit('changeNickName',this.name);
          localStorage.setItem('name',this.name);
          localStorage.setItem('isLogin',true);
          this.$router.push("/index");
        } else {
          loading.close();
          this.$message.error("连接服务器失败！");
        }
      });
    }
  }
};
</script>

<style scoped>
.login-main-contaner {
  top: 0; /* 避免图片上面有空隙 */
  background-image: url("../../assets/bgi.jpg");
  background-size: cover cover; /* 将图片放大至适合屏幕的大小 */
  width: 100%;
  height: 100%;
  position: absolute;
}
.login-container {
  width: 360px;
  height: auto;
  margin: 260px auto;
}
.password {
  margin-top: 16px;
}
.connect {
  margin-top: 16px;
}
</style>


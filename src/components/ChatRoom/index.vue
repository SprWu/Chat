<template>
  <div class="chat-index">
    <div class="info-container">
      <el-row :gutter="10" type="flex" justify="space-between	">
        <el-col :span="8">您的昵称:
          <span class="self">{{ selfName }}</span>
        </el-col>
        <el-col :span="8">聊友1的昵称:
          <span class="chat-one">{{ oneName }}</span>
        </el-col>
        <el-col :span="8">聊友2的昵称:
          <span class="chat-two">{{ twoName }}</span>
        </el-col>
      </el-row>
    </div>
    <chat-box class="chatBox"></chat-box>
  </div>
</template>

<script>
import chatBox from "@/components/ChatRoom/Chat";
export default {
  name: "index",
  data() {
    return {
      selfName: "",
      oneName: "",
      twoName: ""
    };
  },
  methods: {},
  created() {
    this.selfName = localStorage.getItem("name");
  },
  components: {
    chatBox
  }
};
</script>

<style scoped>
.info-container {
  margin: 50px auto 0 auto;
  width: 800px;
  height: 30px;
  border-radius: 6px;
  border: 1px solid rgba(238, 238, 238, 0.3);
  background-color: rgba(135, 206, 250, 0.75);
}
.userinfo {
  padding-left: 10px;
  width: 100%;
  height: 30px;
  line-height: 30px;
  position: relative;
  bottom: 0px;
  text-align: left;
}
.chat-index {
  top: 0;
  background-image: url("../../assets/bgichat.jpg");
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.chatBox {
  margin: 0 auto;
}
.colors {
  display: block;
  width: 20px;
  height: 20px;
  background-color: #ffd351;
  float: left;
}
.self {
  color: #ffd351;
  font-size: 20px;
  font-weight: bold;
}
.chat-one {
  color: #F0F8FF; 
  font-size: 20px;
  font-weight: bold;
}
.chat-two {
  color: #F0F8FF; 
  font-size: 20px;
  font-weight: bold;
}
</style>


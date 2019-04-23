<template>
  <div class="main-container">
    <div class="msg-container">
      <ul>
        <li v-for="(item,i) in chatlist" :key="i">
          <!-- <div :class="[item.name === name?'right':'left']">
            <span>{{ name }}</span>
            <span class="msg">{{ item.msg }}</span>
          </div> -->
          <div class='right' v-if="item.name === name">
            <span>{{ item.msg }}</span>
          </div>
          <div class="left" v-else>
            <span>{{ item.name }}:     </span>
            <span>{{ item.msg }}</span>
          </div>
        </li>
      </ul>
    </div>
    <el-input
      @keydown.enter.native="send"
      class="input"
      placeholder="请输入内容"
      v-model="message"
      clearable
    ></el-input>
    <el-button type="primary" icon="el-icon-back" @click="send" circle></el-button>
  </div>
</template>

<script>
import { setTimeout } from "timers";
import { wsURL } from "@/fetch";
import { open, close } from "fs";
import { mapGetters } from "vuex";
export default {
  name: "pcchat",
  data() {
    return {
      chatlist: [],
      message: ""
    };
  },
  props: ["name"],
  sockets: {
    connect() { // 连接服务器成功
      this.$emit("cntS", "良好");
      this.$socket.emit("join", { name: this.name });
    },
    connect_failed() { // 连接服务器失败
      this.$emit("cntS", "断开");
      this.$message.error("连接聊天服务器失败");
    },
    disconnect() { /// 与服务器连接断开
      this.$message.error("与聊天服务器断开连接");
      this.$emit("cntS", "断开");
    },
    getList(data) { // 获取列表信息
      this.$emit("cntS", "良好");
      this.$store.commit("changeList", data.list);
    },
    fail(data) { // 错误反馈
      console.log(data.error);
    },
    inform(data) { // 加入/退出群聊提醒
      this.$message({
        showClose: true,
        message: data.msg,
        type: "warning"
      });
    },
    listen(data) { // 有新消息
      this.chatlist.push(data);
    }
  },
  mounted() {
    this.$socket.emit("join", { name: this.name });
    window.onbeforeunload = () => {
      this.$socket.emit("quit", { name: this.name });
    }
  },
  methods: {
    /* 退出 */
    back() {
      this.$socket.emit("quit", { name: this.name });
    },
    scorll() {
      let el = document.querySelector(".msg-container");
      el.scrollTop = el.scrollHeight;
    },
    /* 消息发送 */
    send() {
      if (this.message.trim().length === 0) return;

      let item = {
        msg: this.message,
        name: this.name
      };
      this.chatlist.push(item);
      this.message = "";
      
      this.$socket.emit('send', item)

      /* 
          这里如果直接调用 this.scorll()，那么由于执行的关系(v-for和scroll调用的先后)导致滚动条
        距离底部仍有距离。所以放在延时器中，确保 v-for 执行完毕后在调用scroll
      */
      setTimeout(() => {
        this.scorll();
      }, 0);
    }
  }
};
</script>

<style scoped>
.main-container {
  width: 800px;
  height: auto;
  background-color: rgba(238, 238, 238, 0.3);
}
.msg-container {
  width: 800px;
  height: 550px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 10px;
}
.input {
  width: 750px;
  height: auto;
}
ul {
  width: 800px;
  padding: 0;
  margin: 0;
  border: 0;
}
li {
  width: 100%;
  list-style-type: none;
  margin-top: 10px;
  clear: both; /* 左右不允许出现浮动元素 */
  display: block;
}
/* 自己发出的信息 */
.right {
  /* border-radius: 3px; */
  /* padding-bottom:  3px; */
  float: right;
  margin-right: 60px;
  /* margin-right: 30px; */
  /* display: block; */
  /* background-color: #71C671; */
  background: #ffd351;
  padding: 6px;
  border-radius: 10px;
  /*最大宽度不能太长，不然布局会混乱*/
  max-width: 400px;
  border: 1px solid white;
  box-shadow: 0 0 3px #879eee;
  margin: 6px 20px 0 10px;
}
/* 接收的信息 */
.left {
  float: left;
  background: #f0f8ff;
  padding: 6px;
  border-radius: 10px;
  max-width: 400px;
  border: 1px solid white;
  box-shadow: 0 0 3px #879eee;
  margin: 6px 10px 0 10px;
  overflow: hidden;
}
</style>


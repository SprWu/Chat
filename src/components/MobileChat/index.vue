<template>
  <div>
    <mu-appbar style="width: 100%;" color="primary" class="bar">
      <mu-button icon slot="left" @click="backDiaState = true">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>昵称:
      <span :class="[state===true?'connect':'pause']">{{ name }}</span>
      <mu-button flat slot="right" @click="openList">成员</mu-button>
    </mu-appbar>
    <div class="msg-container" ref="msgBox">
      <ul>
        <li v-for="(item,i) in chatList" :key="i">
          <div class="right" v-if="item.name === name">
            <span>{{ item.msg }}</span>
          </div>
          <div class="left" v-else>
            <span>{{ item.name }}:</span>
            <span>{{ item.msg }}</span>
          </div>
        </li>
      </ul>
    </div>
    <mu-text-field
      class="input"
      v-model="message"
      placeholder="说句话吧"
      action-icon="reply"
      full-width
      :action-click="send"
    ></mu-text-field>
    <!-- 退出Dialog -->
    <mu-dialog title="提示" width="80%" :open.sync="backDiaState" transition="slide-bottom">
      确定要退出？
      <mu-button slot="actions" flat color="primary" @click="backDiaState = false">取消</mu-button>
      <mu-button slot="actions" flat color="primary" @click="back">确定</mu-button>
    </mu-dialog>
    <!-- 成员列表Dialog -->
    <mu-dialog transition="slide-bottom" :open.sync="listDiaState" fullscreen>
      <mu-appbar color="primary" title="聊天成员列表" class="appbar">
        <mu-button slot="right" icon @click="listDiaState = false">
          <mu-icon value="close"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div class="list" ref="list">
        <ul>
          <li v-for="(user,i) in userList" :key="i">
            {{ user }}
          </li>
        </ul>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
import { setTimeout } from "timers";
import { mapGetters } from 'vuex'

export default {
  name: "mochat",
  data() {
    return {
      name: "",
      message: "",
      state: false,
      backDiaState: false, // 退出dialog状态
      listDiaState: false, // 成员列表dialog状态
      chatList: [],
      screenWidth: document.body.clientWidth,
      screenHeight: window.innerHeight
    };
  },
  sockets: {
    connect() {
      this.state = true;
      this.$socket.emit("join", { name: this.name });
    },
    disconnect() {
      this.$toast.warning("与聊天服务器断开连接！");
      this.state = false;
    },
    connect_failed() {
      this.$toast.error("连接聊天服务器失败！");
      this.state = false;
    },
    getList(data) {
      this.state = true;
      this.$store.commit("changeList", data.list);
    },
    inform(data) {
      this.$toast.success(data.msg);
    },
    listen(data) {
      this.chatList.push(data);
    },
    fail(data) {
      this.$toast.warning(data.message);
    }
  },
  methods: {
    back() {
      this.backDiaState = false;
      this.$socket.emit('quit', {name: this.name});
      localStorage.clear();
      this.$router.push('/login');
    },
    openList() {
      this.listDiaState = true;
      /* MuseUI自带的dialog内置滚动这里不好用
        自己用div的max-height + overflow 实现了
        setTimeout 是因为listDiaState为true，页面渲染dialog时 querySelector 不一定能找到
        渲染的元素(执行先于渲染完成)
      */
      setTimeout( () => {
        let appbar = document.querySelector(".appbar").clientHeight;
        this.$refs.list.style.maxHeight = this.screenHeight - appbar + 'px';
      },0)
    },
    scorll() {
      let el = document.querySelector(".msg-container");
      el.scrollTop = el.scrollHeight;
    },
    send() {
      if (this.message.trim().length === 0) return;
      let item = {
        msg: this.message,
        name: this.name
      };
      this.chatList.push(item);
      this.message = "";
      // ...
      this.$socket.emit("send", item);
      setTimeout(() => {
        this.scorll();
      }, 0);
    }
  },
  computed: {
    ...mapGetters({
      userList: 'getUserList'
    })
  },
  created() {
    this.name = localStorage.getItem("name");
  },
  mounted() {
    this.$socket.emit("join", { name: this.name });
    let bar = document.querySelector(".bar").clientHeight;
    let input = document.querySelector(".input").clientHeight;
    this.$refs.msgBox.style.maxHeight = this.screenHeight - bar - input + "px";
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  padding: 0;
}
.bar {
  vertical-align: top;
  position: absolute;
  top: 0;
}
.state {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: pink;
}
.msg-container {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.input {
  position: absolute;
  left: 0;
  bottom: 0;
}
.msg-container ul {
  width: 100%;
}
.msg-container li {
  display: block;
  width: 100%;
  height: 50px;
  line-height: 30px;
  clear: both;
  font-size: 16px;
}
.right {
  /* border-radius: 3px; */
  /* padding-bottom:  3px; */
  float: right;
  /* margin-right: 30px; */
  display: block;
  /* background-color: #71C671; */
  background: #ffd351;
  padding: 1%;
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
.connect {
  font-weight: bold;
  color: greenyellow;
}
.pause {
  font-weight: bold;
  color: red;
}
.list {
  overflow-y: scroll;
  overflow-x: hidden;
}
.list ul {
  width: 100%;
  height: 100%;
}
.list li {
  width: 100%;
  height: 3%;
  text-align: center;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1.5em;
  display: block;
  background-color: rgba(238, 238, 238, 0.5);
  margin-top: 3px;
}
</style>


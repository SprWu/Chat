<template>
  <div class="main-container">
    <div class="msg-container">
      <ul>
        <li v-for="(item,i) in chatlist" :key="i">
          <!-- <div :class="[item.type === 1? 'right' : 'left']">{{ item.msg }}</div> -->
          <!-- <div :class="[item.type ===1 ?'right':'left']">{{ item.msg }}</div> -->
          <div
            :class="{'right':item.name == name,'leftone':item.name == oneName,'lefttwo':item.name == twoName}"
          >{{ item.msg }}</div>
        </li>
      </ul>
    </div>
    <el-input @keydown.enter.native="send" class="input" placeholder="请输入内容" v-model="message" clearable></el-input>
    <el-button type="primary" icon="el-icon-back" @click="send" circle></el-button>
  </div>
</template>

<script>
import { setTimeout } from "timers";
// import { InitWebSocket } from '@/api/websocket'
import { wsURL } from "@/fetch";
import { open, close } from "fs";
import { mapGetters } from 'vuex';
export default {
  name: "chat",
  data() {
    return {
      chatlist: [],
      message: "",
      websock: null,
    };
  },
  props:['name'],
  computed: {
    ...mapGetters({
      oneName: 'getOneName',
      twoName: 'getTwoName'
    })
  },
  methods: {
    scorll() {
      let el = document.querySelector(".msg-container");
      el.scrollTop = el.scrollHeight;
    },
    /* 消息发送 */
    send() {
      if (this.message .trim().length === 0) return;

      let item = {
        type: 2,
        msg: this.message,
        name: this.name
      };
      this.chatlist.push(item);
      this.message = '';
      //WebSocket.send...
      this.websock.send(JSON.stringify(item));

      /* 
          这里如果直接调用 this.scorll()，那么由于执行的关系(v-for和scroll调用的先后)导致滚动条
        距离底部仍有距离。所以放在延时器中，确保 v-for 执行完毕后在调用scroll
      */
      setTimeout(() => {
        this.scorll();
      }, 0);
    },
    webSocketInit() {
      let ws = new WebSocket(wsURL);
      ws.onopen = () => {
        let data = {
          type: 1,
          name: this.name
        }
        ws.send(JSON.stringify(data));
      };
      ws.onclose = () => {
        this.$emit("cntS", "中断");
        console.log("WebSocket连接断开！");
      };
      ws.onerror = e => {
        console.log("WebSOcket连接发生错误");
        setTimeout(() => {
          this.webSocketInit();
        }, 2000);
      };
      ws.onmessage = res => {
        //console.log(res);
        let data = JSON.parse(res.data);
        // console.log(data);
        switch (data.type) {
          case 1:
            //连接成功
            this.$emit("cntS", "良好");
            //console.log(data.data);
            break;
          case 2:
            //有人发消息
             if(data.name != this.name) {
               this.chatlist.push({
                 msg: data.msg,
                 name: data.name
               })
             }
            break;
          case 3:
            //匹配需要等待
            break;
          case 4:
            //普通消息推送(有人离开)
            console.log(msg.data.msg);
            break;
          case 5:
            //普通消息(取消匹配成功)
            console.log(msg.data.msg);
            break;
          case 6:
            //在线人数
            this.$store.commit("changeNum", data.data);
            let users = data.user.filter( user => user != this.name)
            this.$store.commit("setName",users)
            break;
          default:
            break;
        }
      };
      return ws;
    }
  },
  created() {
    this.websock =  this.webSocketInit();
  },
  beforeDestroy() {
    this.websock = null;
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
  margin-top: 10px;
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
.leftone {
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
.lefttwo {
  float: left;
  background: #63b8ff;
  padding: 6px;
  border-radius: 10px;
  max-width: 400px;
  border: 1px solid white;
  box-shadow: 0 0 3px #879eee;
  margin: 6px 10px 0 10px;
  overflow: hidden;
}
</style>


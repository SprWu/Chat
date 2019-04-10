<template>
  <div class="main-container">
    <div class="msg-container">
      <ul>
        <li v-for="(item,i) in chatlist" :key="i">
          <!-- <div :class="[item.type === 1? 'right' : 'left']">{{ item.msg }}</div> -->
          <div :class="[item.type ===1 ?'right':'left']">{{ item.msg }}</div>
        </li>
      </ul>
    </div>
    <el-input class="input" placeholder="请输入内容" v-model="message" clearable></el-input>
    <el-button type="primary" icon="el-icon-back" @click="send" circle></el-button>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: "chat",
  data() {
    return {
      chatlist: [],
      message: ""
    };
  },
  methods: {
    scorll() {
      let el = document.querySelector('.msg-container')
      el.scrollTop = el.scrollHeight;
    },
    send() {
      if (this.message.trim().length === 0) return;
      var n = Math.floor(Math.random()*10);
      let item = {
        msg: this.message,
        type: n%2===0?1:2
      };
      this.chatlist.push(item);

      //WebSocket.send...

      /* 
          这里如果直接调用 this.scorll()，那么由于执行的关系(v-for和scroll调用的先后)导致滚动条
        距离底部仍有距离。所以放在延时器中，确保 v-for 执行完毕后在调用scroll
      */
      setTimeout( ()=> {
        this.scorll()
      },0)
    }
  }
};
</script>

<style scoped>
.main-container {
  width: 800px;
  height: auto;
}
.msg-container {
  width: 800px;
  height: 550px;
  overflow-y: auto;
  overflow-x:hidden;
  border: 1px dashed gold;
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
.left {
  float: left;
  background: #F0F8FF;
  padding: 6px;
  border-radius: 10px;
  max-width: 400px;
  border: 1px solid white;
  box-shadow: 0 0 3px #879eee;
  margin: 6px 10px 0 10px;
  overflow: hidden;
}
</style>


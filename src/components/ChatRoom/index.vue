<template>
  <div class="chat-index">
    <div class="online">
      <div class="tip">在线列表</div>
      <ul class="online-ul">
        <li class="onilne-li" v-for="(user,i) in userList" :key="i">{{ user }}</li>
      </ul>
    </div>
    <div class="info-container">
      <div class="logout">
        <span class="connect-state">连接状态：<span :class="[state === '良好'?'good':'bad']">{{ state }}</span></span>
        <span>您的昵称:<span class="self">{{ selfName }}</span></span>
        <el-button class="back" @click="dialogState = true;" type="warning" icon="el-icon-close" circle></el-button>
      </div>
      <div class="user-info">
      </div>
    </div>
    <chat-box ref="chatbox" :name="selfName" @cntS="cntS" class="chatBox"></chat-box>
    <!-- 对话框 -->
    <el-dialog title="确定退出?" :visible.sync="dialogState" width="30%">
      <el-button @click="dialogState = false">取 消</el-button>
      <el-button type="primary" @click="goBack">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import chatBox from "@/components/ChatRoom/Chat";
import { setTimeout } from 'timers';
import {getInfo} from '@/api/info.js'
import {mapGetters} from 'vuex'
export default {
  name: "index",
  data() {
    return {
      selfName: "",
      dialogState: false,
      state: "断开"
    };
  },
  methods: {
    initInfo() {
      getInfo().then( res => {
        if(res.data.type === 6) {
          this.oneName = res.data.userInfo.one;
          this.twoName = res.data.userInfo.two;
          this.$store.commit('setName',{
            oneName: this.oneName,
            twoName: this.twoName
          })
        }else {
          this.$message.error("信息获取失败!")
        }
      })
    },
    goBack() {
      this.dialogState = false;
      localStorage.clear();
      this.$refs.chatbox.back();
      this.$message({
        message: "感谢您的使用,欢迎再次寻觅知音",
        type: 'success',
        duration: 2000
      })
      setTimeout(() => {
        this.$router.push('/login')
      },2000)
      
    },
    /* WebSocket连接状态改变时触发 */
    cntS(state) {
      this.state = state;
    }
  },
  computed: {
    ...mapGetters({
      userList: 'getUserList'
    })
  },
  created() {
    this.selfName = localStorage.getItem("name");
    this.$store.commit('userAdd',this.selfName);
    // this.initInfo()
  },
  components: {
    chatBox
  }
};
</script>

<style scoped>
.online {
  top: 50px;
  left: 100px;
  position: absolute;
  border-radius: 10px;
  width: 200px;
  height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: rgba(238, 238, 238, 0.3);
}
.tip {
  width: auto;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  display: block;
  background-color: rgb(238, 238, 238);
  border-radius: 5px;
}
.online-ul {
  border: 0;
  padding: 0;
  margin: 0;
}
.onilne-li {
  list-style-type: none;
  display: block;
  width: auto;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  color: rgb(13, 23, 64);
  background-color: rgba(255,192,159,0.5);
  border-radius: 6px;
  border: 1px solid white;
   box-shadow: 0 0 3px #879eee;
}
.info-container {
  margin: 30px auto 0 auto;
  width: 800px;
  height: 60px;
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
.line-num {
  color: goldenrod;
  font-weight: bold;
  font-size: 20px;
  margin-left: 10px;
}
.connect-state{
  float: left;
  margin-left: 10px;
}
.chat-index {
  top: 0;
  background-image: url("https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture");
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.chatBox {
  margin: 0 auto;
}
.logout {
  width: 100%;
  height: 30px;
}
.user-info {
  width: 100%;
}
.self {
  color: #ffd351;
  font-size: 20px;
  font-weight: bold;
}
.chat-one {
  color: #f0f8ff;
  font-size: 20px;
  font-weight: bold;
}
.chat-two {
  color: #5CACEE;
  font-size: 20px;
  font-weight: bold;
}
.back {
  float: right;
}
.good {
  color: green;
  font-size: 20px;
  font-weight: bold;
}
.bad {
  color: red;
  font-size: 20px;
  font-weight: bold;
}
</style>


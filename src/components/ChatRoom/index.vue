<template>
  <div class="chat-index">
    <h1>这是聊天室首页</h1>
    <chat-box class="chatBox"></chat-box>
  </div>
</template>

<script>
import chatBox from '@/components/ChatRoom/Chat'
export default {
  name: "index",
  data() {
    return {
        name: ''
    };
  },
  methods: {},
  created() {
      this.name = localStorage.getItem('name');
  },
  components: {
      chatBox
  }
};
</script>

<style scoped>
.chat-index {
    top: 0;
    /* background-image: url('../../assets/bgichat.jpg'); */
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.chatBox {
    margin: 0 auto;
}
</style>


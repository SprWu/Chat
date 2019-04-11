const url = "ws://localhost:9000";


// function open() {
//     console.log("WebSocket连接成功!");
// }

// function message(e) {
//     let msg = JSON.parse(e.data);
//     if(msg.type === 6)
//         console.log(msg.data.users);
// }

// function close() {
//     console.log("WebSocket连接断开!");
// }

// function error(e) {
//     console.log("连接发生错误");
// }


export function InitWebSocket() {
    this.websocket = new WebSocket(url);
    this.websocket.onopen = null;
    this.websocket.onmessage = null;
    this.websocket.onclose = null;
    this.websocket.onerror = null;
}
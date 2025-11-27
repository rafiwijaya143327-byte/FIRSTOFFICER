// if_api_client.js — Infinite Flight Local API WebSocket Client

console.log("IF API Client Loaded");

window.IFClient = {
  socket: null,
  connected: false,
  heartbeat: null,
  callbacks: {},

  connect(opts){
    this.callbacks = opts || {};

    try {
      this.socket = new WebSocket("ws://localhost:10111/");

      this.socket.onopen = () => {
        this.connected = true;
        if(this.callbacks.onConnected) this.callbacks.onConnected();
      };

      this.socket.onclose = () => {
        this.connected = false;
        if(this.callbacks.onDisconnected) this.callbacks.onDisconnected();
      };

      this.socket.onmessage = (evt) => {
        try {
          const data = JSON.parse(evt.data);
          if(this.callbacks.onStateChange) this.callbacks.onStateChange(data);
        } catch(e){
          console.warn("Bad IF message:", e);
        }
      };

    } catch(e){
      console.error("IF API connection error", e);
    }
  },

  disconnect(){
    if(this.socket){
      this.socket.close();
      this.socket = null;
    }
    this.connected = false;
  }
};
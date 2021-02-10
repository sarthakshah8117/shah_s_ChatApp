import ChatMessage from "./components/ThemessageComponent.js";

(() => {
    console.log('fired');

    const socket = io();

    //messenger servce event handling -> incoming from the manager
    function setUserId({sID, message}) {
        // incomung connected event with data
        debugger;
        vm.socketID = sID;
    }

    function appendMessage(message) {
        vm.messages.push(message);
    }

    const vm = new Vue({
        data: {
            messages: [],
            nickname: "",
            username: "",
            socketID: "",
            message: ""
        },

        created: function() {
            console.log('its alive');
        },

        methods: {
            dispatchMessage() {
                socket.emit('chatmessage', {content: this.message, name: this.nickname || "Anonymous"})
            }

        },

        components: {
            newmessage: ChatMessage
        }
    }).$mount("#app");

    socket.addEventListener("connected", setUserId);
    socket.addEventListener('message', appendMessage); 

})();
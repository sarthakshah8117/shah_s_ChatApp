import ChatMessage from "./components/ThemessageComponent.js";

(() => {
    console.log('fired');

    const socket = io();

    //messenger servce event handling -> incoming from the manager
    function setUserId({sID, message}) {
        // incomung connected event with data
        
        vm.socketID = sID;
    }

    function appendMessage(message) {
        vm.messages.push(message);
    }

    const vm = new Vue({
        data: {
            messages: [],
            // nickname: "",
            // username: "",
            date: "",
            socketID: "",
            message: ""
        },

        created: function() {
            console.log('its alive');
        },

        methods: {
            dispatchMessage() {

                var d = new Date();
                var date = (d.getDate() + "/" + d.getMonth()+1)+ "/" + d.getFullYear() + "  ";
                var time = date + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                socket.emit('chatmessage', {content: this.message, name: this.usename, date: time || "Anonymous"});

                this.message = ""; 
            }

        },

        
        components: {
            newmessage: ChatMessage
        }
    }).$mount("#app");

    socket.addEventListener("connected", setUserId);
    socket.addEventListener('message', appendMessage); 

})();
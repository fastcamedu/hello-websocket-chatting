/**
 * StompJs 클라이언트 생성
 * @type {StompJs.Client}
 */
const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/hello-websocket-chatting',
    reconnectDelay: 200,
});

stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/chatting', (received_message) => {
        console.log("> Received message: " + received_message.body)
        showChatting(JSON.parse(received_message.body).content);
    });
};
stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};
stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    $("#chatting").html("");
    if (connected) {
        $("#chatting").append("<tr><td>>>> Connected Chatting Server !!!</td></tr>");
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
    console.log("> Send message : " + $("#chatting-message").val());
    stompClient.publish({
        destination: "/app/chatting-message",
        body: JSON.stringify({'message': $("#chatting-message").val()})
    });
}

function showChatting(message) {
    $("#chatting").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendMessage());
});
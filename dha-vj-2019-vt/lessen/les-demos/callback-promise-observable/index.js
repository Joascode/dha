var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var xhr = new XMLHttpRequest();
function xhrSuccess() {
    this.callback.apply(this, this.arguments);
}
function xhrError() {
    console.error(this.statusText);
}
function loadFile(sURL, fCallback) {
    var arg3 = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        arg3[_i - 2] = arguments[_i];
    }
    var oReq = new XMLHttpRequest();
    oReq.callback = fCallback;
    oReq.arguments = arg3;
    oReq.onload = xhrSuccess;
    oReq.onerror = xhrError;
    oReq.open("get", sURL, true);
    oReq.send(null);
}
function showMessage(sMsg) {
    alert(sMsg + this.responseText);
}
loadFile("message.txt", showMessage, "New message!\n\n");

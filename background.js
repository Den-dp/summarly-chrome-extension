// React when a browser action's icon is clicked.
chrome.browserAction.onClicked.addListener(function(currentTab) {
    var http = new XMLHttpRequest();
    var apiUrl = "http://summarly-api.herokuapp.com/summarly-api/summarize/url";
    var params = "url="+encodeURI(currentTab.url);
    http.open("POST", apiUrl, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded"/*;charset=UTF-8"*/);

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);

        chrome.tabs.create({url: chrome.extension.getURL("summarly.html")}, function(newTab){
            chrome.tabs.executeScript(newTab.id, {
                code: 'document.write("hello world");'
            });
        });
        chrome.tabs.create({
            url: "data:text/html,<style>body{width: 70%;margin: 0 auto;word-break: break-word;font-size: larger;min-width: 900px;}</style><body><script>" +
            "window.setTimeout(function() {document.write(\""+http.responseText+"\")},100);" +
            "</script></body>"
        });

        }
    };
    http.send(params);
});

//chrome.tabs.create({url: chrome.extension.getURL("summarly.html")}, function(newTab){
//    chrome.tabs.sendMessage(newTab.id, {"action" : "setBackground"});
//    chrome.runtime.sendMessage({}, function(response) { document.body.style.backgroundcolor="red"; })
//    chrome.runtime.sendMessage({greeting: 'hello'});
//    chrome.tabs.sendRequest(newTab.id, {counter: 1});
//    /*chrome.tabs.executeScript(newTab.id, {
//        code: 'document.write("hello world");'
//    });*/
//});
/*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
 chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
 console.log(response.farewell);
 });
 });*/
/* chrome.windows.create({
 type: 'popup',
 url: "https://www.google.co.in/"
 }, function (newWindow) {
 console.log(newWindow);
 chrome.tabs.executeScript(newWindow.tabs[0].id, {
 code: 'document.write("hello world");'
 });
 });*/
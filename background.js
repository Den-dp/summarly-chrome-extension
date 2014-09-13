// React when a browser action's icon is clicked.
chrome.browserAction.onClicked.addListener(function(currentTab) {
    var apiUrl = "http://summarly-api.herokuapp.com/summary?";
    var params = "url=" + encodeURI(currentTab.url);
    chrome.tabs.create({url: apiUrl + params});
});
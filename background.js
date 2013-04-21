// background.js:
// React when browser action's icon is clicked (turn on/off)

var toggle = false;
chrome.browserAction.onClicked.addListener(function(tab) {
  toggle = !toggle;
  if(toggle){
    chrome.browserAction.setIcon({path: "link_enabled.png", tabId:tab.id});
    chrome.tabs.executeScript(tab.id, {file:"reblogLinkScript.user.js"});
  }
  else{
    chrome.browserAction.setIcon({path: "link_disabled.png", tabId:tab.id});
    chrome.tabs.executeScript(tab.id, {code:""});
  }
});
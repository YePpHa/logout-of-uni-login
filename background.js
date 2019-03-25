function removeCookie(url, name) {
  return new Promise(function(resolve, reject){
    chrome.cookies.remove({ "url": url, "name": name }, function(detail) {
      if (detail) {
        resolve();
      } else {
        reject(chrome.runtime.lastError);
      }
    });
  });
}

var uni = {};
uni.logout = function() {
  return removeCookie("https://sso.emu.dk/", "pubcookie_s_IGNORER")
  .then(function(){
    return removeCookie("https://login.emu.dk/", "pubcookie_l");
  })
  .then(function(){
    chrome.notifications.create("uni-c-logout-success", {
      "type": "basic",
      "title": "Success",
      "message": "You have been logged out of UNI-C.",
      "iconUrl": "icon128.png"
    });
  }, function(err){
    chrome.notifications.create("uni-c-logout-error", {
      "type": "basic",
      "title": "Logout Error",
      "message": err,
      "iconUrl": "icon128.png"
    });
  })
};

chrome.browserAction.onClicked.addListener(uni.logout);

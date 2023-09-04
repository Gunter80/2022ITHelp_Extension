let notificationId ;

function sendtopopup(params) {
  chrome.runtime.sendMessage({ message: params});
}

function sendMsgToDb(val){
  const dbemail = 'g24966362@gmail.com';
  const dbpass = 'enovel800312';
  if(val.email === dbemail && dbpass === val.password){
    console.log("DB login success");
    return true;
  }else{
    console.log("DB login fail");
    return false;
  }
}

// 當網站中的頁面做更新的時候觸發
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" ){
    if(tab.url === "https://ithelp.ithome.com.tw/users/20139636"){
      // 創建一個新 notifications
      chrome.notifications.create(
        notificationId,
        {
          type: 'basic',
          iconUrl: 'ithelp_gg.png',
          title: '歡迎光臨',
          message: "我是WINNIE 嘿嘿!",
          // notification 上的按鈕
          buttons: [{ title: '點我！' }],
          priority: 0,
        },(id) => { 
          console.log("notifications ID:",
          id); 
          notificationId = id;
        }
      )
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'login') {
    // email = chrome.storage.sync.get(["email"]).then((result) => {
    //   console.log("Value currently is " + result.email);
    // });
    // pass = chrome.storage.sync.get(["pass"]).then((result) => {
    //   console.log("Value currently is " + result.pass);
    // });
    console.log(request.payload.email);
    DBback = sendMsgToDb(request.payload);
    if(DBback){
      chrome.storage.sync.set({ email: request.payload.email }).then(() => {
        console.log("email is set");
      });
      chrome.storage.sync.set({ pass: request.payload.password }).then(() => {
        console.log("pass is set");
      });
    }else{
      sendtopopup("登入失敗");
    }


    // if(request.payload.email === email && request.payload.password === pass){
    //   chrome.storage.local.set({ userStatus: signIn, user_info }, function (response) {
    //     if (chrome.runtime.lastError) resolve('fail');

    //     user_signed_in = signIn;
    //     resolve('success');
    // });

    // }


    //if storage same to login message

    //send login message to server
    
    //send message to popup.js

      return true;
  } else if (request.message === 'logout') {
      flip_user_status(false, null)
          .then(res => sendResponse(res))
          .catch(err => console.log(err));
      return true;
  } 
});



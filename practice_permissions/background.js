let notificationId ;

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



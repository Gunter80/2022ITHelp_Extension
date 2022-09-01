const checkURL =(url) => { 
  const { hostname } = new URL(url);
  return hostname==="ithelp.ithome.com.tw"
}
const setStorage = (obj) => {
  chrome.storage.sync.set(obj, () => {})
}


//判斷 URL是否為 ITHELP
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete"){
    const isURLMatch = await checkURL(tab.url);
    await setStorage({'isURLMatch':  isURLMatch });
  }
});


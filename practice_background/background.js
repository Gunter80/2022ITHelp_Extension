const getStorage = async (key) => {
  return new Promise(resolve => {
    chrome.storage.sync.get([key], (res) => resolve(res[key]))
  })
}
const setStorage = (obj) => {
  chrome.storage.sync.set(obj, () => {})
}



//初次安裝時觸發
chrome.runtime.onInstalled.addListener(async () => {
  console.log('Extension is Installed');
  //初始化資料
  await setStorage({
    'isClear': false,
  });
});

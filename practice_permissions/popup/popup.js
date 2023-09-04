const btn = document.querySelector('.btn');
const dologin = document.querySelector('#sendlogin');

const injectWelcomItem = (src) => {
  const div = document.createElement('div').innerHTML =
    `
  <img style="width:100%; height:100%;"
  src="${src}"
  > `
}


const getStorage = async (key) => {
  return new Promise(resolve => {
    chrome.storage.sync.get([key], (res) => resolve(res[key]))
  })
};

btn.addEventListener('click', async () => {
  const isURLMatch = await getStorage('isURLMatch');

  if (isURLMatch) {
    console.log(isURLMatch);
  }
});

dologin.addEventListener('click', async () => {
  email = document.querySelector('#email').value;
  password = document.querySelector('#pass').value;
  chrome.runtime.sendMessage({ message: 'login', payload: { email, password } }, function (response) {

  });
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === '登入失敗') {
    alert("登入失敗");
  }
});
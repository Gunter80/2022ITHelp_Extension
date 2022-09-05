const btn = document.querySelector('.btn');

const injectWelcomItem =(src) => { 
  const div = document.createElement('div').innerHTML=
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
  const isURLMatch =await getStorage('isURLMatch');

  if(isURLMatch){
    console.log(isURLMatch);
  }
})

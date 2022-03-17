import conf from "./conf.json"

const mainPage = conf.main_page;
const queryBuilderPage = conf.queryBuilder_page


function getRaw(url) {
  return new Promise(function(resolve,reject) {
    fetch(url,{cache: 'no-cache'}).then((response) => {
      if(response.ok){
        response.blob().then(function(blob) {
          resolve(blob)
        });
      }else{
        console.error("Failed to fetch on get "+url)
        reject(undefined)
      }
    }).catch((error) => {
      reject(undefined)
      console.error("Failed to fetch",error)
    })
  })
}

export async function getConfOf(page,fun = ()=>{}) {
  let url, conf = undefined;
  switch (page) {
    case "main_page":
      url = mainPage.conf
      break;
    case "queryBuilder_page":
      url = queryBuilderPage.conf
      break;
    default:
      console.error("parameter page is not supported")
      break;
  }
  if(url){
    conf = JSON.parse(await (await getRaw(url)).text())
    fun(conf)
  }
}

export async function getMD(url,fun = ()=>{}) {
  if(url){
    let mdData = await (await getRaw(url)).text()
    fun(mdData)
  }
}
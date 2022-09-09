import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};


export const AJAX = async function(url,uploaddata = undefined){
  try{
  const fetchpro  = uploaddata ? fetch(url,{
    method:"POST",
    headers:{
      "Content-Type" :"application/json",

    },
    body:JSON.stringify(uploaddata)
  }) : fetch(url)


  const res = await Promise.race([fetchpro,timeout(TIMEOUT_SEC) ])
     const data = await res.json()
      if(!res.ok)throw new Error(`${data.message} (${res.status}`)
  
  return data
}catch(err){
  throw err
}
}


// export let getJson = async function (url){
// try{

//     const res = await Promise.race([fetch(url),timeout(TIMEOUT_SEC) ])
//    const data = await res.json()
//     if(!res.ok)throw new Error(`${data.message} (${res.status}`)

// return data
// }catch(err){
//    throw err
// }

// }


// export let sendJson = async function (url,uploadData){
//   try{
  
//     let fetchpro = fetch(url,{
//       method:"POST",
//       headers:{
//         "Content-Type" :"application/json",

//       },
//       body:JSON.stringify(uploadData)
//     })
//       const res = await Promise.race([fetchpro,timeout(TIMEOUT_SEC) ])
//      const data = await res.json()
//       if(!res.ok)throw new Error(`${data.message} (${res.status}`)
  
//   return data
//   }catch(err){
//      throw err
//   }
  
//   }
  
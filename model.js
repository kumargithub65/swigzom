import {async} from "regenerator-runtime"
import {API_URL} from "./config.js"
// import { getJson,sendJson } from "./helper.js"
import { AJAX} from "./helper.js"
import { MINIMUM_PAGE,KEY } from "./config.js"


export let state ={
    recipe : {},
    search : {
        query : "",
        results : [],
        respage : MINIMUM_PAGE,
        storedpage: 1
        
    },
    bookmark:[]
}

export const addBookmark = function(recipe){
    state.bookmark.push(recipe)
    if(recipe.id === state.recipe.id)  state.recipe.bookmarked = true
    localStoring()
}

function createrecipeobject(data){
    let { recipe } = data.data 
   return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredints: recipe.ingredients,
    ...(recipe.key && {key:recipe.key})
    };
}

let localStoring = function (){
    localStorage.setItem("storing", JSON.stringify(state.bookmark))
}
export const loadrecipe  = async function(id){
    try{

    let data = await AJAX(`${API_URL}/${id}`)
    // let data = await getJson(`${API_URL}/${id}`)
    state.recipe = createrecipeobject(data)

    if(state.bookmark.some(bookmark=> bookmark.id === id)){
       state.recipe.bookmarked= true
    }else{
        state.recipe.bookmarked= false
    }
 
}catch(err){
    throw err
}


} 

export const loadsearch = async function(query){
    try{
state.search.query = ""
 let data  = await AJAX(`${API_URL}?search=${query}`)
   state.search.results = data.data.recipes.map(ele =>{
    return {
    id: ele.id,
    title: ele.title,
    publisher: ele.publisher,
    image: ele.image_url,
    ...(ele.key && {key:ele.key})
    }

    
 })
state.search.storedpage = 1
    }catch(err){
throw err
    }

}


export const getsearchpage = function(page=state.search.storedpage){

state.search.storedpage = page

    let start = (page - 1) * state.search.respage
    let end  = (page  ) * state.search.respage

return state.search.results.slice(start,end)

}


export  const updateservings = function(newservings){
    state.recipe.ingredints.forEach(element => {
        element.quantity = (element.quantity * newservings )/ state.recipe.servings
    })

      state.recipe.servings = newservings

     
    

}

export const deletebookmark = function(id){

 const index = state.bookmark.findIndex(el => el.id === id)
 state.bookmark.splice(index,1)

 if(id === state.recipe.id) state.recipe.bookmarked = false

 localStoring()

}

function init (){
    let storage = localStorage.getItem("storing");
    if (storage){
             state.bookmark = JSON.parse(storage)
      
    }
 
}


init()

const clearBookmarks = function () {
    localStorage.clear('storing');
  };
//   clearBookmarks();

  export const uploadrecipe = async function(newRecipe){
    try{
     
    // console.log(Object.entries(newRecipe))
    const ingredients = Object.entries(newRecipe).filter(element => element[0].startsWith("ingredient") && element[1] !== "").map(ing => {
let ingarr =  ing[1].replaceAll(" ","").split(",")
if(ingarr.length !==3){
    throw new Error("wrong ingredient format ,please use the correct form")
}

  let   [quantity,unit,description]=  ingarr
    return {
        quantity : quantity ? +quantity : null,unit,description
    }
})


const recipeData = {
    title: newRecipe.title,
    source_url : newRecipe.sourceUrl,
    image_url: newRecipe.image,
    publisher: newRecipe.publisher,
    cooking_time: +newRecipe.cookingTime,
    servings: +newRecipe.servings,
    ingredients,
    }

   let check =  await AJAX(`${API_URL}?key=${KEY}`,recipeData)
    state.recipe= createrecipeobject(check)
    addBookmark(state.recipe)

}catch(err){
    throw err
}
  }


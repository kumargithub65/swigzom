// import  "core-js/stable"
// import "regenerator-runtime"
import * as model from "./model.js"
import recipeview from "./recipeview.js"
import searchview from "./searchview"
import resultsView from "./resultsView.js"
import pagenation from './pagenation.js'
import bookMarkview from "./bookMarkview.js"
import addrecipeview from "./addrecipeview.js"
// import { async } from "regenerator-runtime"


// if(module.hot){
//   module.hot.accept()
// }

console.log("welcome")

const controlrecipe =  async function () {
  try {


    let id = window.location.hash.slice(1)
  if(!id) return 
 
    recipeview.renderspinner()


    resultsView.update(model.getsearchpage())

 
    bookMarkview.update(model.state.bookmark)
await model.loadrecipe(id)

recipeview.render(model.state.recipe)





  }catch(err){
    recipeview.renderError()
    console.error(err)
  }
}
// controlrecipe()


const controlsearch = async function(){
  try{
  resultsView.renderspinner()
  let query =  searchview.getquery()
  if(!query) return


  await model.loadsearch(query)

  // resultsView.render(model.state.search.results)
  resultsView.render(model.getsearchpage())

  pagenation.render(model.state.search)

  }catch(err){
    // resultsView.renderError()
    console.log(err)
  }

}

let controlpage = function(gotpage){
  // resultsView.render(model.state.search.results)
  resultsView.render(model.getsearchpage(gotpage))

  pagenation.render(model.state.search)

}

const controlservings =  async function(newserving){
   model.updateservings(newserving)
  recipeview.render(model.state.recipe)
    // recipeview.update(model.state.recipe)
}

const controlBookmark =function(){

if(!model.state.recipe.bookmarked){
  model.addBookmark(model.state.recipe)
}else{
  model.deletebookmark(model.state.recipe.id)
}


// recipeview.update(model.state.recipe)
 // u can use this or this 
recipeview.render(model.state.recipe)

bookMarkview.render(model.state.bookmark)

}


const controlBookmarker = function() {
  bookMarkview.render(model.state.bookmark)
  }



const controladdrecipe = async function(recipe){
  try{
    addrecipeview.renderspinner()
  console.log(recipe)
await  model.uploadrecipe(recipe)
console.log(model.state.recipe)

recipeview.render(model.state.recipe)

addrecipeview.renderMessage()
bookMarkview.render(model.state.bookmark)

// setTimeout(function(){
//   addrecipeview.toggleWindow()
// },2500)
  }catch(err){
    console.log(err)

    addrecipeview.renderError(err.message)
  }

}


function init(){
bookMarkview.addhandler(controlBookmarker)
  recipeview.addhandlerender(controlrecipe)
  searchview.addhandler(controlsearch)
  recipeview.addbookmarkhandler(controlBookmark)
  recipeview.addservinghandler(controlservings)
  pagenation.addhandler(controlpage)
addrecipeview.addhandlerupload(controladdrecipe)
}






init()

// ["hashchange","load"].forEach(ele => window.addEventListener(ele,showRecipe) )








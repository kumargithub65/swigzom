
import icons from "./img/icons.svg"
// import Fraction from "fractional"
import view from "./view.js"


export class  recipeview extends view{

_parentel = document.querySelector(".recipe")


errorMessage = "No recipes found for your query. Please try again!"
Message =""



_data
  render(data){
this._data = data
let markup = this._generatemarkup()
this.clear()
this._parentel.insertAdjacentHTML("afterbegin",markup)


  }


  
 renderspinner (){
  let markup = `
   <div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
</div> re
`

this.clear()
this._parentel.insertAdjacentHTML("afterbegin",markup)
}

renderError(message=this.errorMessage){
let markup = `
<div class="error">
<div>
  <svg>
    <use href="${icons}#icon-alert-triangle"></use>
  </svg>
</div>
<p>${message}</p>
</div>


`
this.clear()
this._parentel.insertAdjacentHTML("afterbegin",markup)

}
renderMessahe(message=this.Message){
  let markup = `
  <div class="message">
  <div>
    <svg>
      <use href="${icons}#icon-smile"></use>
    </svg>
  </div>
  <p>${message}</p>
  </div>
  
  
  `
  this.clear()
  this._parentel.insertAdjacentHTML("afterbegin",markup)
  
  }
  

addhandlerender(handle){

  
  let listner = ["hashchange","load"]

  listner.forEach(ele => window.addEventListener(ele,handle) )

}

  clear(){
    this._parentel.innerHTML=""
  }
 



  addservinghandler(handle){
    console.log(this._parentel)
this._parentel.addEventListener("click",function(e){

let btn = e.target.closest(".btn--update-servings")
if(!btn) return

let update  = +btn.dataset.check

if( update > 0)handle(update)


})

  }

addbookmarkhandler(handle){
this._parentel.addEventListener("click",function(e){
 let btn =  e.target.closest(".btn--bookmark")
 if(!btn) return 
console.log(btn)
handle()

})
}


  _generatemarkup(){
    console.log(this._data)
  
  return  `
  
  <figure class="recipe__fig">
  <img src="${this._data.image}" alt="Tomato" class="recipe__img" />
  <h1 class="recipe__title">
    <span>${this._data.title}</span>
  </h1>
</figure>

<div class="recipe__details">
  <div class="recipe__info">
    <svg class="recipe__info-icon">
      <use href="${icons}#icon-clock"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
    <span class="recipe__info-text">minutes</span>
  </div>
  <div class="recipe__info">
    <svg class="recipe__info-icon">
      <use href="${icons}#icon-users"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
    <span class="recipe__info-text">servings</span>

    <div class="recipe__info-buttons">
      <button class="btn--tiny btn--update-servings" data-check="${this._data.servings-1}">
        <svg>
          <use href="${icons}#icon-minus-circle"></use>
        </svg>
      </button>
      <button class="btn--tiny btn--update-servings"  data-check="${this._data.servings+1}">
        <svg>
          <use href="${icons}#icon-plus-circle"></use>
        </svg>
      </button>
    </div>
  </div>

  <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">

      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>

  </div>
  <button class="btn--round btn--bookmark">
    <svg class="">
      <use href="${icons}#icon-bookmark${this._data.bookmarked ? "-fill" : ""}"></use>
    </svg>
  </button>
</div>

<div class="recipe__ingredients">
<h2 class="heading--2">Recipe ingredients</h2>
  <ul class="recipe__ingredient-list">
      ${this._data.ingredints.map(this._generatemarkupPreview).join("")}

 </div>

<div class="recipe__directions">
  <h2 class="heading--2">How to cook it</h2>
  <p class="recipe__directions-text">
    This recipe was carefully designed and tested by
    <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
    directions at their website.
  </p>
  <a
    class="btn--small recipe__btn"
    href="${this._data.sourceUrl}"
    target="_blank"
  >
    <span>Directions</span>
    <svg class="search__icon">
      <use href="img/icons.svg#icon-arrow-right"></use>
    </svg>
  </a>
</div>

  

  

`

  }

  _generatemarkupPreview(ing){

    return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${ ing.quantity}</div>
      
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>
`


  }
}



export default new recipeview()

{/* <div class="recipe__quantity">${ ing.quantity ? new Fraction.Fraction(ing.quantity).toString() : ""}</div> */}
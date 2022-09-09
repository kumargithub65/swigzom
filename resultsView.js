import view from "./view"
import icons from "./img/icons.svg"



class resultsview extends view {
 
  _parentel = document.querySelector(".results")
  _errorMessage = "no recipes found for your query please try again"
 _Message=""


_generatemarkup(){
console.log("gerfating")
  return this._data.map(this._generatemarkupPrieview).join("")

 
}

_generatemarkupPrieview(result){
  let id = window.location.hash.slice(1)
  console.log(result)
  console.log(id)
  return `
  <li class="preview">
    <a class="preview__link  ${result.id === id ? "preview__link--active" :''}"  href="#${result.id}">
      <figure class="preview__fig">
      <img src="${result.image}" alt="${result.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.publisher}</p>

   
        <div class="preview__user-generated ${result.key ? "" : "hidden"}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>


       </div>
    </a>
  </li>



  

   `
}

}

export default new resultsview()
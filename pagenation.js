import view from "./view.js";
import icons from "./img/icons.svg"

let _parentel = document.querySelector(".pagination")


class pagenation extends view {
  
    _parentel = document.querySelector(".pagination")
  

  addhandler(handle){
  
this._parentel.addEventListener("click",function(e){
        let btn = e.target.closest(".btn--inline")
        if(!btn) return
               let gotopage =    +btn.dataset.goto 
          console.log(gotopage)
        handle(gotopage)
  })

  }


  _generatemarkup(){


let currPage = this._data.storedpage
    let numPage = Math.ceil(this._data.results.length / this._data.respage)

    // 1 page  
 if(currPage === 1 && numPage > 1){
 return `
 <button data-goto="${currPage+1}" class="btn--inline pagination__btn--next">
 <span>Page ${currPage+1}</span>
 <svg class="search__icon">
   <use href="${icons}#icon-arrow-right"></use>
 </svg>
 </button> 
 
 
 `
 }

 if(currPage === numPage && numPage > 1 ){
    return `
    <button data-goto="${currPage-1}" class="btn--inline pagination__btn--prev">
   <svg class="search__icon">
     <use href="${icons}#icon-arrow-left"></use>
   </svg>
   <span>Page ${currPage-1}</span>
   </button>
    `
 }

 if( currPage < numPage ){
return `

<button data-goto="${currPage+1}" class="btn--inline pagination__btn--next">
<span>Page ${currPage+1}</span>
<svg class="search__icon">
  <use href="${icons}#icon-arrow-right"></use>
</svg>
</button> 

<button data-goto="${currPage-1}" class="btn--inline pagination__btn--prev">
<svg class="search__icon">
  <use href="${icons}#icon-arrow-left"></use>
</svg>
<span>Page ${currPage-1}</span>
</button>

`



 }
  
 return ""







// this._parentel.insertAdjacentHTML("beforeend",markup)

  }


}

export default new pagenation()
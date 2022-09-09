import icons from "./img/icons.svg"
export default class view {


    _data

    render(data){
    

// if(!data) return this.renderError()
if (!data || (Array.isArray(data) && data.length === 0))
return this.renderError();


  this._data = data
  console.log(this._data)
  let markup = this._generatemarkup()
  this.clear()
  this._parentel.insertAdjacentHTML("afterbegin",markup)
  
  
    }
  
    update(data){

      this._data = data
 
        let newmarkup = this._generatemarkup()

 let newDom = document.createRange().createContextualFragment(newmarkup)
 let newElements = Array.from(newDom.querySelectorAll("*"))
 let curElements = Array.from(this._parentel.querySelectorAll("*"))
 
 newElements.forEach((newEl, i) => {
  const curEl = curElements[i];
  // console.log(curEl, newEl.isEqualNode(curEl));
  if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ""){
  // console.log('*' , newEl. firstChild.nodeValue.trim());
  curEl.textContent = newEl.textContent;
  }



  if(!newEl.isEqualNode(curEl))
      Array.from(newEl.attributes).forEach(attr=>
      curEl.setAttribute(attr.name, attr.value)
      )
    })
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
  
  renderError(message=this._errorMessage){
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
  renderMessage(message=this.Message){
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
    
  
    clear(){
      this._parentel.innerHTML=""
    }
  

    
}
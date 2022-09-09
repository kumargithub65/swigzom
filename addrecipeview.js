import view from "./view.js";
import icons from "./img/icons.svg"




class pagenation extends view {
 
    _parentel = document.querySelector(".upload")
    Message = "Recipe was succefully added ;>"
    _window = document.querySelector(".add-recipe-window")
   _overlay = document.querySelector(".overlay")
   _btnopen  = document.querySelector(".nav__btn--add-recipe")
   _btnclose  = document.querySelector(".btn--close-modal")

   constructor(){
    super();
    this.addhandlershowWindow()
    this.addhandlerhideWindow()
   }

    toggleWindow(){
   
    this._overlay.classList.toggle("hidden")
    this._window.classList.toggle("hidden")

    


   }


  addhandlershowWindow(){
  
   this._btnopen.addEventListener("click",this.toggleWindow.bind(this))

  }

  addhandlerhideWindow(){
    this._btnclose.addEventListener("click",this.toggleWindow.bind(this))
    this._overlay.addEventListener("click",this.toggleWindow.bind(this))
  }


  addhandlerupload(handle){
    this._parentel.addEventListener("click",function(e){
        e.preventDefault()

        const data = [...new FormData(this)]
        const dataArr = Object.fromEntries(data)  
        handle(dataArr) 

    })
  }
  _generatemarkup(){

  }

}

export default new pagenation()
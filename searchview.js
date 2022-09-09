class searchview  {
    _parentEl = document.querySelector(".search")
   
   
   _clear(){
       return this._parentEl.querySelector(".search__field").value=""  
   }
   
    getquery(){
      let query = this._parentEl.querySelector(".search__field").value
       this._clear()
       return query
    }
    
    addhandler(handle) {
       this._parentEl.addEventListener("submit",function(e){
           e.preventDefault();
           handle()
           
       })
    
    }
   }
   
   export default  new searchview()
   
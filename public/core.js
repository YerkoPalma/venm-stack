//assume that Vue a vue resource are already loaded, to avoid browserify
//late will be replaced with es6 and closure compiler
window.onload = function() {
  /*global Vue*/
  new Vue({
    el: "body",
    ready: function(){
      this.$http.get("/api/todos", function( data ){
        this.todos = data;
      }).bind(this);
    },
    data: {
      todos: [],
      newTodo: {
        text: ""
      }
    },
    methods: {
      addTodo: function(){
        this.$http.post("/api/todos", this.newTodo, function( data ){
          this.todos = data;
          this.newTodo = "";
        }, function(err){
          console.log(JSON.stringify(err, null, 2));
        });
      },
      removeTodo: function(id){
        this.$http.delete("/api/todos/" + id, function( data ){
          this.todos = data;
        });
      }
    }
  });
};

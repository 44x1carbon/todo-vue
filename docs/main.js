
Vue.directive('my-select', function (val) {
  if(val){
    this.el.select();
  }
});

var app = new Vue({
  el: '#app',
  data:{
    newTitle:"",
    filter:{
      done: { done: true },      // 完了のみ
      remaining: { done: false } // 未了のみ
    },
    currentFilter: null,
    editing:null,
    allCount:0,
    doneCount:0,
    remainingCount:0,
    originalTitle:"",
    todos:[
      {
        title:'a',
        done:false
      },
      {
        title:'b',
        done:true
      },
      {
        title:'c',
        done:false
      },
    ],
  },
  methods:{
    addTodo:function(){
      this.todos.push({
        title:this.newTitle,
        done:false
      });
      this.newTitle = "";
    },
    changeFilter:function(filter){
      this.currentFilter = filter;
    },
    todosFilter:function(filter){
      if(filter == undefined){
        return this.todos;
      } else {
        return this.todos.filter(function(todo){
            if(todo.done == filter.done){
              return todo;
            }
        });
      }
    },
    editTodo:function(todo){
      this.editing = todo;
      this.originalTitle = todo.title;
    },
    doneEdit:function(e){
      if(e.code == "Enter" || e.type == 'blur')
        this.editing = null;
      if(e.target.value == "")
        e.target.value = this.originalTitle;
    },
    remove:function(todo){
      this.todos.$remove(todo);
    },
    checkAll:function(){
      var state = !!this.todosFilter(this.filter.remaining).length; // 未了にするのか完了にするのかの判定
      this.todos.forEach(function(todo){
        todo.done = state;
      });
    },
    removeDoneTodo:function(){
      this.todos = this.todosFilter(this.filter.remaining);
    }
  },
  watch:{
    'todos':{
      handler:function(todos){
        this.allCount = this.todos.length;
        this.doneCount = this.todosFilter(this.filter.done).length;
        this.remainingCount = this.allCount - this.doneCount;
      },
      deep:true
    }
  },
  created:function(){
    this.allCount = this.todos.length;
    this.doneCount = this.todosFilter(this.filter.done).length;
    this.remainingCount = this.allCount - this.doneCount;
  }
});

import {Component, OnInit} from '@angular/core'
import {delay} from "rxjs";
import {Todo, TodosServiceService} from "./todos-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todos: Todo[] = []
  todoTitle = ''
  loading = false

  constructor(private service:TodosServiceService) {}

  ngOnInit() {
    this.addFetch()
  }

  addTodo() {
    if (!this.todoTitle.trim()){
      return
    }

    const newTodo:Todo = {
      title: this.todoTitle,
      completed: false
    }

    this.service.addTodo(newTodo)
      .subscribe(todo => {
        this.todos.push(todo)
        this.todoTitle = ''
      })
  }

  addFetch() {
    this.loading = true
    this.service.fetch()
      .subscribe(todos => {
        this.todos = todos
        this.loading = false
      })
  }

  removeTodo(id: any) {
    this.service.removeTodo(id)
      .subscribe( () => {
        this.todos = this.todos.filter(t => t.id !== id)
      })
  }

  completedTodo(id:any) {
    this.service.completedTodo(id).subscribe(todo => {
       // @ts-ignore
      this.todos.find(t => t.id === todo.id).completed = true
    })
  }
}

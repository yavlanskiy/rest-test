import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable} from "rxjs";

export interface Todo {
  completed: boolean
  title: string
  id?: number
}

@Injectable({
  providedIn: 'root'
})
export class TodosServiceService {

  constructor(private http: HttpClient) { }

  addTodo(todo:Todo): Observable<Todo>{
    return this.http.post<Todo>("https://jsonplaceholder.typicode.com/todos",todo);
  }

  fetch():Observable<Todo[]>{
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .pipe(delay(1500))
  }

  removeTodo(id:any):Observable<void>{
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`)
  }
}

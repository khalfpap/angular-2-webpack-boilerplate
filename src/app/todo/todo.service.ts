import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Todo } from './todo';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TodoService {
  private todosUrl = 'app/todo';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: Http
  ) { }

  public getTodos(): Promise<Todo[]> {
    return this.http
      .get(this.todosUrl)
      .toPromise()
      .then(response => response.json().data as Todo[])
      .catch(this.handleError);
  }

  public getTodo(id: number): Promise<Todo> {
    return this.getTodos()
      .then(todos => todos.find(todo => todo.id === id));
  }

  public handleError(error: any): Promise<any> {
    console.error(`An error occurred ${error.message || error}`);
    return Promise.reject(error.message || error);
  }

  public update(todo: Todo): Promise<Todo> {
    let url = `${this.todosUrl}/${todo.id}`;
    return this.http
      .put(
        url,
        JSON.stringify(todo),
        {
          headers: this.headers,
        }
      )
      .toPromise()
      .then(() => todo)
      .catch(this.handleError);
  }

  public create(title: string, completed: boolean = false): Promise<Todo> {
    return this.http
      .post(
        this.todosUrl,
        JSON.stringify({ title, completed }),
        this.headers
      )
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  public delete(todo: Todo): Promise<void> {
    return this.http
      .delete(`${this.todosUrl}/${todo.id}`)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}

import { Component, OnInit } from '@angular/core';

import { Todo } from './todo';
import { TodoService } from './todo.service';

import { defaults, without } from 'lodash';

@Component({
  selector: 'awb-todo',
  styles: [require('./todo.component.sass').toString()],
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
  public createTodoDialogIsVisible: boolean = false;
  public deleteMessage: string;
  public title: string = 'Todo App';
  public todos: Todo[] = [];
  public todoToEdit: Todo = null;
  public todoToDelete: Todo = null;

  constructor(
    private todoService: TodoService
  ) { }

  public showCreateTodoDialog(): void {
    this.createTodoDialogIsVisible = true;
  }

  public hideCreateTodoDialog(): void {
    this.createTodoDialogIsVisible = false;
  }

  public createTodo(title: string): void {
    if (typeof title !== 'string') {
      this.hideCreateTodoDialog();
      return;
    }

    title = title.trim();
    if (title) {
      this.todoService
        .create(title)
        .then(todo => {
          this.todos.push(todo);
          this.hideCreateTodoDialog();
        });
    }
  }

  public showEditDialog(todo: Todo): void {
    this.todoToEdit = todo;
  }

  public hideEditDialog(): void {
    this.todoToEdit = null;
  }

  public editTodoTitle(title: string): void {
    if (typeof title !== 'string') {
      this.hideEditDialog();
      return;
    }

    title = title.trim();
    if (title) {
      this.todoService
        .update(
          defaults({ title }, this.todoToEdit)
        )
        .then(() => {
          this.todoToEdit.title = title;
          this.hideEditDialog();
        });
    }
  }

  public showConfirmDeleteAlert(todo: Todo): void {
    this.deleteMessage = `Delete "${todo.title}"?`;
    this.todoToDelete = todo;
  }

  public hideDeleteTodoAlert(): void {
    this.todoToDelete = null;
    this.deleteMessage = null;
  }

  public confirmDelete(confirmed: boolean): void {
    if (confirmed) {
      this.deleteTodo(this.todoToDelete)
        .then(() => this.hideDeleteTodoAlert());
    } else {
      this.hideDeleteTodoAlert();
    }
  }

  public deleteTodo(todo: Todo): Promise<void> {
    return this.todoService
      .delete(todo)
      .then(() => {
        this.todos = without(this.todos, todo);
      });
  }

  public toggleCompleted(todo: Todo): void {
    let wasCompleted = todo.completed;
    let completed = !wasCompleted;
    todo.completed = completed;
    this.todoService
      .update(
        defaults({ completed }, todo)
      )
      .catch(() => {
        todo.completed = wasCompleted;
      });
  }

  public getTodos(): void {
    this.todoService
      .getTodos()
      .then(todos => this.todos = todos);
  }

  public ngOnInit(): void {
    this.getTodos();
  }
}

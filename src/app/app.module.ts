import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { AlertDialogComponent } from './dialog/alert-dialog.component';
import { InputDialogComponent } from './dialog/input-dialog.component';
import { ReadmeComponent } from './readme/readme.component';
import { TodoComponent } from './todo/todo.component';

import { ReadmeService } from './readme/readme.service';
import { TodoService } from './todo/todo.service';

import { InMemoryTodoService } from './todo/in-memory-todo.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    AlertDialogComponent,
    ReadmeComponent,
    InputDialogComponent,
    TodoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryTodoService),
    MaterialModule.forRoot(),
    routing,
  ],
  providers: [
    ReadmeService,
    TodoService,
  ],
})
export class AppModule { }

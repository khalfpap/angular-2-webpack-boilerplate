import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSnackBarModule,
  MatToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { AlertDialogComponent } from './dialog/alert-dialog.component';
import { InputDialogComponent } from './dialog/input-dialog.component';
import { ReadmeComponent } from './readme/readme.component';
import { TodoComponent } from './todo/todo.component';
import { TrustHtmlPipe } from './pipes/trust-html.pipe';

import { ReadmeService } from './readme/readme.service';
import { TodoService } from './todo/todo.service';

import { InMemoryTodoService } from './todo/in-memory-todo.service';
import { InMemoryWebApiModule, InMemoryBackendConfigArgs } from 'angular-in-memory-web-api';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    AlertDialogComponent,
    ReadmeComponent,
    InputDialogComponent,
    TodoComponent,
    TrustHtmlPipe,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(
      InMemoryTodoService,
      {
        delay: 0,
      } as InMemoryBackendConfigArgs),
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule,
    MatToolbarModule,
    routing,
  ],
  providers: [
    ReadmeService,
    TodoService,
    // configure base href manually instead of using <base href="">
    {
      provide: APP_BASE_HREF,
      useValue: window.AWB_APP_BASE_HREF || '/'
    },
  ],
})
export class AppModule { }

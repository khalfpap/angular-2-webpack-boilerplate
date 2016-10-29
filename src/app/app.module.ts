import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { ReadmeComponent } from './readme/readme.component';

import { ReadmeService } from './readme/readme.service';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ReadmeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing,
  ],
  providers: [
    ReadmeService,
  ],
})
export class AppModule { }

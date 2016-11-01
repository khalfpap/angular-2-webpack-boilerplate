import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReadmeComponent } from './readme/readme.component';
import { TodoComponent } from './todo/todo.component';

const appRoutes: Routes = [
  {
    component: ReadmeComponent,
    path: 'readme',
  },
  {
    component: TodoComponent,
    path: 'todo',
  },
  {
    // unknown page redirects to /readme
    path: '**',
    redirectTo: '/readme',
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

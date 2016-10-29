import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReadmeComponent } from './readme/readme.component';

const appRoutes: Routes = [
  {
    component: ReadmeComponent,
    path: 'readme',
  },
  {
    // unknown page redirects to /readme
    path: '**',
    redirectTo: '/readme',
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

// this is the main entry point into our application
// it bootstraps the Angular application

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { load } from 'webfontloader';

import { AppModule } from './app.module';

if (process.env.ENV === 'production') {
  enableProdMode();
}

const platform = platformBrowserDynamic();

/**
 * Ensure all fonts are loaded to prevent "flash of un-styled text"
 * @param callback
 */
function loadWebFont(callback) {
  load({
    active: callback,
    custom: {
      // all fonts that appear in the app
      families: ['Material Icons', 'Open Sans'],
    },
    inactive: callback,
  });
}

export function bootstrap() {
  loadWebFont(() => platform.bootstrapModule(AppModule));
}

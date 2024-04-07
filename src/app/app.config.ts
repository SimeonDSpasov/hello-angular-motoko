import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling, withComponentInputBinding } from '@angular/router';

import { provideAngularSvgIcon } from 'angular-svg-icon';

import { routes } from './app.routes';

import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient( withInterceptors([ authInterceptor ])),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }), withComponentInputBinding()),

    provideAngularSvgIcon(),
    importProvidersFrom(),
  ],
};

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { ItemsState } from './state/items.state';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(
      NgxsModule.forRoot([ItemsState]),
        NgxsLoggerPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot()
    )
  ],
  
};

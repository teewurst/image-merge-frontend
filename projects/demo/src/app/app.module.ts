import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ImageMergeFrontendModule} from 'projects/image-merge-frontend/src/lib/image-merge-frontend.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      ImageMergeFrontendModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

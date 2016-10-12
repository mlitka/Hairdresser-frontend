import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import {
  routing,
  appRoutingProviders
} from './app.routes';
import { HomeComponent } from './home.component';
@NgModule({
  imports: [
    BrowserModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [
    appRoutingProviders,
    AUTH_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

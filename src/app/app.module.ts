import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  imports: [
    BrowserModule,
    DatepickerModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBL93wp9blDVog7mSuJ3xNaZy65zMXmlZ0'
    })
  ],
  declarations: [
    AppComponent,
    DatepickerComponent,
    InfoPanelComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DatepickerComponent } from './reservation/datepicker/datepicker.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { HourpickerComponent } from './reservation/hourpicker/hourpicker.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ServicepickerComponent } from './reservation/servicepicker/servicepicker.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { FacebookService } from 'ng2-facebook-sdk/dist';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ImageModal } from './image-popup/angular2-image-popup';
import { ImagePopupComponent } from './image-popup/image-popup.component';

@NgModule({
  imports: [
    BrowserModule,
    DatepickerModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBL93wp9blDVog7mSuJ3xNaZy65zMXmlZ0'
    }),
    Ng2PageScrollModule,
  ],
  declarations: [
    AppComponent,
    DatepickerComponent,
    InfoPanelComponent,
    HourpickerComponent,
    ReservationComponent,
    ServicepickerComponent,
    MainPageComponent,
    MainNavComponent,
    ConfirmModalComponent,
    ImageModal,
    ImagePopupComponent
  ],
  providers: [
    FacebookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

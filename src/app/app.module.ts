import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { ScheduleModule } from 'primeng/primeng';
import { RatingModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { MainPageComponent } from './main-page/main-page.component';
import { RatingStarsComponent } from './main-page/rating-stars/rating-stars.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MainFooterComponent } from './main-footer/main-footer.component';

import { AppComponent } from './app.component';
import { DatepickerComponent } from './reservation/datepicker/datepicker.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { HourpickerComponent } from './reservation/hourpicker/hourpicker.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ServicepickerComponent } from './reservation/servicepicker/servicepicker.component';
import { ImageModal } from './image-popup/angular2-image-popup/angular2-image-popup';
import { ImagePopupComponent } from './image-popup/image-popup.component';
import { HairdresserpickerComponent } from './reservation/hairdresserpicker/hairdresserpicker.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ClientPanelComponent } from './client-panel/client-panel.component';
import { EventModalComponent } from './schedule/event-modal/event-modal.component';

import { ConfirmModalComponent } from './reservation/confirm-modal/confirm-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';

import { HairdresserService } from './common/service/hairdresser.service';
import { CookieService } from 'angular2-cookie/core';


@NgModule({
  imports: [
    BrowserModule,
    DatepickerModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBL93wp9blDVog7mSuJ3xNaZy65zMXmlZ0'
    }),
    Ng2PageScrollModule,
    HttpModule,
    ScheduleModule,
    RatingModule,
    ModalModule 
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
    ImagePopupComponent,
    HairdresserpickerComponent,
    ScheduleComponent,
    LoginModalComponent,
    MainFooterComponent,
    ClientPanelComponent,
    RatingStarsComponent,
    EventModalComponent
  ],
  providers: [
    HairdresserService,
    { provide: XSRFStrategy, useValue: new CookieXSRFStrategy('CSRF-TOKEN', 'X-XSRF-TOKEN') },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

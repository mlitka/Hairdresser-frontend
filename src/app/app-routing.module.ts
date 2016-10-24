import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReservationComponent } from './reservation/reservation.component';
import { MainPageComponent } from './main-page/main-page.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: MainPageComponent },
      { path: 'reservation', component: ReservationComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
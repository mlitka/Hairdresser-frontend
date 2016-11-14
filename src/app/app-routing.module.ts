import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReservationComponent } from './reservation/reservation.component';
import { MainPageComponent } from './main-page/main-page.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { ScheduleComponent } from './schedule/schedule.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: MainPageComponent },
      { path: 'reservation', component: ReservationComponent },
      { path: 'schedule', component: ScheduleComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
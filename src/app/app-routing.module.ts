import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthClient, AuthAdmin, AuthHairdresser, AuthHairdresserAdmin } from './common/auth/auth.guard';

import { ReservationComponent } from './reservation/reservation.component';
import { MainPageComponent } from './main-page/main-page.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ClientPanelComponent } from './client-panel/client-panel.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: MainPageComponent },
      { path: 'reservation', component: ReservationComponent },
      { path: 'schedule', component: ScheduleComponent, canActivate: [AuthHairdresserAdmin] },
      { path: 'client-panel', component: ClientPanelComponent, canActivate: [AuthClient] },
      { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthAdmin] },
      { path: '**', redirectTo: '' }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
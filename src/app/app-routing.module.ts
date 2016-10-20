import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { DatepickerComponent }    from './datepicker/datepicker.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: DatepickerComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
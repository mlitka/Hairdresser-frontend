import { Component } from '@angular/core';
import '../../public/css/styles.css';
import { Auth } from '../auth/auth.service';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ Auth ]
})
export class AppComponent { 
  constructor(private auth: Auth) {} ;
}

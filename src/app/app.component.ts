import { Component, OnInit } from '@angular/core';
import '../../public/css/styles.css';
import { HairdresserService } from './common/service/hairdresser.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private hairdresserService: HairdresserService) {

  };

  ngOnInit() {
    // console.log("ON INIT");
    // this.hairdresserService.getToken().subscribe(
    //   result=>console.log(result),
    //   error=>console.error(error)
    // );
  }

}

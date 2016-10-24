import { Component, OnInit } from '@angular/core';
import '../../public/css/styles.css';
import {FacebookService, FacebookLoginResponse, FacebookInitParams, FacebookApiMethod} from 'ng2-facebook-sdk/dist';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [FacebookService]
})
export class AppComponent implements OnInit{ 

  constructor(private fb: FacebookService){
    
  };

  ngOnInit(){
    // let fbParams: FacebookInitParams = {
    //                                appId: '221519038253457',
    //                                xfbml: true,
    //                                version: 'v2.6'
    //                                };
    // this.fb.init(fbParams);
    // let method : FacebookApiMethod = "get";
    // this.fb.api('1667304776858683/photos/uploaded/', method).then(
    //   data=>console.log(data),
    //   error=>console.error(error)
    // );
  }

}

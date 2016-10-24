import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'info-panel',
    templateUrl: './info-panel.component.html',
    styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent{
  title: string = 'My first angular2-google-maps project';
  lat: number = 51.1086959;
  lng: number = 17.036358000000064;
  zoom:number = 16;
 
}

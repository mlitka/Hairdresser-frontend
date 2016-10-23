import { Component } from '@angular/core';

@Component({
    selector: 'reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['reservation.component.scss']
})
export class ReservationComponent {
    public chosenService = false;
    onChosenService(service:any){
        console.log("event");
        console.log("chosen service got in parent: "+ service);
        this.chosenService = true;
    }
}
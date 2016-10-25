import { Component } from '@angular/core';

@Component({
    selector: 'reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['reservation.component.scss']
})
export class ReservationComponent {
    public chosenHairdresser = false;
    public chosenService = false;
    public modalContent = 'Confirm reservation';
    onChosenHairdresser(haidresser:any){
        console.log("event");
        console.log("chosen hairdresser got in parent: "+ haidresser);
        this.chosenHairdresser = true;
    }
    onChosenService(service:any){
        console.log("event");
        console.log("chosen service got in parent: "+ service);
        this.chosenService = true;
    }
}
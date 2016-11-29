import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Event } from '../common/model/event';
import { HairdresserService } from './../common/service/hairdresser.service';


@Component({
    selector: 'event-modal',
    templateUrl: './event-modal.component.html',
    styleUrls: ['event-modal.component.scss']
})
export class EventModalComponent {
    @Input() event: Event;
    @Output() onCancelEvent = new EventEmitter<boolean>();

    cancelReservation = false;
    cancelSuccess = false;
    couldNotCancel = false;

    constructor(private hairdresserService: HairdresserService) { }

    onCancelReservation() {
        console.log(this.event.id);
        this.hairdresserService.cancelVisit(this.event.id)
            .subscribe(
            result => {
                this.cancelReservation = false;
                this.cancelSuccess = true;
                this.onCancelEvent.emit(true)
            },
            error => {
                console.log(error);
                this.couldNotCancel = true;
            });
    }

    onCancel() {
        this.cancelReservation = true;
    }

    onCloseCancel() {
        this.cancelReservation = false;
    }

    public onOpenModal(){
        this.cancelSuccess = false;
        this.cancelReservation = false;
        this.couldNotCancel = false;
    }


}
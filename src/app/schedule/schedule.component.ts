import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
    @ViewChild('eventModal') public eventModal: ModalDirective;
    events: any[];
    aspectRatio = 550;

    headerConfig = {
        left: 'month,agendaWeek,agendaDay,listWeek',
        center: 'title',
        right: 'prev,next today'
    };

    businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        dow: [1, 2, 3, 4, 5] // Monday - Friday

        start: '10:00', // a start time (10am in this example)
        end: '18:00', // an end time (6pm in this example)
    }

    hiddenDays: [0, 6];

    defaultView = "agendaWeek";
    cancelReservation = false;
    cancelSuccess = false;

    event = {
        title: "",
        date: "",
        start: "",
        end: ""
    }

    ngOnInit() {
        console.log("ON INIT");
        this.events = [
            // {
            //     "title": "All Day Event",
            //     "start": "2016-01-01"
            // },
            // {
            //     "title": "Long Event",
            //     "start": "2016-01-07",
            //     "end": "2016-01-10"
            // },
            {
                "title": "Repeating Event",
                "start": "2016-11-18T16:00:00",
                "end": "2016-11-18T17:00:00"
            }
            // {
            //     "title": "Repeating Event",
            //     "start": "2016-11-09T16:00:00"
            // },
            // {
            //     "title": "Conference",
            //     "start": "2016-01-11",
            //     "end": "2016-01-13"
            // }
        ];
    }

    handleEventClick(event: any) {
        console.log(event);
        // this.eventModal.hide()
        this.cancelSuccess = false;
        this.event.title = event.calEvent.title;
        this.event.date = this.prepareDate(new Date(event.calEvent.start));
        this.event.start = this.prepareTime(new Date(event.calEvent.start));
        this.event.end = this.prepareTime(new Date(event.calEvent.end));
    }

    private prepareDate(date: Date): string {
        let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
        return date.getFullYear() + "-" + month + "-" + day;
    }

    private prepareTime(date: Date): string {
        let hour = date.getHours() < 10 ? "0" : "";
        hour = hour + date.getHours();
        let minutes = date.getMinutes() < 10 ? "0" : "";
        minutes = minutes + date.getMinutes();
        return hour + ':' + minutes;
    }

    onCancel(){
        this.cancelReservation = true;
    }

    onCloseCancel(){
        this.cancelReservation = false;
    }

    onCancelReservation(){
        //todo: send request to cancel reservation
        this.cancelReservation = false;
        this.cancelSuccess = true;
    }


}
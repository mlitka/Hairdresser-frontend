import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { HairdresserService } from './../common/service/hairdresser.service';
import { Hairdresser } from './../common/model/hairdresser';
import { Event } from './../common/model/event';
import { Time } from './../common/model/time';

@Component({
    selector: 'schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
    @ViewChild('eventModal') public eventModal: ModalDirective;
    events: any[];
    aspectRatio = 400;

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
    couldNotCancel = false;

    event = {
        id: -1,
        title: "",
        date: "",
        start: "",
        end: "", 
        info:""
    }

    public hairdressers: Hairdresser[] = [
        // {
        //     id: 1,
        //     lastName: 'Fox',
        //     firstName: 'Henry',
        //     img: '',
        //     email: "",
        //     shiftStart: new Time(),
        //     shiftEnd: new Time()
        // },
        // {
        //     id: 2,
        //     lastName: 'Jane',
        //     firstName: 'Mary',
        //     img: '',
        //     email: "",
        //     shiftStart: new Time(),
        //     shiftEnd: new Time()
        // }
    ];

    constructor(private hairdresserService: HairdresserService) { }

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
                "id": 1,
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
        this.getHairdressers();
        this.getVisits();
    }

    handleEventClick(event: any) {
        console.log(event);
        // this.eventModal.hide()
        this.cancelSuccess = false;
        this.cancelReservation = false;
        this.couldNotCancel = false;
        this.event.id = event.calEvent.id;
        this.event.info = event.calEvent.info;
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

    onCancel() {
        this.cancelReservation = true;
    }

    onCloseCancel() {
        this.cancelReservation = false;
    }

    onCancelReservation(event: Event) {
        //todo: send request to cancel reservation
        console.log(event);
        this.hairdresserService.cancelVisit(event.id)
            .subscribe(
            result => {
                this.cancelReservation = false;
                this.cancelSuccess = true;
                this.getVisits();
            },
            error => {
                console.log(error);
                this.couldNotCancel = true;
            });
    }

    onChangeHairdresser(hairdresser: any) {
        console.log("CHANGE");
        console.log(hairdresser);
        if (hairdresser == 'ALL') {
            this.getVisits();
        } else {
            this.hairdresserService.getHairdressersVisits(hairdresser)
                .subscribe(
                visits => {
                    this.setTimes(visits);
                },
                error => console.log(error)
                );
        }
    }

    getHairdressers(): void {
        this.hairdresserService.getHairdressers()
            .subscribe(
            hairdressers => {
                this.hairdressers = hairdressers
            },
            error => console.error(error));
    }

    getVisits(): void {
        this.hairdresserService.getVisits()
            .subscribe(
            visits => {
                this.setTimes(visits);
            },
            error => console.error(error));
    }

    setTimes(visits:any[]){
        this.events = [];
        visits.forEach(visit=>{
            let event = new Event();
            event.id = visit.id;
            event.title = visit.title;
            event.info = visit.info;
            event.start = visit.start.year +"-"+ this.checkLessThan10(visit.start.monthValue)  +"-"+ this.checkLessThan10(visit.start.dayOfMonth)+"T"+this.checkLessThan10(visit.start.hour) +":"+ this.checkLessThan10(visit.start.minute)+":00";
            event.end = visit.end.year +"-" + this.checkLessThan10(visit.end.monthValue) +"-" + this.checkLessThan10(visit.end.dayOfMonth)+"T"+this.checkLessThan10(visit.end.hour) +":"+ this.checkLessThan10(visit.end.minute)+":00";
            this.events.push(event);
        });
    }

    checkLessThan10(num:number):string{
        let newVal = num<10?"0":"";
        return newVal + num;
    }

}
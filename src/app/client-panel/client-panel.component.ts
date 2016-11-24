import { Component, OnInit } from '@angular/core';
import { ClientVisit } from '../common/model/client-visit';
import { Opinion } from '../common/model/opinion';
import { HairdresserService } from './../common/service/hairdresser.service';


@Component({
    selector: 'client-panel',
    templateUrl: './client-panel.component.html',
    styleUrls: ['client-panel.component.scss']
})
export class ClientPanelComponent implements OnInit {

    public upcomingVisits: ClientVisit[];
    public historyVisits: ClientVisit[];
    public opinion = new Opinion();

    public addedOpinion = false;
    public opinionFailure = false;

    cancelReservation = false;
    cancelSuccess = false;
    couldNotCancel = false;
    event: ClientVisit = new ClientVisit();


    public opinions: Opinion[] = [
        {
            author: 'Emma White',
            rate: 5,
            text: 'Best hair salon in the city!',
            dateTime: new Date(),
            userId: 1
        },
        {
            author: 'John Snow',
            rate: 4,
            text: 'I always come back there.',
            dateTime: new Date(),
            userId: 1
        },
        {
            author: 'Jessica Huggs',
            rate: 5,
            text: 'They do coloring perfectly.',
            dateTime: new Date(),
            userId: 1
        },
        {
            author: 'Veronica Grey',
            rate: 5,
            text: 'I will always recommend this salon.',
            dateTime: new Date(),
            userId: 1
        }
    ];

    constructor(private hairdresserService: HairdresserService) { }

    ngOnInit() {
        this.upcomingVisits = [
            {
                id: 1,
                hairdresser: 'Emma Smith',
                service: 'colouring',
                time: '12:00',
                date: '2016-12-12'
            },
            {
                id: 2,
                hairdresser: 'Henry Fox',
                service: 'cutting',
                time: '17:00',
                date: '2016-12-21'
            }
        ];
        this.historyVisits = [
            {
                id: 1,
                hairdresser: 'Emma Smith',
                service: 'colouring',
                time: '12:00',
                date: '2016-12-12'
            },
            {
                id: 2,
                hairdresser: 'Henry Fox',
                service: 'cutting',
                time: '17:00',
                date: '2016-12-21'
            }
        ];

    }

    getUpcoming() {
        console.log("UPCOMING");
        this.hairdresserService.getClientsVisits(this.hairdresserService.auth_user_id)
            .subscribe(
            result => this.upcomingVisits = result,
            err => console.log(err)
            );
    }

    getHistory() {
        console.log("HISTORY");
        this.hairdresserService.getClientsVisits(this.hairdresserService.auth_user_id)
            .subscribe(
            result => this.historyVisits = result,
            err => console.log(err)
            );
    }

    getOpinions() {
        console.log("OPINIONS");
        this.hairdresserService.getClientsOpinions(this.hairdresserService.auth_user_id)
            .subscribe(
            result => this.opinions = result,
            err => console.log(err)
            );
    }

    addOpinion() {
        console.log("Adding opinion");
        console.log(this.opinion);
        //todo:send req
        this.addedOpinion = true;
    }

    clearData() {
        this.opinion = new Opinion();
    }

    handleEventClick(event: any) {
        console.log(event);
        // this.eventModal.hide()
        this.cancelSuccess = false;
        this.cancelReservation = false;
        this.couldNotCancel = false;
        this.event = event;
    }

    onCancel() {
        this.cancelReservation = true;
    }

    onCloseCancel() {
        this.cancelReservation = false;
    }

    onCancelReservation(eventId: number) {
        //todo: send request to cancel reservation
        console.log(eventId);
        this.hairdresserService.cancelVisit(eventId)
            .subscribe(
            result => {
                this.cancelReservation = false;
                this.cancelSuccess = true;
                //todo: getClientsVisits
            },
            error => {
                console.log(error);
                this.couldNotCancel = true;
            });
    }

}
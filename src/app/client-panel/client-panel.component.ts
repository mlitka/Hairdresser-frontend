import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientVisit } from '../common/model/client-visit';
import { Opinion } from '../common/model/opinion';
import { HairdresserService } from './../common/service/hairdresser.service';
import { Ng2TableComponent } from '../ng2-table/ng2-table.component';

@Component({
    selector: 'client-panel',
    templateUrl: './client-panel.component.html',
    styleUrls: ['client-panel.component.scss']
})
export class ClientPanelComponent implements OnInit {

    @ViewChild('ng2-table') ng2Table: Ng2TableComponent;

    cols = [
        { field: 'service', header: 'Service' },
        { field: 'hairdresser', header: 'Hairdresser' },
        { field: 'date', header: 'Date' },
        { field: 'time', header: 'Time' }
    ];


    public upcomingVisits: ClientVisit[] = [
        // {
        //     id: 1,
        //     hairdresser: 'Emma Smith',
        //     service: 'colouring',
        //     time: '12:00',
        //     date: '2016-12-12'
        // },
        // {
        //     id: 2,
        //     hairdresser: 'Henry Fox',
        //     service: 'cutting',
        //     time: '17:00',
        //     date: '2016-12-21'
        // }
    ];
    public historyVisits: ClientVisit[] = [
        // {
        //     id: 1,
        //     hairdresser: 'Emma Smith',
        //     service: 'colouring',
        //     time: '12:00',
        //     date: '2016-12-12'
        // },
        // {
        //     id: 2,
        //     hairdresser: 'Henry Fox',
        //     service: 'cutting',
        //     time: '17:00',
        //     date: '2016-12-21'
        // }
    ];
    public opinion = new Opinion();

    public addedOpinion = false;
    public opinionFailure = false;

    cancelReservation = false;
    cancelSuccess = false;
    couldNotCancel = false;
    event: ClientVisit = new ClientVisit();

    

    public opinions: Opinion[] = [
        // {
        //     author: 'Emma White',
        //     rate: 5,
        //     text: 'Best hair salon in the city!',
        //     dateTime: new Date(),
        //     userId: 1
        // },
        // {
        //     author: 'John Snow',
        //     rate: 4,
        //     text: 'I always come back there.',
        //     dateTime: new Date(),
        //     userId: 1
        // },
        // {
        //     author: 'Jessica Huggs',
        //     rate: 5,
        //     text: 'They do coloring perfectly.',
        //     dateTime: new Date(),
        //     userId: 1
        // },
        // {
        //     author: 'Veronica Grey',
        //     rate: 5,
        //     text: 'I will always recommend this salon.',
        //     dateTime: new Date(),
        //     userId: 1
        // }
    ];

    constructor(private hairdresserService: HairdresserService) { }

    ngOnInit() {
        this.getUpcoming();
    }

    getUpcoming() {
        console.log("UPCOMING");
        this.hairdresserService.getClientsUpcomingVisits()
            .subscribe(
            result => { this.prepareUpVisistsToDisplay(result)},
            err => console.log(err)
            );
    }

    getHistory() {
        console.log("HISTORY");
        this.hairdresserService.getClientsHistoryVisits()
            .subscribe(
            result => {this.prepareHistVisistsToDisplay(result) },
            err => console.log(err)
            );
        // this.ng2Table.onChangeTable(this.ng2Table.config);
    }

    getOpinions() {
        console.log("OPINIONS");
        this.hairdresserService.getClientsOpinions()
            .subscribe(
            result => {
                // this.opinions = result;
                console.log(result);
                this.prepareToDisplay(result);
            },
            err => console.log(err)
            );
    }

    addOpinion() {
        console.log("Adding opinion");
        this.opinion.userId = this.hairdresserService.auth_user_id;
        console.log(this.opinion);
        this.hairdresserService.postAddOpinion(this.opinion)
            .subscribe(
            result => this.addedOpinion = true,
            error => console.log('opinion NOT added')
            );
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
                this.getUpcoming();
            },
            error => {
                console.log(error);
                this.couldNotCancel = true;
            });
    }

    private prepareToDisplay(opinions: any[]) {
        this.opinions = [];
        opinions.forEach(opinion => {
            let op = new Opinion();
            op.text = opinion.text;
            op.rate = opinion.rate;
            op.date = this.prepareDate(opinion.dateTime);
            this.opinions.push(op);
        });
    }

    private prepareUpVisistsToDisplay(visits: any[]) {
        this.upcomingVisits = [];
        visits.forEach(visit => {
            let event = new ClientVisit();
            event.id = visit.id;
            event.service = visit.title;
            event.hairdresser = visit.hairdresser;
            event.date = this.prepareDate(visit.start);
            event.time = this.prepareTime(visit.start);
            this.upcomingVisits.push(event);
        });
    }

    private prepareHistVisistsToDisplay(visits: any[]) {
        this.historyVisits = [];
        visits.forEach(visit => {
            let event = new ClientVisit();
            event.service = visit.title;
            event.hairdresser = visit.hairdresser;
            event.date = this.prepareDate(visit.start);
            event.time = this.prepareTime(visit.start);
            this.historyVisits.push(event);
        });
    }

    private prepareTime(time: any): string {
        return this.checkLessThan10(time.hour) + ":" + this.checkLessThan10(time.minute);
    }

    private prepareDate(dateTime: any): string {
        return dateTime.year + "-" + this.checkLessThan10(dateTime.monthValue) + "-" + this.checkLessThan10(dateTime.dayOfMonth);
    }

    checkLessThan10(num: number): string {
        let newVal = num < 10 ? "0" : "";
        return newVal + num;
    }
}
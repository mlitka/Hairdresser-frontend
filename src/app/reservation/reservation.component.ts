import { Component, OnInit } from '@angular/core';
import { HairdresserService } from './../common/service/hairdresser.service';
import { HairService } from './../common/model/hair-service';
import { Hairdresser } from './../common/model/hairdresser';
import { VisitProposal } from './../common/model/visit-proposal';
import { Visit } from './../common/model/visit';
import { Client } from './../common/model/client';

@Component({
    selector: 'reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['reservation.component.scss']
})
export class ReservationComponent implements OnInit {
    public chosenDate: Date;
    public chosenHairdresser: Hairdresser;
    public chosenService: HairService;
    public chosenHour: string;
    public modalContent = 'Confirm reservation';
    public loggedUser:boolean = false;

    public services: HairService[];
    public hairdressers: Hairdresser[];
    public visits: VisitProposal[];

    private hairdressersIMGs = [
        "../../../public/images/avatars/girl.png",
        "../../../public/images/avatars/male.png",
        "../../../public/images/avatars/girl2.png"
    ];

    constructor(private hairdresserService: HairdresserService) {
    }

    ngOnInit() {
        this.getHairdressers();
    }

    onChosenHairdresser(haidresser: any) {
        console.log("event");
        console.log("chosen hairdresser got in parent: " + haidresser);
        this.getServices();
        this.chosenHairdresser = haidresser;
    }
    onChosenService(service: any) {
        console.log("event");
        console.log("chosen service got in parent: " + service);
        this.chosenService = service;
        this.getVisitProposals();
    }

    onChosenDate(date: Date) {
        console.log("event");
        console.log("chosen date got in parent: " + this.prepareDate(date));
        this.chosenDate = date;
    }

    onChosenHour(hour: string) {
        console.log("event");
        console.log("chosen hour got in parent: " + hour);
        this.chosenHour = hour;
    }

    onModalConfirm(client:Client){
        // TODO: send POST to reserve a visit!
        console.info("SUBMITTED CLIENT: \n"
            + client.lastName + "\n"
            + client.firstName + "\n"
            + client.email + "\n"
            + client.phoneNo + "\n");
    }

    getServices(): void {
        this.hairdresserService.getHairServices()
            .subscribe(
            services => this.services = services,
            error => console.error(error));
    }

    getHairdressers(): void {
        this.hairdresserService.getHairdressers()
            .subscribe(
            hairdressers => {
                this.hairdressers = hairdressers;
                this.setHairdresserPhotos();
            },
            error => console.error(error));
    }

    getVisitProposals(): void {
        this.hairdresserService.getVisitProposals(this.chosenHairdresser.id, this.chosenService.id, this.prepareDate(this.chosenDate))
            .subscribe(
            visits => {
                this.visits = visits;
                // console.log(this.visits);
            },
            error => console.error(error));
    }

    onReserveClick(): void {
        if (this.chosenDate && this.chosenService && this.chosenHairdresser && this.chosenHour) {
            console.log("OK");
            console.log(this.prepareDate(this.chosenDate) + " " + this.chosenHairdresser.lastName + " " + this.chosenService.name + " " + this.chosenHour);
            this.modalContent = "You are about to confirm reservation on "
                + this.chosenService.name + " service to "
                + this.chosenHairdresser.lastName + " "
                + this.chosenHairdresser.firstName + " on "
                + this.prepareDate(this.chosenDate) + " at "
                + this.chosenHour;
            let visit = new Visit();
            visit.date = this.prepareDate(this.chosenDate);
            visit.hairdresserId = this.chosenHairdresser.id;
            visit.serviceId = this.chosenService.id;
            visit.time = this.chosenHour;
            // this.hairdresserService.postReserveVisit(visit);
        } else {
            console.log("missing data");
        }
    }

    private setHairdresserPhotos(): void {
        let index = 0;
        this.hairdressers.forEach(hairdresser => {
            if (index == this.hairdressers.length) {
                index = 0;
            }
            hairdresser.img = this.hairdressersIMGs[index];
            index++;
        });
    }

    private prepareDate(date: Date): string {
        let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
        return date.getFullYear() + "-" + month + "-" + day;
    }
}
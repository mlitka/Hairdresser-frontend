import { Component, OnInit } from '@angular/core';
import { HairdresserService } from './../common/service/hairdresser.service';
import { HairService } from './../common/model/hair-service';
import { Hairdresser } from './../common/model/hairdresser';
import { VisitProposal } from './../common/model/visit-proposal';

@Component({
    selector: 'reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['reservation.component.scss']
})
export class ReservationComponent implements OnInit {
    public chosenHairdresser = false;
    public chosenService = false;
    public modalContent = 'Confirm reservation';

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
        this.chosenHairdresser = true;
    }
    onChosenService(service: any) {
        console.log("event");
        console.log("chosen service got in parent: " + service);
        this.getVisitProposals()
        this.chosenService = true;
    }

    onChosenDate(date: Date) {
        console.log("event");
        console.log("chosen date got in parent: " + this.prepareDate(date));

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
        this.hairdresserService.getVisitProposals()
            .subscribe(
            visits => {
                this.visits = visits;
                // console.log(this.visits);
            },
            error => console.error(error));
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
        // console.log(this.hairdressers);
    }

    private prepareDate(date:Date):string{
        let day = date.getDate()<10?"0"+date.getDate():date.getDate();
        let month = date.getMonth()<10?"0"+date.getMonth():date.getMonth();
        return date.getFullYear() + "-" + month + "-" + day;
    }
}
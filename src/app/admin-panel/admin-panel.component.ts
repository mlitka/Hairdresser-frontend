import { Component, OnInit } from '@angular/core';
import { Hairdresser } from '../common/model/hairdresser';
import { HairService } from '../common/model/hair-service';
import { Opinion } from '../common/model/opinion';
import { HairdresserService } from './../common/service/hairdresser.service';

@Component({
    selector: 'admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

    public hairdresser: string;
    public success = false;
    public addedHairdresser = false;
    public userExists = false;
    // public shiftStart: Date = new Date("8:00");
    // public shiftEnd: Date=new Date("18:00");

    public hairService: HairService = new HairService();
    public addedService = false;
    public serviceFailure = false;

    public hstep: number = 1;
    public mstep: number = 15;
    public ismeridian: boolean = true;
    public isEnabled: boolean = true;


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

    public hairdressers: Hairdresser[] = [
        {
            id: 1,
            lastName: 'Fox',
            firstName: 'Henry',
            img: '',
            email: "",
            shiftStart: '',
            shiftEnd: ''
        },
        {
            id: 2,
            lastName: 'Jane',
            firstName: 'Mary',
            img: '',
            email: "",
            shiftStart: '',
            shiftEnd: ''
        }
    ];

    public services: HairService[] = [
        {
            id: 1,
            name: "cutting",
            duration: 30,
            priceRange: "50-100 PLN",
            hidden: false
        },
        {
            id: 2,
            name: "men cutting",
            duration: 60,
            priceRange: "40-50 PLN",
            hidden: false
        },
        {
            id: 3,
            name: "coloring+cutting",
            duration: 120,
            priceRange: "150-200 PLN",
            hidden: false
        },
        {
            id: 4,
            name: "modeling",
            duration: 60,
            priceRange: "100 PLN",
            hidden: false
        }
    ];

    constructor(private hairdresserService: HairdresserService) { }

    ngOnInit() {
        this.getHairdressers();
        // this.getServices();
    }

    checkEmail() {
        //todo send request to check if user exists
        this.hairdresserService.getCheckUser(this.hairdresser)
            .subscribe(
            result => this.userExists = true,
            error => this.userExists = false
            );

    }

    onAddHairdresser() {
        // this.hairdresser.shiftStart = this.prepareTime(this.shiftStart);
        // this.hairdresser.shiftEnd = this.prepareTime(this.shiftEnd);
        this.hairdresserService.postAddService(this.hairService)
            .subscribe(
            result => {
                this.addedHairdresser = true;
                this.success = true;
            },
            error => this.addedHairdresser = true
            );

    }

    openingModal() {
        this.success = false;
        this.addedHairdresser = false;
        this.userExists = false;
        this.hairdresser = "";
    }

    getOpinions() {
        this.hairdresserService.getOpinions()
            .subscribe(
            opinions => this.opinions = opinions,
            error => { }
            );
    }

    getHairdressers() {
        this.hairdresserService.getHairdressers()
            .subscribe(
            hairdressers => this.hairdressers = hairdressers,
            error => { }
            );
    }

    getServices() {
        this.hairdresserService.getAuthHairServices()
            .subscribe(
            services => this.services = services,
            error => { }
            );
    }

    showOrHideService(service: HairService) {
        console.log(service);
        if (service.hidden) {
            this.hairdresserService.postShowService(service.id)
                .subscribe(
                result => {
                    console.log("showed");
                },
                error => {
                    console.log("couldnt show");
                }
                );
        } else {
            this.hairdresserService.postHideService(service.id)
                .subscribe(
                result => {
                    console.log("hide");
                },
                error => {
                    console.log("couldnt hide");
                }
                );
        }
    }

    openServiceModal() {
        console.log("openingModal");
        this.hairService = new HairService();
    }

    addService() {
        this.hairdresserService.postShowService(this.hairService.id)
            .subscribe(
            result => {
                this.addedService = true;
            },
            error => {
                this.serviceFailure = true;
            }
            );
        // console.log(this.hairService);
        // this.addedService = true;
    }

    private prepareTime(date: Date): string {
        let hour = date.getHours() < 10 ? "0" : ""
        hour = hour + date.getHours();
        let mins = date.getMinutes() < 10 ? "0" : "";
        mins = mins + date.getMinutes();
        return hour + ":" + mins;
    }
}
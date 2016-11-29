import { Component, OnInit } from '@angular/core';
import { Hairdresser } from '../common/model/hairdresser';
import { HairService } from '../common/model/hair-service';
import { Opinion } from '../common/model/opinion';
import { Time } from '../common/model/time';
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

    public opinionsToDisplay: Opinion[] = [];

    cols = [
        { field: 'lastName', header: 'Last name' },
        { field: 'firstName', header: 'First name' },
        { field: 'email', header: 'Email' },
        { field: 'shiftStart', header: 'Shift start' },
        { field: 'shiftEnd', header: 'Shift end' }
    ];

    cols_services = [
        { field: 'name', header: 'Name' },
        { field: 'duration', header: 'Duration (minutes)' },
        { field: 'priceRange', header: 'Price range' },
        { field: 'hidden', header: 'Hidden' },
    ];

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

    public services: HairService[] = [
        // {
        //     id: 1,
        //     name: "cutting",
        //     duration: 30,
        //     priceRange: "50-100 PLN",
        //     hidden: false
        // },
        // {
        //     id: 2,
        //     name: "men cutting",
        //     duration: 60,
        //     priceRange: "40-50 PLN",
        //     hidden: false
        // },
        // {
        //     id: 3,
        //     name: "coloring+cutting",
        //     duration: 120,
        //     priceRange: "150-200 PLN",
        //     hidden: false
        // },
        // {
        //     id: 4,
        //     name: "modeling",
        //     duration: 60,
        //     priceRange: "100 PLN",
        //     hidden: false
        // }
    ];

    constructor(private hairdresserService: HairdresserService) { }

    ngOnInit() {
        this.getHairdressers();
        this.getServices();
        this.getOpinions();
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
        this.hairdresserService.postUpgradeHairdresser(this.hairdresser)
            .subscribe(
            result => {
                this.addedHairdresser = true;
                this.success = true;
                this.getHairdressers();
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
            opinions => this.prepareOpinionsToDisplay(opinions),
            error => { }
            );
    }

    getHairdressers() {
        this.hairdresserService.getHairdressers()
            .subscribe(
            hairdressers => {
                this.prepareHairdressersToDisplay(hairdressers);
            },
            error => { }
            );
    }

    getServices() {
        this.hairdresserService.getAuthHairServices()
            .subscribe(
            result => {
                this.services = result;
                console.log(this.services);
            },
            error => { }
            );
    }

    showOrHideService(service: any) {
        console.log(service.data);
        if (service.data.hidden) {
            this.hairdresserService.postShowService(service.data.id)
                .subscribe(
                result => {
                    console.log("showed");
                    this.getServices();
                },
                error => {
                    console.log("couldnt show");
                }
                );
        } else {
            this.hairdresserService.postHideService(service.data.id)
                .subscribe(
                result => {
                    console.log("hide");
                    this.getServices();
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
        this.addedService = false;
    }

    addService() {
        this.hairdresserService.postAddService(this.hairService)
            .subscribe(
            result => {
                this.addedService = true;
                this.getServices();
            },
            error => {
                this.serviceFailure = true;
            }
            );
    }

    private prepareHairdressersToDisplay(hairdressers: any[]) {
        this.hairdressers = [];
        hairdressers.forEach(hairdresser => {
            let hair = new Hairdresser();
            hair.email = hairdresser.email;
            hair.lastName = hairdresser.lastName;
            hair.firstName = hairdresser.firstName;
            hair.shiftStart = this.setTimeDatatable(hairdresser.shiftStart);
            hair.shiftEnd = this.setTimeDatatable(hairdresser.shiftEnd);
            this.hairdressers.push(hair);
        });
    }

    private prepareTime(time: Time): string {
        return this.checkLessThan10(time.hour) + ":" + this.checkLessThan10(time.minute) + ":00";
    }

    private setTimeDatatable(time: Time): string {
        return this.checkLessThan10(time.hour) + ":00";
    }


    private prepareOpinionsToDisplay(opinions: any[]) {
        this.opinions = [];
        opinions.forEach(opinion => {
            let op = new Opinion();
            op.text = opinion.text;
            op.rate = opinion.rate;
            op.date = this.prepareOpinionDate(opinion);
            this.opinions.push(op);
        });
    }

    private prepareOpinionDate(opinion: any): string {
        return opinion.dateTime.year + "-" + this.checkLessThan10(opinion.dateTime.monthValue) + "-" + this.checkLessThan10(opinion.dateTime.dayOfMonth);
    }

    checkLessThan10(num: number): string {
        let newVal = num < 10 ? "0" : "";
        return newVal + num;
    }
}
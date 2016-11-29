import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HairdresserService } from './../common/service/hairdresser.service';
import { HairService } from './../common/model/hair-service';
import { Hairdresser } from './../common/model/hairdresser';
import { VisitProposal } from './../common/model/visit-proposal';
import { Visit } from './../common/model/visit';
import { User } from './../common/model/user';
import { Time } from './../common/model/time';

@Component({
    selector: 'reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['reservation.component.scss']
})
export class ReservationComponent implements OnInit {
    public chosenDate: Date = new Date();
    public chosenHairdresser: Hairdresser;
    public chosenService: HairService;
    public chosenHour: string;
    public modalContent = 'Confirm reservation';
    public reservationEnabled = false;
    public authenticated: boolean = true;
    public chosenDateInChild: boolean = false;
    public noAvailableHours: boolean = false;
    public reservationFail: boolean = false;
    user: User;
    visit: Visit;

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

    public visits: VisitProposal[] = [
        // {
        //     date: this.prepareDate(this.chosenDate),
        //     time: '11:00',
        //     endTime: ''
        // },
        // {
        //     date: this.prepareDate(this.chosenDate),
        //     time: '12:00',
        //     endTime: ''
        // },
        // {
        //     date: this.prepareDate(this.chosenDate),
        //     time: '13:00',
        //     endTime: ''
        // },
        // {
        //     date: this.prepareDate(this.chosenDate),
        //     time: '14:00',
        //     endTime: ''
        // },
        // {
        //     date: this.prepareDate(this.chosenDate),
        //     time: '15:00',
        //     endTime: ''
        // },
        // {
        //     date: this.prepareDate(this.chosenDate),
        //     time: '15:00',
        //     endTime: ''
        // },
        // {
        //     date: this.prepareDate(this.chosenDate),
        //     time: '15:00',
        //     endTime: ''
        // },
        // {
        //     date: this.prepareDate(this.chosenDate),
        //     time: '15:00',
        //     endTime: ''
        // },
    ];

    private hairdressersIMGs = [
        "../../../public/images/avatars/girl.png",
        "../../../public/images/avatars/male.png",
        "../../../public/images/avatars/girl2.png"
    ];

    constructor(private hairdresserService: HairdresserService, private router: Router) {
    }

    ngOnInit() {
        // this.authenticated = Boolean(window.localStorage.getItem("authenticated"));
        this.getServices();
        this.getHairdressers();
        this.setHairdresserPhotos();
    }

    onChosenHairdresser(haidresser: any) {
        console.log("event");
        console.log("chosen hairdresser got in parent: " + haidresser);
        this.getServices();
        this.chosenHairdresser = haidresser;
        this.getVisitProposals();
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
        this.chosenDateInChild = true;
        this.chosenDate = date;
        this.getVisitProposals();
    }

    onChosenHour(hour: string) {
        console.log("event");
        console.log("chosen hour got in parent: " + hour);
        this.chosenHour = hour;
        this.getVisitProposals();
    }

    onModalConfirm(user: User) {
        console.info("SUBMITTED CLIENT: \n"
            + user.lastName + "\n"
            + user.firstName + "\n"
            + user.email + "\n"
            + user.phoneNo + "\n");
        this.visit.client = user;
        this.hairdresserService.postReserveVisit(this.visit).subscribe(
            result => {
                this.router.navigate(['/']);
                // this.reservationFail = false;
            },
            err => this.reservationFail = true
        );
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
        console.log("gettong props");
        if (this.chosenDate && this.chosenService && this.chosenHairdresser) {
            console.log("inside");

            this.hairdresserService.getVisitProposals(this.chosenHairdresser.id, this.chosenService.id, this.prepareDate(this.chosenDate))
                .subscribe(
                visits => {
                    this.visits = visits;
                    this.noAvailableHours = false;
                    this.reservationFail = false;
                    // console.log(this.visits);
                },
                error => {
                    this.visits = [];
                    this.noAvailableHours = true;
                });
        }
    }

    onReserveClick(): void {
        if (this.chosenDate && this.chosenService && this.chosenHairdresser && this.chosenHour) {
            this.reservationEnabled = true;
            this.reservationFail = false;
            console.log("OK");
            console.log(this.prepareDate(this.chosenDate) + " " + this.chosenHairdresser.lastName + " " + this.chosenService.name + " " + this.chosenHour);
            this.modalContent = "You are about to confirm reservation on \n"
                + this.chosenService.name + "\n to"
                + this.chosenHairdresser.firstName + " "
                + this.chosenHairdresser.lastName + "\non\n"
                + this.prepareDate(this.chosenDate) + " at "
                + this.chosenHour;
            this.modalContent = this.modalContent.replace(/\n/g, "<br />");
            this.visit = new Visit();
            this.visit.date = this.prepareDate(this.chosenDate);
            this.visit.hairdresserId = this.chosenHairdresser.id;
            this.visit.hairServiceId = this.chosenService.id;
            this.visit.time = this.chosenHour;
            console.log("VISIT");
            console.log(this.visit);
            this.user = new User();

        } else {
            console.log("missing data");
            this.reservationEnabled = false;
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
        let month = date.getMonth() + 1;
        return date.getFullYear() + "-" + month + "-" + day;
    }
}
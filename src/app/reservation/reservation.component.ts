import { Component, OnInit } from '@angular/core';
import { HairdresserService } from './../common/service/hairdresser.service';
import { HairService } from './../common/model/hair-service';
import { Hairdresser } from './../common/model/hairdresser';
import { VisitProposal } from './../common/model/visit-proposal';
import { Visit } from './../common/model/visit';
import { User } from './../common/model/user';

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

    public services: HairService[] = [
        {
            id: 1,
            name: "cutting",
            duration: 30,
            priceRange: "50-100 PLN",
            hidden:false
        },
        {
            id: 2,
            name: "men cutting",
            duration: 60,
            priceRange: "40-50 PLN",
            hidden:false
        },
        {
            id: 3,
            name: "coloring+cutting",
            duration: 120,
            priceRange: "150-200 PLN",
            hidden:false
        },
        {
            id: 4,
            name: "modeling",
            duration: 60,
            priceRange: "100 PLN",
            hidden:false
        }
    ];
    public hairdressers: Hairdresser[] = [
        {
            id: 1,
            lastName: 'Fox',
            firstName: 'Henry',
            img: '',
            email:"",
            shiftStart:'',
            shiftEnd:''
        },
        {
            id: 2,
            lastName: 'Jane',
            firstName: 'Mary',
            img: '',
            email:"",
            shiftStart:'',
            shiftEnd:''
        }
    ];
    public visits: VisitProposal[] = [
        {
            date: this.prepareDate(this.chosenDate),
            time: '11:00',
            endTime: ''
        },
        {
            date: this.prepareDate(this.chosenDate),
            time: '12:00',
            endTime: ''
        },
        {
            date: this.prepareDate(this.chosenDate),
            time: '13:00',
            endTime: ''
        },
        {
            date: this.prepareDate(this.chosenDate),
            time: '14:00',
            endTime: ''
        },
        {
            date: this.prepareDate(this.chosenDate),
            time: '15:00',
            endTime: ''
        },
        {
            date: this.prepareDate(this.chosenDate),
            time: '15:00',
            endTime: ''
        },
        {
            date: this.prepareDate(this.chosenDate),
            time: '15:00',
            endTime: ''
        },
        {
            date: this.prepareDate(this.chosenDate),
            time: '15:00',
            endTime: ''
        },
    ];

    private hairdressersIMGs = [
        "../../../public/images/avatars/girl.png",
        "../../../public/images/avatars/male.png",
        "../../../public/images/avatars/girl2.png"
    ];

    constructor(private hairdresserService: HairdresserService) {
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
        // TODO: send POST to reserve a visit!
        console.info("SUBMITTED CLIENT: \n"
            + user.lastName + "\n"
            + user.firstName + "\n"
            + user.email + "\n"
            + user.phoneNo + "\n");
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
        if (this.chosenDate && this.chosenService && this.chosenHairdresser && this.chosenHour) {
            this.hairdresserService.getVisitProposals(this.chosenHairdresser.id, this.chosenService.id, this.prepareDate(this.chosenDate))
                .subscribe(
                visits => {
                    this.visits = visits;
                    // console.log(this.visits);
                },
                error => console.error(error));
        }
    }

    onReserveClick(): void {
        if (this.chosenDate && this.chosenService && this.chosenHairdresser && this.chosenHour) {
            this.reservationEnabled = true;
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
        let month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
        return date.getFullYear() + "-" + month + "-" + day;
    }
}
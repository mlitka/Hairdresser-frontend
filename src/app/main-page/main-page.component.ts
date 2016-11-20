import { Component, OnInit } from '@angular/core';
import { Opinion } from '../common/model/opinion';
import { HairService } from '../common/model/hair-service';
import { HairdresserService } from './../common/service/hairdresser.service';

@Component({
    selector: 'main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
    public opinions: Opinion[] = [
            {
                author: 'Emma White',
                rate: 5,
                text: 'Best hair salon in the city!'
            },
            {
                author: 'John Snow',
                rate: 4,
                text: 'I always come back there.'
            },
            {
                author: 'Jessica Huggs',
                rate: 5,
                text: 'They do coloring perfectly.'
            },
            {
                author: 'Veronica Grey',
                rate: 5,
                text: 'I will always recommend this salon.'
            }
        ];
    public services: HairService[] = [
            {
                id: 1,
                name: "cutting",
                duration: 30,
                priceRange: "50-100 PLN"
            },
            {
                id: 2,
                name: "men cutting",
                duration: 60,
                priceRange: "40-50 PLN"
            },
            {
                id: 3,
                name: "coloring+cutting",
                duration: 120,
                priceRange: "150-200 PLN"
            },
            {
                id: 4,
                name: "modeling",
                duration: 60,
                priceRange: "100 PLN"
            }
        ];
    private opinionsCount = 4;

    constructor(private hairdresserService: HairdresserService) { }

    ngOnInit() {
        this.getServices();
        this.getOpinions();
    }
    changeAciveNav(href: string) {
        window.localStorage.setItem("activeLink", href);
    }

    getServices() {
        this.hairdresserService.getHairServices()
            .subscribe(
            services => this.services = services,
            error => {}
            );
    }

    getOpinions() {
        this.hairdresserService.getOpinionsCount(this.opinionsCount)
            .subscribe(
            opinions => this.opinions = opinions,
            error => {}
            );
    }
}
import { Component, OnInit } from '@angular/core';
import {Opinion} from '../common/model/opinion';
import {HairService} from '../common/model/hair-service';

@Component({
    selector: 'main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
    public opinions:Opinion[];
    public services:HairService[];

    ngOnInit(){
        this.opinions = [
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
            },
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
        ]
        this.services = [
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
    }
    changeAciveNav(href:string){
        window.localStorage.setItem("activeLink", href);
    }
}
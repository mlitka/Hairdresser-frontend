import { Component, OnInit } from '@angular/core';
import { ClientVisit } from '../common/model/client-visit';
import { Opinion } from '../common/model/opinion';

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
    public opinions: Opinion[] = [
        {
            author: 'Emma White',
            rate: 5,
            text: 'Best hair salon in the city!',
            date: "2016-11-20"
        },
        {
            author: 'John Snow',
            rate: 4,
            text: 'I always come back there.',
            date: "2016-11-20"
        },
        {
            author: 'Jessica Huggs',
            rate: 5,
            text: 'They do coloring perfectly.',
            date: "2016-11-20"
        },
        {
            author: 'Veronica Grey',
            rate: 5,
            text: 'I will always recommend this salon.',
            date: "2016-11-20"
        }
    ];


    ngOnInit() {
        this.upcomingVisits = [
            {
                hairdresser: 'Emma Smith',
                service: 'colouring',
                time: '12:00',
                date: '2016-12-12'
            },
            {
                hairdresser: 'Henry Fox',
                service: 'cutting',
                time: '17:00',
                date: '2016-12-21'
            }
        ];
        this.historyVisits = [
            {
                hairdresser: 'Emma Smith',
                service: 'colouring',
                time: '12:00',
                date: '2016-12-12'
            },
            {
                hairdresser: 'Henry Fox',
                service: 'cutting',
                time: '17:00',
                date: '2016-12-21'
            }
        ];
    }

    getUpcoming() {
        console.log("UPCOMING");
        //todo:send req
    }

    getHistory() {
        console.log("HISTORY");
        //todo:send req
        
    }

    getOpinions() {
        console.log("OPINIONS");
        //todo:send req
        
    }

    addOpinion(){
        console.log("Adding opinion");
        console.log(this.opinion);  
        //todo:send req
        this.addedOpinion = true;        
    }

    clearData(){
        this.opinion = new Opinion();
    }
}
import { Component, OnInit } from '@angular/core';
import { ClientVisit } from '../common/model/client-visit';

@Component({
    selector: 'client-panel',
    templateUrl: './client-panel.component.html',
    styleUrls: ['client-panel.component.scss']
})
export class ClientPanelComponent {

    public clientVisits: ClientVisit[];

    ngOnInit() {
        this.clientVisits = [
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
}
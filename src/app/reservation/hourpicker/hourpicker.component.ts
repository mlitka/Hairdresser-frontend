import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VisitProposal } from '../../common/model/visit-proposal';

@Component({
    selector: 'my-hourpicker',
    templateUrl: './hourpicker.component.html',
    styleUrls: ['hourpicker.component.scss']
})
export class HourpickerComponent {
    @Input("visits") visits: VisitProposal[] = [];
    @Output() onChosenHour = new EventEmitter<string>();
    private selectedHour: VisitProposal;
    
    chosenHour(hour: VisitProposal) {
        console.log(hour);
        this.selectedHour = hour;
        this.onChosenHour.emit(hour.time);
    }

    public isHourChosen(hour: VisitProposal): boolean {
        if (hour != undefined && this.selectedHour != undefined) {
            return hour.time === this.selectedHour.time;
        }
        return false;
    }
}
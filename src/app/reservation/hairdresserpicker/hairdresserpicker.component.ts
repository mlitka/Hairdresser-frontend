import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Hairdresser } from '../../common/model/hairdresser';

@Component({
    selector: 'my-hairdresserpicker',
    templateUrl: './hairdresserpicker.component.html',
    styleUrls: ['hairdresserpicker.component.scss']
})
export class HairdresserpickerComponent {
    @Output() onChosenHairdresser = new EventEmitter<string>();
    @Input("hairdressers") hairdressers: Hairdresser[];
    public selectedHairdresser: Hairdresser;

    chosenHairdresser(hairdresser: Hairdresser) {
        console.log(hairdresser);
        this.selectedHairdresser = hairdresser;
        this.onChosenHairdresser.emit(hairdresser.lastName);
    }

    isHairdresserChosen(hairdresser: Hairdresser): boolean {
        if (hairdresser != undefined && this.selectedHairdresser != undefined) {
            return hairdresser.id === this.selectedHairdresser.id;
        }
        return false;
    }
}
import { Component } from '@angular/core';

@Component({
    selector: 'my-hourpicker',
    templateUrl: './hourpicker.component.html',
    styleUrls: ['hourpicker.component.scss']
})
export class HourpickerComponent {
    public hours = [
        { time: "15:00" },
        { time: "16:00" },
        { time: "17:00" },
        { time: "18:00" }
    ]
}
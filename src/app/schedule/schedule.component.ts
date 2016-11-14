import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
    events: any[];
    aspectRatio = "2";

    headerConfig = {
        left: 'month,agendaWeek,agendaDay,listWeek',
        center: 'title',
        right: 'prev,next today'
    };

    businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        dow: [1, 2, 3, 4, 5] // Monday - Friday

        start: '10:00', // a start time (10am in this example)
        end: '18:00', // an end time (6pm in this example)
    }

    defaultView = "agendaWeek";

    ngOnInit() {
        this.events = [
            {
                "title": "All Day Event",
                "start": "2016-01-01"
            },
            {
                "title": "Long Event",
                "start": "2016-01-07",
                "end": "2016-01-10"
            },
            {
                "title": "Repeating Event",
                "start": "2016-01-09T16:00:00"
            },
            {
                "title": "Repeating Event",
                "start": "2016-11-09T16:00:00"
            },
            {
                "title": "Conference",
                "start": "2016-01-11",
                "end": "2016-01-13"
            }
        ];
    }
}
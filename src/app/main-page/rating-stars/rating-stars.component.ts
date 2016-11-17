import { Component, Input } from '@angular/core';

@Component({
    selector: 'rating-stars',
    templateUrl: './rating-stars.component.html',
    styleUrls: ['./rating-stars.component.scss']
})
export class RatingStarsComponent {
    public max = 5;
    @Input('rate') rate = 3;
}
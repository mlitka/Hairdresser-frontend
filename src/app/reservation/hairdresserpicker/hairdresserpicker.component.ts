import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'my-hairdresserpicker',
    templateUrl: './hairdresserpicker.component.html',
    styleUrls: ['hairdresserpicker.component.scss']
})
export class HairdresserpickerComponent {
    @Output() onChosenHairdresser = new EventEmitter<string>();
    public hairdressers = [
        { name: "name1" , img: "../../../public/images/avatars/girl.png"},
        { name: "name2" , img: "../../../public/images/avatars/male.png"},
        { name: "name3" , img: "../../../public/images/avatars/girl2.png"}
    ];
     chosenHairdresser(hairdresser:any){
        console.log(hairdresser);
        this.onChosenHairdresser.emit(hairdresser.name);
    }
}
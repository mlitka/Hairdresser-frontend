import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'my-servicepicker',
    templateUrl: './servicepicker.component.html',
    styleUrls: ['servicepicker.component.scss']
})
export class ServicepickerComponent {
    @Output() onChosenService = new EventEmitter<string>();
    public services = [
        { name: "service1" },
        { name: "service2" },
        { name: "service3" }
    ]
    chosenService(service:any){
        console.log(service);
        this.onChosenService.emit(service.name);
    }
}
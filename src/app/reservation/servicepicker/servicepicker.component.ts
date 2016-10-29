import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { HairService } from '../../common/model/hair-service';

@Component({
    selector: 'my-servicepicker',
    templateUrl: './servicepicker.component.html',
    styleUrls: ['servicepicker.component.scss']
})
export class ServicepickerComponent {
    @Output() onChosenService = new EventEmitter<string>();
    @Input("services") services: HairService[];
    private selectedService: HairService;

    chosenService(service: HairService) {
        console.log(service);
        this.selectedService = service;
        this.onChosenService.emit(service.name);
    }

    isServiceChosen(service: HairService): boolean {
        if (service != undefined && this.selectedService != undefined) {
            return service.id === this.selectedService.id;
        }
        return false;
    }
}
import { Component, Input } from '@angular/core';

@Component({
    selector: 'confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['confirm-modal.component.scss']
})
export class ConfirmModalComponent { 
    @Input() modalContent:string;
}
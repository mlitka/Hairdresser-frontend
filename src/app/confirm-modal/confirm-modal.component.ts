import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Client } from '../common/model/client';

@Component({
    selector: 'confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['confirm-modal.component.scss']
})
export class ConfirmModalComponent {
    @Input() modalContent: string;
    @Input() loggedUser: boolean;
    @Output() onConfirm = new EventEmitter<Client>();

    public model = new Client();

    onConfirmClick() {
        this.onConfirm.emit(this.model);
    }

}
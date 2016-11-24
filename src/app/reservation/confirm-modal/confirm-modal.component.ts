import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../common/model/user';
import { Hairdresser } from '../../common/model/hairdresser';
import { HairService } from '../../common/model/hair-service';

@Component({
    selector: 'confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
    @Input() chosenService: HairService;
    @Input() chosenHairdresser: Hairdresser;
    @Input() chosenDate: string;
    @Input() chosenTime: string;
    @Input() authenticated: boolean;
    @Input() reservationEnabled: boolean;
    @Output() onConfirm = new EventEmitter<User>();

    public model = new User();
    public diffClient = false;
    public a_change_form_text:string;
    
    ngOnInit(){
        this.set_a_change_form_text();
    }

    onConfirmClick() {
        this.onConfirm.emit(this.model);
    }

    onChangeForm(){
        this.diffClient = !this.diffClient;
        this.set_a_change_form_text();
        console.log("on change form");
        console.log(this.diffClient);
        console.log(this.a_change_form_text);
    }

    private set_a_change_form_text(){
        this.a_change_form_text = this.diffClient?"Use my account to reserve this visit":"I don't want to use my account data";
    }

}
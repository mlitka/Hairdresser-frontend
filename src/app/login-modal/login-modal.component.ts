import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HairdresserService } from './../common/service/hairdresser.service';

@Component({
    selector: 'login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['login-modal.component.scss']
})
export class LoginModalComponent {

    constructor(private hairdresserService: HairdresserService) {
    }

    public model = {
        username: "",
        password: ""
    };

    onLoginClick() {
        console.log(this.model);
        this.hairdresserService.login(this.model).subscribe(
            result => console.log("logged"),
            error => console.error(error)
        );
    }

}
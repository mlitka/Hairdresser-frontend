import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HairdresserService } from './../common/service/hairdresser.service';
import { User } from './../common/model/user';

@Component({
    selector: 'login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['login-modal.component.scss']
})
export class LoginModalComponent {

    constructor(private hairdresserService: HairdresserService) {
    }

    public model_login = new User();
    public model_register = new User();
    public confirmPass = new FormControl(this.model_register.password, Validators.required);

    onLoginClick() {
        console.log(this.model_login);
        this.hairdresserService
            .login(this.model_login);

    }

    onRegisterClick() {
        console.log(this.model_register);
        this.hairdresserService
            .register(this.model_register)
            .subscribe(
            result => {
                console.log('REGISTERED!');
                console.log(result);
                document.getElementById("a_login").click();
            },
            error => console.error(error)
            );
    }
}
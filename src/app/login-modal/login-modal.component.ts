import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HairdresserService } from './../common/service/hairdresser.service';
import {User} from './../common/model/user';

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

    onLoginClick() {
        console.log(this.model_login);
        this.hairdresserService
            .login(this.model_login)
            .subscribe(
            result => {
                console.log("logged");
                console.log(result);
                window.sessionStorage.setItem("authenticated", "true");
                document.getElementById("login-modal").hidden = true;
            },
            error => console.error(error)
            );
    }

    onRegisterClick(){
        console.log(this.model_register);
        this.hairdresserService
            .register(this.model_register)
            .subscribe(
                result=>{
                    console.log('REGISTERED!');
                    console.log(result);
                    document.getElementById("a_login").click();
                },
                error=> console.error(error)
            );
    }
}
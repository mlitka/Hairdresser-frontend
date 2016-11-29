import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { HairdresserService } from './../common/service/hairdresser.service';
import { User } from './../common/model/user';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

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
    login: boolean = false;


    onLoginClick() {
        console.log(this.model_login);
        this.hairdresserService
            .login(this.model_login);
        this.login = true;
    }

    // onAuthenticated(){
    //      if(this.hairdresserService.authenticated){
    //         document.getElementById("close-btn").click();
    //         this.resetData();
    //     }
    // }

    onRegisterClick() {
        console.log(this.model_register);
        this.hairdresserService
            .register(this.model_register)
            .subscribe(
            result => {
                console.log('REGISTERED!');
                console.log(result);
                document.getElementById("a_login").click();
                this.resetData();
            },
            error => console.error(error)
            );
    }

    passwordMatch(): boolean {
        return this.model_register.passwordConfirm != undefined && this.model_register.password === this.model_register.passwordConfirm;
    }

    resetData() {
        this.model_login = new User();
        this.model_register = new User();
        this.login = false;
    }

}


import { Component, OnInit } from '@angular/core';
import { HairdresserService } from './../common/service/hairdresser.service';

@Component({
    selector: 'main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['main-nav.component.scss']
})
export class MainNavComponent {


    constructor(private hairdresserService: HairdresserService) { }

    setActiveHref(activeHref: string) {
        window.localStorage.setItem("activeLink", activeHref);
    }

    isActiveHref(href: string): boolean {
        return window.localStorage.getItem("activeLink") === href;
    }

    onLogoutClick() {
        console.log("logging out");
        this.hairdresserService
            .logout();
    }

    displaySchedule():boolean{
        return this.hairdresserService.authenticated && (this.hairdresserService.auth_role=='ADMIN' || this.hairdresserService.auth_role=='HAIRDRESSER');
    }

    displayClientPage():boolean{
        return this.hairdresserService.authenticated && this.hairdresserService.auth_role=='USER'; 
    }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HairdresserService } from './../common/service/hairdresser.service';

@Component({
    selector: 'main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['main-nav.component.scss']
})
export class MainNavComponent {


    constructor(private hairdresserService: HairdresserService, private router: Router) { }

    setActiveHref(activeHref: string) {
        window.localStorage.setItem("activeLink", activeHref);
    }

    isActiveHref(href: string): boolean {
        return window.localStorage.getItem("activeLink") === href;
    }

    onLogoutClick() {
        this.router.navigate(['/']).then(() => {
            console.log("logging out");
            this.hairdresserService
                .logout();
        });
    }

    displaySchedule(): boolean {
        return this.hairdresserService.authenticated && (this.hairdresserService.auth_role == 'ADMIN' || this.hairdresserService.auth_role == 'HAIRDRESSER');
    }

    displayClientPage(): boolean {
        return this.hairdresserService.authenticated && this.hairdresserService.auth_role == 'USER';
    }

    displayAdminPage(): boolean {
        return this.hairdresserService.authenticated && this.hairdresserService.auth_role == 'ADMIN';
    }
}
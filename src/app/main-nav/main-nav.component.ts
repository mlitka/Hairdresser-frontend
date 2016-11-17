import { Component, OnInit } from '@angular/core';
import { HairdresserService } from './../common/service/hairdresser.service';

@Component({
    selector: 'main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

    public authenticated = false;

    constructor(private hairdresserService: HairdresserService) { }

    ngOnInit() {
        this.authenticated = window.sessionStorage.getItem("authenticated") == null ?
            false : Boolean(window.sessionStorage.getItem("authenticated"));
    }

    setActiveHref(activeHref: string) {
        window.localStorage.setItem("activeLink", activeHref);
    }

    isActiveHref(href: string): boolean {
        return window.localStorage.getItem("activeLink") === href;
    }

    onLogoutClick() {
        console.log("logging out");
        this.hairdresserService
            .logout()
            .subscribe(
            result => {
                console.log("logged out");
                window.sessionStorage.setItem("authenticated", "false");
            },
            error => console.error(error)
            );
    }
}
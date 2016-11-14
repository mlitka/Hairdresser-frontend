import { Component } from '@angular/core';
import { HairdresserService } from './../common/service/hairdresser.service';

@Component({
    selector: 'main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['main-nav.component.scss']
})
export class MainNavComponent {
    activeHref: string;

    constructor(private hairdresserService: HairdresserService) {
    }

    setActiveHref(activeHref: string) {
        this.activeHref = activeHref;
    }

    isActiveHref(href: string): boolean {
        return this.activeHref === href;
    }

    login() {
        console.log("inside login");
        // this.hairdresserService.login();
        // window.location.href = "http://localhost/facebook";
    }
}
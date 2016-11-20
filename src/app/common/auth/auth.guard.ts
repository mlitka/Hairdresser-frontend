import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HairdresserService } from '../service/hairdresser.service';


@Injectable()
export class AuthClient implements CanActivate {

    constructor(private router: Router, private hairdresserService: HairdresserService) { }

    canActivate() {
        if (this.hairdresserService.auth_role=='USER') {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/']);
        return false;
    }
}
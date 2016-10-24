import { Component } from '@angular/core';

@Component({
    selector: 'main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['main-nav.component.scss']
})
export class MainNavComponent {
  goTo(location: string): void {
    window.location.hash = location;
}
}
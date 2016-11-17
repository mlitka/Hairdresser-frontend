import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, ResponseOptions } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Observable } from 'rxjs/Observable';

import { Hairdresser } from '../model/hairdresser';
import { HairService } from '../model/hair-service';
import { VisitProposal } from '../model/visit-proposal';
import { Visit } from '../model/visit';
import * as URL_CONST from './url';

@Injectable()
export class HairdresserService {

    constructor(private http: Http, private cookieService: CookieService) { }

    getToken(): Observable<any> {
        let options = new RequestOptions({ withCredentials: true });
        return this.http.get(URL_CONST.HOME_URL, options).map(this.extractOptions).catch(this.handleError);
    }

    login(loginData: any): Observable<any> {
        // let token = 'bdf46009f789e0873426fb38c4a984ca8f';
        // document.cookie = 'CSRF-TOKEN='+token;
        // 'X-CSRF-TOKEN':token, 'Cookie':
        // console.log(XSRFStrategy);
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        console.info(options);
        let body = "username=" + loginData.username + "&password=" + loginData.password;
        console.log(body);
        return this.http.post(URL_CONST.LOGIN_URL, body)
            .map(this.extractData)
            .catch(this.handleError);
    }

    logout(): Observable<any> {
        return this.sendGet(URL_CONST.LOGOUT_URL);
    }

    register(userData: any): Observable<any> {
        return this.sendPost(URL_CONST.REGISTER_URL, userData);
    }

    getHairdressers(): Observable<Hairdresser[]> {
        return this.sendGet(URL_CONST.HAIRDRESSERS_URL);
    }

    getHairServices(): Observable<HairService[]> {
        return this.sendGet(URL_CONST.SERVICES_URL);
    }

    getVisitProposals(hairdresserId: number, serviceId: number, date: string): Observable<VisitProposal[]> {
        return this.sendGet(URL_CONST.VISIT_PROPOSALS_URL(hairdresserId, serviceId, date));
    }

    postReserveVisit(visit: Visit): Observable<any> {
        return this.sendPost(URL_CONST.VISIT_RESERVE_URL, visit);
    }

    public sendGet(URL: string): Observable<any> {
        return this.http.get(URL)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public sendPost(URL: string, body: any): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        return this.http.post(URL, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    private handleError(error: Response): Promise<any> {
        console.error('An error occurred', error);
        console.log(error.status)
        return Promise.reject(error.text || error);
    }

    private extractOptions(res: Response) {
        console.log("result")
        console.log(res);
        // this.cookieService.put("X-XSRF-TOKEN", res.headers.get("X-XSRF-TOKEN"));
        // console.log(this.cookieService.get("X-XSRF-TOKEN"));
        return res.json() || {};
    }
}
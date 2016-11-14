import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, CookieXSRFStrategy, XSRFStrategy } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Hairdresser } from '../model/hairdresser';
import { HairService } from '../model/hair-service';
import { VisitProposal } from '../model/visit-proposal';
import { Visit } from '../model/visit';
import * as URL_CONST from './url';

@Injectable()
export class HairdresserService {

    constructor(private http: Http) { }

    b(a:any):string {
        return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : (2e16.toString()).replace(/[01]/g, this.b)
    };

    login(loginData: any): Observable<any> {
        // let token = 'bdf46009f789e0873426fb38c4a984ca8f';
        // document.cookie = 'CSRF-TOKEN='+token;
        // 'X-CSRF-TOKEN':token, 'Cookie':
        // console.log(XSRFStrategy);
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        console.info(options);
        // console.log(CookieXSRFStrategy.)
        return this.http.post(URL_CONST.LOGIN_URL, JSON.stringify(loginData), options)
            .map(this.extractData)
            .catch(this.handleError);
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
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
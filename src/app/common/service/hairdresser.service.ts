import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, ResponseOptions } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { Hairdresser } from '../model/hairdresser';
import { HairService } from '../model/hair-service';
import { VisitProposal } from '../model/visit-proposal';
import { Visit } from '../model/visit';
import { Event } from '../model/event';
import { ClientVisit } from '../model/client-visit';
import { Opinion } from '../model/opinion';
import * as URL_CONST from './url';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class HairdresserService {

    private token: any;
    private jwtHelper: JwtHelper = new JwtHelper();
    public authenticated = false;
    public auth_role = "";
    public auth_user_id = -1;

    constructor(private http: Http, private authHttp: AuthHttp, private router: Router) {
        this.authenticated = localStorage.getItem('id_token') != undefined;
        this.auth_role = localStorage.getItem('auth_role');
        this.auth_user_id = Number(localStorage.getItem('auth_user_id'));
    }

    login(loginData: any){
        this.http.post(URL_CONST.LOGIN_URL, loginData)
            .subscribe(
            data => {
                this.token = data
                console.log(this.token._body);
                localStorage.setItem('id_token', this.token._body);
                this.manageToken();
            },
            err => console.log(err),
            () => console.log('Request Complete')
            );
    }

    manageToken() {
        var token = localStorage.getItem('id_token');
        this.authenticated = true;
        console.info(token);
        this.sendAuthGet(URL_CONST.LOGGED_USER_URL).subscribe(
            result => {
                console.log(result);
                this.auth_role = result.role;
                this.auth_user_id = result.id;
                localStorage.setItem('auth_role', this.auth_role);
                localStorage.setItem('auth_user_id', this.auth_user_id.toString());;
            },
            error => console.log(error)
        );
    }

    logout() {
        // return this.sendGet(URL_CONST.LOGOUT_URL);
        // this.router.navigate(['/']);
        this.authenticated = false;
        this.auth_role = undefined;
        this.auth_user_id = -1;
        localStorage.removeItem('id_token');
        localStorage.removeItem('auth_role');
        localStorage.removeItem('auth_user_id');
    }

    register(userData: any): Observable<any> {
        return this.sendPost(URL_CONST.REGISTER_URL, userData);
    }

    getHairdressers(): Observable<Hairdresser[]> {
        return this.sendGet(URL_CONST.HAIRDRESSERS_URL);
    }

    getHairServices(): Observable<HairService[]> {
        return this.sendGet(URL_CONST.AVAILABLE_SERVICES_URL);
    }

    getAuthHairServices(): Observable<HairService[]> {
        return this.sendAuthGet(URL_CONST.SERVICES_URL);
    }

    getVisitProposals(hairdresserId: number, serviceId: number, date: string): Observable<VisitProposal[]> {
        return this.sendGet(URL_CONST.VISIT_PROPOSALS_URL(hairdresserId, serviceId, date));
    }

    getOpinions(): Observable<Opinion[]> {
        return this.sendAuthGet(URL_CONST.OPINIONS_URL);
    }

    getOpinionsCount(count: number): Observable<Opinion[]> {
        return this.sendGet(URL_CONST.OPINIONS_COUNT_URL + count.toString());
    }

    getClientsOpinions(): Observable<any[]> {
        return this.sendAuthGet(URL_CONST.OPINIONS_CLIENT_URL + this.auth_user_id);
    }

    getVisits(): Observable<any[]> {
        return this.sendAuthGet(URL_CONST.VISITS_URL);
    }

    getHairdressersVisits(hairdresserId: number): Observable<Event[]> {
        return this.sendAuthGet(URL_CONST.VISITS_PARAM_URL + hairdresserId);
    }

    getClientsUpcomingVisits(): Observable<Event[]> {
        return this.sendAuthGet(URL_CONST.VISITS_PARAM_UPCOMING_URL + this.auth_user_id);
    }

    getClientsHistoryVisits(): Observable<Event[]> {
        return this.sendAuthGet(URL_CONST.VISITS_PARAM_HISTORY_URL + this.auth_user_id);
    }

    getCheckUser(username: string): Observable<boolean> {
        return this.sendAuthGet(URL_CONST.CHECK_EMAIL + username);
    }

    postUpgradeHairdresser(username: string): Observable<Hairdresser> {
        return this.sendPost(URL_CONST.UPGRADE_HAIDRESSER + username, {});
    }

    postAddOpinion(opinion: Opinion) {
        return this.sendPost(URL_CONST.OPINIONS_URL, opinion);
    }

    postAddService(service: HairService) {
        return this.sendPost(URL_CONST.SERVICES_ADD, service);
    }

    postShowService(serviceId: number) {
        return this.sendPutResponseStatus(URL_CONST.SERVICES_SHOW + serviceId, {});
    }

    postHideService(serviceId: number) {
        return this.sendPutResponseStatus(URL_CONST.SERVICES_HIDE + serviceId, {});
    }

    postReserveVisit(visit: Visit): Observable<any> {
        return this.sendPostResponseStatus(URL_CONST.VISIT_RESERVE_URL, visit);
    }

    cancelVisit(visitId: number): Observable<any> {
        return this.authHttp.delete(URL_CONST.VISITS_CANCEL_URL + visitId)
            .map(this.extractStatus)
            .catch(this.handleError);
    }

    public sendGet(URL: string): Observable<any> {
        return this.http.get(URL)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public sendAuthGet(URL: string): Observable<any> {
        console.log(localStorage.getItem('id_token'));
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        // headers.append('withCredentials', 'true');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'))
        // headers.append('my-token', 'hello');
        console.log(headers);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(URL, { headers })
            .map(this.extractData)
            .catch(this.handleError);
    }

    public sendPost(URL: string, body: any): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'))
        let options = new RequestOptions({ headers: headers });
        return this.http.post(URL, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public sendPostResponseStatus(URL: string, body: any): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'))
        let options = new RequestOptions({ headers: headers });
        return this.http.post(URL, body, options)
            .map(this.extractStatus)
            .catch(this.handleError);
    }

    public sendPutResponseStatus(URL: string, body: any): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'))
        let options = new RequestOptions({ headers: headers });
        return this.http.put(URL, body, options)
            .map(this.extractStatus)
            .catch(this.handleError);
    }

    public sendPut(URL: string, body: any): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'))
        let options = new RequestOptions({ headers: headers });
        return this.http.put(URL, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        console.log(res);
        let body = res.json();
        return body || {};
    }

    private extractStatus(res: Response) {
        console.log(res);
        // let body = res.json();
        return res.status;
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
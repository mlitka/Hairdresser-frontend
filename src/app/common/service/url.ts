const BASIC_URL: string = "http://192.168.1.41:8080";
// const BASIC_URL: string = "http://localhost:80";
const BASIC_AUTH: string = "/auth";
const LOGIN: string = "/user/login";
const LOGGED_USER: string = "/user/logged";
const LOGOUT: string = "/user/logout";
const REGISTER: string = "/user/register";
const REST_HAIRDRESSERS: string = "/rest/hairdressers";
const AVAILABLE_SERVICES: string = "/rest/services/available";
const SERVICES: string = "/services";
const VISIT_PROPOSALS: string = "/visits/";
const VISIT_AVAILABLE: string = "/available/";
const VISIT_DATE: string = "?date=";
// const VISIT: string = "/visit";
const VISITS: string = "/visits";
// const VISITS_HAIRDRESSER: string = "/visits/";
const VISIT_RESERVE: string = "/rest/reserve";
const VISIT_CANCEL: string = "/cancel/";
const OPINIONS = "/opinions";
const OPINIONS_COUNT = "/rest/opinions/";
const SHOW = "/show";
const HIDE = "/hide";
const UPGRADE = "/upgrade";
const HAIRDRESSERS = "/hairdressers";
const CHECK = "/check";
const USERS = "/users";


export const HOME_URL = BASIC_URL + '/';
export const HAIRDRESSERS_URL = BASIC_URL + REST_HAIRDRESSERS;
export const AVAILABLE_SERVICES_URL = BASIC_URL + AVAILABLE_SERVICES;
export const SERVICES_URL = BASIC_URL + BASIC_AUTH + SERVICES;
export const VISIT_PROPOSALS_URL = function (hairdresserId: number, serviceId: number, date: string) {
    return BASIC_URL + VISIT_PROPOSALS + hairdresserId + VISIT_AVAILABLE + serviceId + VISIT_DATE + date;
}
export const VISIT_RESERVE_URL = BASIC_URL + VISITS + VISIT_RESERVE;
export const LOGIN_URL = BASIC_URL + LOGIN;
export const LOGGED_USER_URL = BASIC_URL + BASIC_AUTH + LOGGED_USER;
export const LOGOUT_URL = BASIC_URL + LOGOUT;
export const REGISTER_URL = BASIC_URL + REGISTER;
export const OPINIONS_URL = BASIC_URL + BASIC_AUTH + OPINIONS;
export const OPINIONS_CLIENT_URL = BASIC_URL + BASIC_AUTH + OPINIONS + USERS + "/";
export const OPINIONS_COUNT_URL = BASIC_URL + OPINIONS_COUNT;
export const VISITS_URL = BASIC_URL + BASIC_AUTH + VISITS;
export const VISITS_PARAM_URL = BASIC_URL + BASIC_AUTH + VISITS + "/";
export const VISITS_CANCEL_URL = BASIC_URL + BASIC_AUTH + VISITS + VISIT_CANCEL;
export const SERVICES_ADD = BASIC_URL + BASIC_AUTH + SERVICES + "/";
export const SERVICES_SHOW = BASIC_URL + BASIC_AUTH + SERVICES + SHOW + "/";
export const SERVICES_HIDE = BASIC_URL + BASIC_AUTH + SERVICES + HIDE + "/";
export const UPGRADE_HAIDRESSER = BASIC_URL + BASIC_AUTH + HAIRDRESSERS + UPGRADE;
export const CHECK_EMAIL = BASIC_URL + BASIC_AUTH + USERS + CHECK + "/";




// "/visits/4/available/3?date=2016-12-12";
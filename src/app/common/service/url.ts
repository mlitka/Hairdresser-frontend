const BASIC_URL: string = "http://192.168.1.41:8080";
const HAIRDRESSERS: string = "/hairdressers";
const SERVICES: string = "/services";
const VISIT_PROPOSALS: string = "/visits/";
const VISIT_AVAILABLE: string = "/available/";
const VISIT_DATE: string = "?date=";
const VISIT: string = "/visit";
const VISIT_RESERVE: string = "/reserve";


export const HAIRDRESSERS_URL = BASIC_URL + HAIRDRESSERS;
export const SERVICES_URL = BASIC_URL + SERVICES;
export const VISIT_PROPOSALS_URL = function (hairdresserId: number, serviceId: number, date: string) {
    return BASIC_URL + VISIT_PROPOSALS + hairdresserId + VISIT_AVAILABLE + serviceId + VISIT_DATE + date;
}
export const VISIT_RESERVE_URL = BASIC_URL + VISIT + VISIT_RESERVE;


// "/visits/4/available/3?date=2016-12-12";
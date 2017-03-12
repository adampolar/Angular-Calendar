import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { CalendarEvent } from './calendar-event'
import { LogInService } from './login.service'

@Injectable()
export class CalendarEventService {

    calendarEventsUrl = 'api/events'

    constructor(private http: Http, private logInService : LogInService) { }

    getHeaders = (() => new Headers({
      'X-PASS': this.logInService.getPassword(),
      'Content-type' :  'application/json'
    }));

    getAllCalendarEvents(): Promise<CalendarEvent[]> {
        return this.http
            .get(this.calendarEventsUrl, {headers: this.getHeaders()})
            .toPromise()
            .then(response => { 
                let res = response.json() as CalendarEvent[];
                res.forEach(ev => {
                    ev.date = new Date(ev.date);
                });
                return res;
            });
    }

    getCalendarEventsForMonth(month: number, year: number): Promise<CalendarEvent[]> {
        return this.getAllCalendarEvents().then(events => events.filter(
            ce => ce.date.getMonth() === month && ce.date.getFullYear() === year));
    }

    save(calendarEvent: CalendarEvent): Promise<void> {

        if (calendarEvent.id) {
            let url = `${this.calendarEventsUrl}/${calendarEvent.id}`;
            return this.http
                .put(url, JSON.stringify(calendarEvent), {headers: this.getHeaders()})
                .toPromise()
                .then(r => null);

        } else {
            return this.http
                .post(this.calendarEventsUrl, JSON.stringify(calendarEvent), {headers: this.getHeaders()})
                .toPromise()
                .then(r => null);
        }
    }

    delete(calendarEvent: CalendarEvent): Promise<void> {
        let url = `${this.calendarEventsUrl}/${calendarEvent.id}`;
        return this.http
            .delete(url, {headers: this.getHeaders()})
            .toPromise()
            .then(() => null);

    }
}
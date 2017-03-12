import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LogInService {

    calendarEventsUrl = 'api/events'

    constructor(private http: Http) { }

    headers = new Headers({
      'Content-type' :  'application/json'
    });

    isPasswordCorrect(password: string): Promise<boolean> {
        return this.http
            .post('api/events/isPasswordCorrect/' + password, {headers: this.headers})
            .toPromise()
            .then(response => {
                if(response.ok) {
                    localStorage.setItem("password", password);
                }
                return response.ok;
            });
    }

    clearLogin(): void{
        localStorage.clear();
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem("password");
    }

    getPassword(): string {
        return localStorage.getItem("password");
    }

    logOutAndReload = () => { localStorage.clear(); location.reload(); }
}
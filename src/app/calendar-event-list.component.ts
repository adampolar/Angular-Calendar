import { Component, OnInit } from '@angular/core';

import { CalendarEvent } from './calendar-event';
import { CalendarEventService } from './calendar-event.service';
import { LogInService } from './login.service';

@Component({
    selector: 'my-event-list',
    template: `
    <div id="calendar">
        <my-event [addOnlyMode]='true' (notify)="updateMonth()"></my-event>
        <div>
            <button (click)="decrementMonth()"><</button>
            {{getMonthText(DateOfView.getMonth()) + ' ' + DateOfView.getFullYear()}}
            <button (click)="incrementMonth()">></button>
        </div>
        <div *ngFor="let eventsList of MonthWithEvents; let i = index" class="day"> 
        {{(i + 1) + getSuffixForNumber(i + 1)}} 
        <div *ngIf="eventsList">    
            <div *ngFor="let event of eventsList; let j = index">
                    <my-event *ngIf="MonthWithEvents[i][j]" [(ngModel)]='MonthWithEvents[i][j]'
                        (notify)="updateMonth()"></my-event>
                </div>
            </div>
        </div>
    </div>
  `,
})
export class CalendarEventListComponent implements OnInit {

    constructor(private calendarEventService: CalendarEventService, private logInService: LogInService) { }

    MonthWithEvents: CalendarEvent[][];
    DateOfView: Date;

    ngOnInit(): void {
        this.DateOfView = new Date();
        this.GetMonthWithEvents();
    }

    GetMonthWithEvents(): void {
        let daysInMonth = new Date(this.DateOfView.getFullYear(), this.DateOfView.getMonth() + 1, 0).getDate();
        let monthWithEvents = new Array<Array<CalendarEvent>>(daysInMonth);

        this.getCalendarEventsForMonth(this.DateOfView.getMonth(), this.DateOfView.getFullYear())
            .then(evs => evs.forEach(ce => {
                if (monthWithEvents[ce.date.getDate() - 1] === undefined) {
                    monthWithEvents[ce.date.getDate() - 1] = new Array<CalendarEvent>();
                }
                return monthWithEvents[ce.date.getDate() - 1].push(ce);
            })).then(events =>
                this.MonthWithEvents = monthWithEvents
            ).catch(this.logInService.logOutAndReload);

    }

    getSuffixForNumber(i: number): string {
        //TODO use a lib
        let iStr = i.toString();
        let units = parseInt(iStr[iStr.length - 1]);
        let tens = parseInt(iStr[iStr.length - 2])
        if (tens === 1 || units >= 4 || units === 0) {
            return 'th';
        }
        return [
            'st',
            'nd',
            'rd'
        ][units - 1];
    }

    getCalendarEventsForMonth(month: number, year: number): Promise<CalendarEvent[]> {
        let calendarEvents: CalendarEvent[] = null;
        return this.calendarEventService.getCalendarEventsForMonth(month, year);
    }

    getMonthText(monthInt: number): string {

        let monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return monthNames[monthInt];

    }

    incrementMonth(): void {
        this.DateOfView.setMonth(this.DateOfView.getMonth() + 1);
        this.GetMonthWithEvents();
    }

    decrementMonth(): void {
        this.DateOfView.setMonth(this.DateOfView.getMonth() - 1);
        this.GetMonthWithEvents();
    }

    updateMonth(): void {
        this.GetMonthWithEvents();
    }
}
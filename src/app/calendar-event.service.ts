import { Injectable } from '@angular/core';

import { CalendarEvent } from './calendar-event'

@Injectable()
export class CalendarEventService {
    CALENDAR_EVENTS = [
            {id: 1, eventName: "Christmas", dateAndTime: new Date(2017,11,25,0,0,0,0)},
            {id: 2, eventName: "Adams birthday", dateAndTime: new Date(2017,3,1,0,0,0,0)},
            {id: 3, eventName: "Boxing Day", dateAndTime: new Date(2017,11,26,0,0,0,0)},
            {id: 4, eventName: "1", dateAndTime: new Date(2017,2,1,0,0,0,0)},
            {id: 5, eventName: "2", dateAndTime: new Date(2017,2,5,0,0,0,0)},
            {id: 6, eventName: "3", dateAndTime: new Date(2017,2,26,0,0,0,0)},
            {id: 7, eventName: "4", dateAndTime: new Date(2017,2,11,0,0,0,0)},
        ];

    getAllCalendarEvents() : CalendarEvent[] {
        return this.CALENDAR_EVENTS;
    }

    getCalendarEventsForMonth(month:number, year:number) {
        return this.getAllCalendarEvents().filter(
            ce => ce.dateAndTime.getMonth() === month && ce.dateAndTime.getFullYear() === year);
    }

    save(calendarEvent: CalendarEvent){
        if(calendarEvent.id){

        } else {
            calendarEvent.id = this.CALENDAR_EVENTS.sort(e => e.id)[this.CALENDAR_EVENTS.length - 1].id + 1;          
            this.CALENDAR_EVENTS.push(calendarEvent);
        }
    }

    delete(calendarEvent: CalendarEvent) {
        this.CALENDAR_EVENTS.splice(this.CALENDAR_EVENTS.findIndex(a => a.id === calendarEvent.id), 1);
    }
}
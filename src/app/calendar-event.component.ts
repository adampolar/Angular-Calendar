import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CalendarEventService } from './calendar-event.service';

import { CalendarEvent } from './calendar-event';

@Component({
  selector: 'my-event',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarEventComponent),
      multi: true
    }
  ],
  template: `
  <div class="calendar-event">
    <div *ngIf="!editMode && !addOnlyMode">
      <p>{{event.eventName}}</p>
    </div>
    <div *ngIf="editMode || addOnlyMode">
      <p><my-datepicker [(ngModel)]='event.dateAndTime'></my-datepicker></p>
      <p><input [(ngModel)]="event.eventName"></p>
    </div>
    <div>
    <div *ngIf="!addOnlyMode">
      <button [attr.disabled]="editMode? true: null" (click)="edit(); $event.stopPropagation();">Edit</button>
      <button [attr.disabled]="!editMode? true: null" (click)="save(); $event.stopPropagation();">Save</button>
      <button [attr.disabled]="editMode? true: null" (click)="delete(); $event.stopPropagation();">Delete</button>
    </div>
    <div *ngIf="addOnlyMode">    
      <button (click)="add(); $event.stopPropagation();">Add</button>
    </div>
  </div>
  `,
})
export class CalendarEventComponent implements ControlValueAccessor {

  writeValue(value: any): void {
    if (value !== null && value !== undefined) {
      this.event = value;
    } 
  }

  propagateChange = (_: any) => { };

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  setDisabledState(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }


  constructor(private calendarEventService: CalendarEventService) {
      this.event = new CalendarEvent();
      this.event.dateAndTime = new Date();
   }

  editMode = false;

  @Input()
  addOnlyMode = false;

  @Input()
  event: CalendarEvent;

  @Output() notify: EventEmitter<void> = new EventEmitter<void>();

  edit(): void {
    this.editMode = true;
  }

  save(): void {
    this.editMode = false;
    this.calendarEventService.save(this.event);
  }

  add(): void {
    this.calendarEventService.save(this.event);
    this.event = new CalendarEvent();
    this.event.dateAndTime = new Date();
    this.notify.emit();
  }

  delete(): void {
    this.calendarEventService.delete(this.event);
    this.notify.emit();
  }
}
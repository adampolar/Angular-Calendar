import { Component, Input, forwardRef } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'my-datepicker',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatePickerComponent),
            multi: true
        }
    ],
    template: `
    <input type="date" 
        #myDate value="{{dateTime | date:'yyyy-MM-dd'}}" 
        (change)="changeDate($event.target.value)" />`

})
export class DatePickerComponent implements ControlValueAccessor {

    writeValue(value: any): void {
        if (value !== undefined) {
            this.dateTime = value;
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

    changeDate(dateTime: string) {
        this.dateTime = new Date(dateTime);
        this.propagateChange(this.dateTime);
    }


    @Input()
    dateTime: Date


}
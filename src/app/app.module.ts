import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';

import { CalendarEventComponent } from './calendar-event.component';
import { CalendarEventListComponent } from './calendar-event-list.component';

import { DatePickerComponent } from './date-picker.component';

import { CalendarEventService } from './calendar-event.service';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule 
  ],
  declarations: [ 
    AppComponent,
    CalendarEventComponent,
    CalendarEventListComponent,
    DatePickerComponent
  ],
  bootstrap:    [ AppComponent ],
  providers: [ CalendarEventService ]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { CalendarEventComponent } from './calendar-event.component';
import { CalendarEventListComponent } from './calendar-event-list.component';
import { PasswordComponent } from './password.component';

import { DatePickerComponent } from './date-picker.component';

import { CalendarEventService } from './calendar-event.service';
import { LogInService } from './login.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    CalendarEventComponent,
    CalendarEventListComponent,
    DatePickerComponent,
    PasswordComponent
  ],
  bootstrap: [AppComponent],
  providers: [CalendarEventService, LogInService]
})
export class AppModule { }

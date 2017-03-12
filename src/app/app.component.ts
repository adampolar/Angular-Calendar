import { Component, OnInit } from '@angular/core';
import { LogInService } from './login.service'

@Component({
  selector: 'my-app',
  template: `
  <h1>Your Calendar</h1>
  <div  id="calendar">
    <div *ngIf="isLoggedIn">
      <my-event-list></my-event-list>
    </div>
    <div *ngIf="!isLoggedIn">
      <my-password-dialog (notify)="isLoggedIn=true;"></my-password-dialog>
    </div>
  </div>`,
})
export class AppComponent implements OnInit {

  constructor(private logInService: LogInService){}


  ngOnInit(): void {
    this.isLoggedIn = this.logInService.isLoggedIn();
  }

  isLoggedIn = false;


}

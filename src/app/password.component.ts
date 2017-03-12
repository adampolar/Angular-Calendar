import { Component, Input, EventEmitter, Output } from '@angular/core'

import { LogInService } from './login.service';

@Component({
    selector: 'my-password-dialog',
    template: `
  <div class="calendar-event">
    <div>
        <input type="password" [(ngModel)]="password" />
    </div>
    <div>    
      <button (click)="logIn(); $event.stopPropagation();">Log In</button>
    </div>
  </div>
  `,
})
export class PasswordComponent {

    constructor(private logInService: LogInService){}    

    @Input()
    password: string;

    @Output() notify: EventEmitter<void> = new EventEmitter<void>();

    logIn()
    {
        if(this.logInService.isPasswordCorrect(this.password)) {
            this.notify.emit();
        } else {
            this.password = '';
        }
    }



}

import { Component } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {CodeInputModule} from 'angular-code-input';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [CodeInputModule, NgIf],
  templateUrl: './activate-account.component.html',
  styles:`.container{display: flex;justify-content: center;align-items: center;height: 100vh;}`
})
export class ActivateAccountComponent {
  token = 123456;
  message="";
  isOkay=true;
  submitted=false;

  constructor(
    private router:Router,
    private authService:AuthenticationService
  ) {}

  onCodeCompleted(code: string) {
    console.log(code);
    this.confirmAccount(code);
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  private confirmAccount(token: string) {
    this.authService.confirm(token).subscribe({
      next: ()=>{
        this.message = "Your account has been successfully activate.";
        this.submitted = true;
        this.isOkay = true;
      },
      error: ()=>{
        this.message = "Token is invalid or has been expired.";
        this.submitted = true;
        this.isOkay = false;
      }
    });
  }
}


import {Component} from '@angular/core';
import {AuthenticationRequest} from '../../models/authentication-request';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {routes} from '../../app.routes';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: string[] = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }

  login() {
    this.authService.authenticate(this.authRequest).subscribe({
      next: ({token}) => {
        this.tokenService.token = token as string;
        this.router.navigate(["/books"]);
      },
      error: ({error}) => {
        this.errorMsg = [];
        if (error?.validationErrors)
          this.errorMsg = error?.validationErrors;
        else
          this.errorMsg.push(error.error);
      }
    });
  }
}

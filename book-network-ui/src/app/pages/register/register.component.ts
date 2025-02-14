import {Component} from '@angular/core';
import {RegistrationRequest} from '../../models/registration-request';
import {Router, RouterLink} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {TokenService} from '../../services/token.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'register',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerRequest: RegistrationRequest = {email: '', password: '', firstName: '', lastName: ''};
  errorMsg: string[] = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }

  register() {
    this.authService.register(this.registerRequest).subscribe({
      next: () => {
        this.router.navigate(['activate-account']);
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

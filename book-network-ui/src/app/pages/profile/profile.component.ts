import {Component, OnInit} from '@angular/core';
import {MenuComponent} from '../books/components/menu/menu.component';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {RegistrationRequest} from '../../models/registration-request';
import {AuthenticationService} from '../../services/authentication.service';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [
    MenuComponent,
    RouterOutlet,
    FormsModule,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit{
  updateRequest: RegistrationRequest = {email: '', password: '', firstName: '', lastName: ''};
  errorMsg: string[] = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }

  ngOnInit(): void {
        // this.authService.fetchUser().subscribe({
        //   next: (userDetails: RegistrationRequest) => {
        //     this.updateRequest = userDetails;
        //   }
        // });
    }

  updateProfile() {
    // this.authService.updateUser(this.updateRequest).subscribe({
    //   next: () => {
    //     console.log('Updated Profile');
    //   },
    //   error: ({error}:{error:any}) => {
    //     this.errorMsg = [];
    //     if (error?.validationErrors)
    //       this.errorMsg = error?.validationErrors;
    //     else
    //       this.errorMsg.push(error.error);
    //   }
    // });
  }
}

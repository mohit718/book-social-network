import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {TokenService} from '../../../../services/token.service';
import {JwtData} from '../../../../models/jwt-data';

@Component({
  selector: 'nav-menu',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    RouterLinkActive,

  ],
  templateUrl: './menu.component.html',
  styleUrl:'menu.component.scss'
})
export class MenuComponent {
  fullName!:string;

  constructor(private tokenService: TokenService) {
    this.fullName = tokenService.fullName;
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  onSearch() {
    console.log("Searching");
  }

}

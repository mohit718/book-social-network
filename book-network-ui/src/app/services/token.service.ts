import {Injectable} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {JwtData} from '../models/jwt-data';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token() {
    return localStorage.getItem('token') as string;
  }

  get decodedToken() {
    if (this.token) {
      return jwtDecode<JwtData>(this.token);
    }
    return null;
  }

  get expired() {
    if (this.token!="") {
      try {
        const decodedToken = jwtDecode<JwtData>(this.token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return true;
  }

  get fullName() {
    if (this.token) {
      try {
        return jwtDecode<JwtData>(this.token).fullName;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return "XXXX XXXX";
  }

  get authorities() {
    if (this.token) {
      try {
        return jwtDecode<JwtData>(this.token).authorities;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return [];
  }

  get tokenInvalid() {
    return !this.token || this.token=="" || this.expired
  }

  get tokenValid() {
    return !this.tokenInvalid;
  }
}

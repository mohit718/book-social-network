import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticationRequest} from '../models/authentication-request';
import {AuthenticationResponse} from '../models/authentication-response';
import {HttpClient} from '@angular/common/http';
import {RegistrationRequest} from '../models/registration-request';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  authenticate(authRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>('http://localhost:8080/api/auth/authenticate', authRequest);
  }

  register(registerRequest: RegistrationRequest) {
    return this.http.post<void>('http://localhost:8080/api/auth/register', registerRequest);
  }

  confirm(token: string) {
    return this.http.get<void>(`http://localhost:8080/api/auth/activate-account?token=${token}`);
  }
  
}

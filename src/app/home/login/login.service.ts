import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface LoginResult {
  validated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginResult: LoginResult | undefined;

  constructor(private httpClient: HttpClient) { }

  login(username: string | null | undefined, password: string | null | undefined) {

    return this.httpClient.post<LoginResult>("https://hunt-back.riri4ever.synology.me/hunt/api/login", {username, password});
  }
}

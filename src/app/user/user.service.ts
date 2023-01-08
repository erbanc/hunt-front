import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

export interface UserInfo {
  username: string,
  questionReached: bigint,
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  getUserInfos(username: string) {

    return this.httpClient.get<UserInfo>("https://hunt-back.riri4ever.synology.me/hunt/api/users/" + username)
  }

  getUsername() {

    return this.cookieService.get("THE_HUNT_USERNAME")
  }
}

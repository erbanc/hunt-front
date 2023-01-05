import {Component} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {UserInfo, UserService} from "../user/user.service";
import {QuestionService} from "../question/question.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  username: string | undefined;
  isConnected = false;
  questionReached: bigint | undefined;

  constructor(private cookieService: CookieService, private userService: UserService, private questionService: QuestionService) {
  }

  ngOnInit(): void {

    this.username = this.cookieService.get("THE_HUNT_USERNAME")
    if (!!this.username) {
      this.isConnected = true
      this.getUserInfos(this.username)
    }
  }

  getUserInfos(username: string) {

    this.userService.getUserInfos(username).subscribe((data: UserInfo) => {
      const userInfo = {...data};
      this.questionReached = userInfo.questionReached
    })
  }
}

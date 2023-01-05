import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Question}   from "./stats.component";

export interface UserStats {
  username: string,
  questionReached: bigint,
  totalWrongGuesses: bigint,
  totalGuesses: bigint,
  rank: bigint
}

export interface Leaderboard {
  users: Map<string, UserStats>,
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private httpClient: HttpClient) {
  }

  getUserStats(username: string) {

    return this.httpClient.get<UserStats>("http://localhost:8080/hunt/api/stats/", {
      username: username
    })
  }

  getLeaderboard(questionId: string) {

    return this.httpClient.get<Leaderboard>("http://localhost:8080/hunt/api/stats/leaderboard")
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService}  from "../user/user.service";
import {StatsService} from "./stats.service";
import {FormBuilder}  from "@angular/forms";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  questionId: string | null = ""

  currentQuestion: Question = {id: "", name: "", html: "", text: "Chargement..."}

  answerForm = this.formBuilder.group({
    answer: '',
  });

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private questionService: StatsService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {

    this.getUserStats(this.userService.getUsername())

    this.getLeaderboard()
  }

  private getUserStats(username: string) {

    if (question) {
      this.questionService.isQuestionAccessible(username, question).subscribe((isValid: boolean) => {
        if (!isValid) {
          this.router.navigate(['/404'])
        }
      })
    } else {
      this.router.navigate(['/404'])
    }
  }

  private getCurrentQuestion() {

    if (this.questionId) {
      this.questionService.getQuestion(this.questionId).subscribe((data: Question) => {
        this.currentQuestion = data
        document.title = data.name
      }, () => this.currentQuestion = {
        id: "",
        name: "",
        html: "",
        text: "Erreur de chargement de la question"
      })
    }
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
  }

  onSubmit(): void {
    const answer = this.answerForm.value.answer;
    const username = this.userService.getUsername();
    if (!!answer) {
      this.questionService.answer(answer, this.currentQuestion.id, username).subscribe((goodAnswer: boolean) => {
        if (goodAnswer) {
          this.toastrService.success("Bravo !")
          this.redirectTo('/questions/' + (this.currentQuestion.id + 1))
        } else {
          this.toastrService.error("Mauvaise réponse :(")
        }
      })
    }
  }
}

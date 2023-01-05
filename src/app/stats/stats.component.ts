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


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private statsService: StatsService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {

  }
}

import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";

@Component({    
    selector:'app-navigation-bar',    
    templateUrl:'./navigation-bar.component.html',    
    styleUrls:['./navigation-bar.component.css']    
    })  
export class NavigationBarComponent{

    constructor(private cookieService: CookieService, private toastrService: ToastrService, private route: ActivatedRoute, private router: Router) {
    }

    onLogout() {
        this.cookieService.delete("THE_HUNT_USERNAME")
        location.reload()
    }

    onSignIn() {
        this.router.navigate(['/sign-in'])
    }
} 
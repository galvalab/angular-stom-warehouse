import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { MatSnackBar } from "@angular/material/snack-bar";

import { UrlPathService } from "../shared/url-path.service";
import { StomWsService } from "../shared/stom-ws.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit {
  hide = true;
  durationInSeconds = 5;

  constructor(
    private router: Router,
    private urlpath: UrlPathService,
    private snackBar: MatSnackBar,
    private stomws: StomWsService
  ) {}

  ngOnInit() {
    this.urlpath.setHeaderText("STOMWS");
    this.urlpath.setBackButton(false);
    this.urlpath.setLogoutMenu(false);

    this.loggingOut();
  }

  openSnackBar() {
    this.snackBar.openFromComponent(WrongCredSnackbarComponent, {
      duration: this.durationInSeconds * 1000
    });
  }

  getAgentID(username: string, password: string) {
    // Start the animation
    this.urlpath.setLoadingAnimation(true);
    this.stomws.mobileLogin(username, password).subscribe(resp => {
      if (resp === null) {
        this.openSnackBar();
      } else {
        const agentid = String(resp.Body.Row[0][0]);
        const sessionCode = String(resp.Body.Row[0][1]);
        const groupid = String(resp.Body.Row[0][2]);

        if (String(sessionCode).length > 0) {
          localStorage.setItem("sessionCode", sessionCode);

          this.router.navigateByUrl(
            "/" + groupid + "/" + agentid + "/warehouse"
          );
        } else {
          this.openSnackBar();
        }
      }
      this.urlpath.setLoadingAnimation(false);
    });
  }

  loggingOut() {
    this.stomws.mobileLogout().subscribe(resp => {
      localStorage.clear();

      this.router.navigateByUrl("/");
    });
  }
}

@Component({
  selector: "app-wrong-cred",
  templateUrl: "wrong-cred-snackbar.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class WrongCredSnackbarComponent {}

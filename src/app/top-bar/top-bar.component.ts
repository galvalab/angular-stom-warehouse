import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";

import { UrlPathService } from "../shared/url-path.service";

@Component({
  selector: "app-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"]
})
export class TopBarComponent implements OnInit {
  prevroute: string;
  headerText: string;
  backButton: string;

  groupid: string;
  agentid: string;
  customerid: string;

  showProgressBar: boolean;

  logoutMenu = true;

  constructor(
    private prevurl: UrlPathService,
    private actRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.prevurl.sharedPrevUrl.subscribe(url => {
      this.prevroute = url;
    });

    this.prevurl.sharedHeaderText.subscribe(headerText => {
      this.headerText = headerText;
    });

    this.prevurl.sharedBackButton.subscribe(backButton => {
      this.backButton = backButton;
    });

    this.prevurl.sharedLoadingAnimation.subscribe(isdisplayed => {
      this.showProgressBar = isdisplayed;
    });

    this.prevurl.sharedLogoutMenu.subscribe(isdisplayed => {
      this.logoutMenu = isdisplayed;
    });

    // Get Current URL
    this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        this.groupid = event.state.root.firstChild.params.groupid;
        this.agentid = event.state.root.firstChild.params.agentid;
        this.customerid = event.state.root.firstChild.params.customerid;
      }
    });
  }

  adminLogout() {
    this.router.navigateByUrl("/");
  }
}

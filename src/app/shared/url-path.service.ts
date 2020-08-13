import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { StomWsService } from "../shared/stom-ws.service";

@Injectable()
export class UrlPathService {
  private prevurl = new BehaviorSubject("/");
  sharedPrevUrl = this.prevurl;

  private headerText = new BehaviorSubject("STOMWH");
  sharedHeaderText = this.headerText;

  private backButton = new BehaviorSubject("keyboard_arrow_left");
  sharedBackButton = this.backButton;

  private loadingAnimation = new BehaviorSubject(false);
  sharedLoadingAnimation = this.loadingAnimation;

  constructor(private router: Router, private stomws: StomWsService) {}

  setPrevUrl(prevurl: string) {
    this.prevurl.next(prevurl);
  }

  setHeaderText(headerText: string) {
    this.headerText.next(headerText);
  }

  setBackButton(isBack: boolean) {
    if (isBack) {
      this.backButton.next("keyboard_arrow_left");
    } else {
      this.backButton.next("");
    }
  }

  setLoadingAnimation(isDisplay: boolean) {
    this.loadingAnimation.next(isDisplay);
  }
}

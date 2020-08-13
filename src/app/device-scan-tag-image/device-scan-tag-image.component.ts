import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { UrlPathService } from "../shared/url-path.service";
import { WebcamImage } from "ngx-webcam";

@Component({
  selector: "app-device-scan-tag-image",
  templateUrl: "./device-scan-tag-image.component.html",
  styleUrls: ["./device-scan-tag-image.component.css"]
})
export class DeviceScanTagImageComponent implements OnInit {
  constructor(
    private actRouter: ActivatedRoute,
    private router: Router,
    private urlpath: UrlPathService
  ) {}

  ngOnInit() {
    this.actRouter.paramMap.subscribe(params => {
      const groupid: string = params.get("groupid");
      const agentid: string = params.get("agentid");
      const warehouseid: string = params.get("warehouseid");
      const deviceid: string = params.get("deviceid");

      // Get previous router path
      const prevurl =
        "/" +
        groupid +
        "/" +
        agentid +
        "/warehouse/" +
        warehouseid +
        "/device/" +
        deviceid +
        "/tag";
      this.urlpath.setPrevUrl(prevurl);

      // Set Custom Header Text
      this.urlpath.setHeaderText("Capture QR CODE Image");

      // Clear first
      localStorage.removeItem("tagImageCaptured");
    });
  }

  handleImages(webcamImage: WebcamImage) {
    localStorage.setItem("tagImageCaptured", webcamImage.imageAsDataUrl);

    this.router.navigateByUrl(this.urlpath.sharedPrevUrl.value);
  }
}

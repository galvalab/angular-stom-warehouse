import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { UrlPathService } from "../shared/url-path.service";
import { WebcamImage } from "ngx-webcam";

@Component({
  selector: "app-device-scan-sn-image",
  templateUrl: "./device-scan-sn-image.component.html",
  styleUrls: ["./device-scan-sn-image.component.css"]
})
export class DeviceScanSnImageComponent implements OnInit {
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
        "/sn";
      this.urlpath.setPrevUrl(prevurl);

      // Set Custom Header Text
      this.urlpath.setHeaderText("Capture Barcode Page");

      // Clear first
      localStorage.removeItem("imageCaptured");
    });
  }

  handleImages(webcamImage: WebcamImage) {
    localStorage.setItem("imageCaptured", webcamImage.imageAsDataUrl);    
    
    this.router.navigateByUrl(this.urlpath.sharedPrevUrl.value);
  }
}

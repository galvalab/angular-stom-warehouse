import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { UrlPathService } from "../shared/url-path.service";

@Component({
  selector: "app-device-scan-tag-qrcode",
  templateUrl: "./device-scan-tag-qrcode.component.html",
  styleUrls: ["./device-scan-tag-qrcode.component.css"]
})
export class DeviceScanTagQrcodeComponent implements OnInit {
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
      this.urlpath.setHeaderText("Read QR Code Automatically");

      // Clear first
      localStorage.removeItem("qrcodeRead");
    });
  }

  onCodeResult(resultString: string) {
    localStorage.setItem("qrcodeRead", resultString);

    this.router.navigateByUrl(this.urlpath.sharedPrevUrl.value);
  }
}

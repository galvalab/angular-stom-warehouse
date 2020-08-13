import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { UrlPathService } from "../shared/url-path.service";

@Component({
  selector: "app-device-scan-sn-barcode",
  templateUrl: "./device-scan-sn-barcode.component.html",
  styleUrls: ["./device-scan-sn-barcode.component.css"]
})
export class DeviceScanSnBarcodeComponent implements OnInit {
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
      this.urlpath.setHeaderText("Read Barcode Automatically");

      // Clear first
      localStorage.removeItem("barcodeRead");
    });
  }

  onCodeResult(resultString: string) {
    localStorage.setItem("barcodeRead", resultString);

    this.router.navigateByUrl(this.urlpath.sharedPrevUrl.value);
  }
}

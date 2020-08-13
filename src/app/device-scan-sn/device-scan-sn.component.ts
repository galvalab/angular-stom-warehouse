import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Guid } from "guid-typescript";

import { UrlPathService } from "../shared/url-path.service";
import { StomWsService } from "../shared/stom-ws.service";
import { GeolocatorService } from "../shared/geolocator.service";

@Component({
  selector: "app-device-scan-sn",
  templateUrl: "./device-scan-sn.component.html",
  styleUrls: ["./device-scan-sn.component.css"]
})
export class DeviceScanSnComponent implements OnInit {
  agentid: string;
  groupid: string;
  deviceid: string;
  warehouseid: string;

  scanCoordinate: Position;
  barcodeResultString: string;
  imageResult;

  standbyRoute: string;

  constructor(
    private urlpath: UrlPathService,
    private actRouter: ActivatedRoute,
    private router: Router,
    private stomws: StomWsService,
    private geoloc: GeolocatorService
  ) {}

  ngOnInit() {
    this.actRouter.paramMap.subscribe(params => {
      this.warehouseid = params.get("warehouseid");
      this.groupid = params.get("groupid");
      this.agentid = params.get("agentid");
      this.deviceid = params.get("deviceid");

      this.standbyRoute =
        "/" +
        this.groupid +
        "/" +
        this.agentid +
        "/warehouse/" +
        this.warehouseid +
        "/device/" +
        this.deviceid;

      this.urlpath.setHeaderText("SN SCAN PAGE");
      this.urlpath.setBackButton(true);
      this.urlpath.setPrevUrl(this.standbyRoute);

      this.runInitProcedure();
    });
  }

  runInitProcedure() {
    this.stomws.mobileSessionValidation().subscribe(val => {
      if (val === "true") {
        this.runLocationService();

        this.getBarcodeFromStorage();
        this.getImageFromStorage();
      } else {
        this.router.navigateByUrl("/");
      }
    });
  }

  runLocationService() {
    this.geoloc.getCurrentPosition().subscribe((pos: Position) => {
      this.scanCoordinate = pos;
    });
  }

  getBarcodeFromStorage() {
    const barcodeRead = String(localStorage.getItem("barcodeRead"));

    if (barcodeRead === "null") {
      this.barcodeResultString = "#N/A";
    } else {
      this.barcodeResultString = barcodeRead;
    }
  }

  getImageFromStorage() {
    const imageCaptured = String(localStorage.getItem("imageCaptured"));

    if (imageCaptured === "null") {
      this.imageResult = "";
    } else {
      this.imageResult = imageCaptured;
    }
  }

  saveSnBarcode() {
    // Default set to Display Loading Animation
    this.urlpath.setLoadingAnimation(true);

    // Get previous data first
    this.stomws
      .getDeviceDetail(this.warehouseid, this.deviceid)
      .subscribe(devResp => {
        const storef = String(Guid.create()).toUpperCase();

        const devData = [
          this.replaceEmptyString(devResp.Body.Row[0][4]),
          this.replaceEmptyString(devResp.Body.Row[0][3]),
          this.replaceEmptyString(devResp.Body.Row[0][18]),
          devResp.Body.Row[0][19],

          String(this.scanCoordinate.coords.accuracy),
          String(this.scanCoordinate.coords.latitude),
          String(this.scanCoordinate.coords.longitude),
          String(this.scanCoordinate.timestamp),

          storef,
          this.barcodeResultString,

          this.replaceEmptyFloat(devResp.Body.Row[0][15]),
          this.replaceEmptyFloat(devResp.Body.Row[0][12]),
          this.replaceEmptyFloat(devResp.Body.Row[0][13]),
          this.replaceEmptyFloat(devResp.Body.Row[0][17]),
          this.replaceEmptyGuid(devResp.Body.Row[0][7]),
          this.replaceEmptyGuid(devResp.Body.Row[0][8]),

          devResp.Body.Row[0][2]
        ];

        const ext = "jpeg";
        const data_url = this.imageResult;

        // Save the image first
        this.stomws
          .addBarcodeImage(storef, ext, data_url)
          .subscribe(imgresp => {
            // Save the data then
            this.stomws
              .updateDevice(this.agentid, this.deviceid, devData)
              .subscribe(devUpdateResp => {
                // Clear local storage
                localStorage.removeItem("barcodeRead");
                localStorage.removeItem("imageCaptured");

                // Go to view page
                this.router.navigateByUrl(this.standbyRoute);

                // Stop Loading Animation
                this.urlpath.setLoadingAnimation(false);
              });
          });
      });

    this.router.navigateByUrl(this.standbyRoute);
  }

  replaceEmptyString(val: string) {
    if (val.length === 0) {
      return "-";
    } else {
      return val;
    }
  }

  replaceEmptyFloat(val: string) {
    if (val.length === 0) {
      return "NULL";
    } else {
      return val;
    }
  }

  replaceEmptyGuid(val: string) {
    if (val.length === 0) {
      return "00000000-0000-0000-0000-000000000000";
    } else {
      return val;
    }
  }
}

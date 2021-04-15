import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";

import { UrlPathService } from "../shared/url-path.service";
import { StomWsService } from "../shared/stom-ws.service";

@Component({
  selector: "app-device-detail",
  templateUrl: "./device-detail.component.html",
  styleUrls: ["./device-detail.component.css"]
})
export class DeviceDetailComponent implements OnInit {
  backUrl: string;

  sn: string;
  model: string;
  devAddress: string;

  snRead: string;
  snPicUrl: string;
  snGeo: string;

  tagRead: string;
  tagPicUrl: string;
  tagGeo: string;
  tagOrdinalNo: string;

  agentid: string;
  groupid: string;

  isUpdate = false;

  warehouseid: string;
  deviceid: string;

  deleteConfOne = false;
  deleteConfTwo = false;
  deleteConfThree = false;

  selectedReason: string;
  reason: string = "";

  constructor(
    private urlpath: UrlPathService,
    private actRouter: ActivatedRoute,
    private router: Router,
    private stomws: StomWsService
  ) {}

  ngOnInit() {
    this.actRouter.paramMap.subscribe(params => {
      this.warehouseid = params.get("warehouseid");
      this.deviceid = params.get("deviceid");

      this.groupid = params.get("groupid");
      this.agentid = params.get("agentid");

      this.backUrl =
        "/" +
        this.groupid +
        "/" +
        this.agentid +
        "/warehouse/" +
        this.warehouseid;

      this.LoadDeviceDetail(this.warehouseid, this.deviceid);

      this.urlpath.setHeaderText("Device Detail");
      this.urlpath.setBackButton(true);
      this.urlpath.setPrevUrl(this.backUrl);
    });
  }

  LoadDeviceDetail(cid: string, snid: string) {
    // Start the animation
    this.urlpath.setLoadingAnimation(true);

    this.stomws.mobileSessionValidation().subscribe(val => {
      if (val === "true") {
        this.stomws.getDeviceDetail(cid, snid).subscribe(res => {
          // Basic Info
          this.sn = res.Body.Row[0][2];
          this.model = res.Body.Row[0][3];
          this.devAddress = res.Body.Row[0][4];

          this.snRead = res.Body.Row[0][6];
          this.snGeo =
            String(res.Body.Row[0][10]) + ", " + String(res.Body.Row[0][11]);

          this.tagRead = res.Body.Row[0][8];
          this.tagGeo =
            String(res.Body.Row[0][12]) + ", " + String(res.Body.Row[0][13]);

          // Captured Image
          const snref: string = res.Body.Row[0][5];
          const tagref: string = res.Body.Row[0][7];

          if (snref.length === 0) {
            // do nothing
          } else {
            this.stomws.getImage(snref).subscribe(imgResp => {
              if (imgResp !== null) {
                this.snPicUrl = imgResp.Body.Row[0][2];
              }
            });
          }

          if (tagref.length === 0) {
            // do nothing
          } else {
            this.stomws.getImage(tagref).subscribe(imgResp => {
              if (imgResp !== null) {
                this.tagPicUrl = imgResp.Body.Row[0][2];
              }
            });
          }

          // Get Sequence no
          this.tagOrdinalNo = res.Body.Row[0][9];
        });
      } else {
        this.router.navigateByUrl("/");
      }

      // Stop the animation
      this.urlpath.setLoadingAnimation(false);
    });
  }

  updateDevice() {
    // Start the animation
    this.urlpath.setLoadingAnimation(true);

    // Get previous data first
    this.stomws
      .getDeviceDetail(this.warehouseid, this.deviceid)
      .subscribe(devResp => {
        const devData = [
          this.replaceEmptyString(this.devAddress),
          this.replaceEmptyString(this.model),
          this.replaceEmptyString(devResp.Body.Row[0][18]),
          devResp.Body.Row[0][19],

          this.replaceEmptyFloat(devResp.Body.Row[0][14]),
          this.replaceEmptyFloat(devResp.Body.Row[0][10]),
          this.replaceEmptyFloat(devResp.Body.Row[0][11]),
          this.replaceEmptyFloat(devResp.Body.Row[0][16]),
          this.replaceEmptyGuid(devResp.Body.Row[0][5]),
          this.replaceEmptyGuid(devResp.Body.Row[0][6]),

          this.replaceEmptyFloat(devResp.Body.Row[0][15]),
          this.replaceEmptyFloat(devResp.Body.Row[0][12]),
          this.replaceEmptyFloat(devResp.Body.Row[0][13]),
          this.replaceEmptyFloat(devResp.Body.Row[0][17]),
          this.replaceEmptyGuid(devResp.Body.Row[0][7]),
          this.replaceEmptyGuid(devResp.Body.Row[0][8]),

          this.sn
        ];

        // Save the data then
        this.stomws
          .updateDevice(this.agentid, this.deviceid, devData)
          .subscribe(devUpdateResp => {
            this.isUpdate = false;

            // Stop Loading Animation
            this.urlpath.setLoadingAnimation(false);
          });
      });
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

  deleteDevice() {
    console.log(this.selectedReason);
    console.log(this.reason);
    this.stomws.deleteDevice(this.agentid, this.deviceid, this.selectedReason, this.reason).subscribe(resp => {
      this.router.navigateByUrl(this.backUrl);
    });
  }
}

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Guid } from "guid-typescript";

import { UrlPathService } from "../shared/url-path.service";
import { StomWsService } from "../shared/stom-ws.service";
import { GeolocatorService } from "../shared/geolocator.service";

@Component({
  selector: "app-device-move",
  templateUrl: "./device-move.component.html",
  styleUrls: ["./device-move.component.css"]
})
export class DeviceMoveComponent implements OnInit, OnDestroy {
  scannerEnabled = true;

  groupid: string;
  agentid: string;
  warehouseid: string;

  QrResult = [[]];

  scanCoordinate: Position;
  imageResult: string;
  qrRead: string;

  validToSave = false;

  dumbToPreventDestroy = false;

  constructor(
    private actRouter: ActivatedRoute,
    private router: Router,
    private urlpath: UrlPathService,
    private stomws: StomWsService,
    private geoloc: GeolocatorService
  ) {}

  ngOnInit() {
    this.actRouter.paramMap.subscribe(params => {
      this.groupid = params.get("groupid");
      this.agentid = params.get("agentid");
      this.warehouseid = params.get("warehouseid");

      // Get previous router path
      const prevurl =
        "/" +
        this.groupid +
        "/" +
        this.agentid +
        "/warehouse/" +
        this.warehouseid;
      this.urlpath.setPrevUrl(prevurl);

      // Set Custom Header Text
      this.urlpath.setHeaderText("Add By QR Scanning");

      // Get location
      this.runLocationService();
    });
  }

  ngOnDestroy() {
    if (!this.dumbToPreventDestroy) {
      this.clearStorage();
    }
  }

  onCodeResult(resultString: string) {
    // Disable scanner
    this.scannerEnabled = false;

    // Save to local storage, because this component is come and go
    localStorage.setItem("qrCodeTagRead", resultString);
    this.qrRead = resultString;

    // Get captured image, if not already exist
    const imageCaptured = String(localStorage.getItem("whQrCodeImage"));
    if (imageCaptured === "null") {
      // Flag to not destroy storage
      this.dumbToPreventDestroy = true;

      this.router.navigateByUrl(
        "/" +
          this.groupid +
          "/" +
          this.agentid +
          "/warehouse/" +
          this.warehouseid +
          "/move/image"
      );
    } else {
      this.imageResult = imageCaptured;

      // Get data from db
      this.stomws.checkQrCode(resultString).subscribe(resp => {
        resp.Body.Row.forEach(item => {
          this.QrResult.push(item);
        });
      });

      // Activate the move button
      this.validToSave = true;
    }
  }

  runLocationService() {
    this.geoloc.getCurrentPosition().subscribe((pos: Position) => {
      this.scanCoordinate = pos;
    });
  }

  clearStorage() {
    this.imageResult = "";

    this.validToSave = false;

    localStorage.removeItem("whQrCodeImage");
    localStorage.removeItem("qrCodeTagRead");

    this.imageResult = "";
  }

  moveDeviceToWarehouse() {
    const ext = "jpeg";
    const data_url = this.imageResult;
    const storef = String(Guid.create()).toUpperCase();

    // Save the image first
    this.stomws.addBarcodeImage(storef, ext, data_url).subscribe(imgresp => {
      // move the device then
      this.stomws
        .moveDevice(
          String(this.warehouseid),
          String(this.agentid),
          String(this.scanCoordinate.coords.accuracy),
          String(this.scanCoordinate.coords.latitude),
          String(this.scanCoordinate.coords.longitude),
          String(this.scanCoordinate.timestamp),
          storef,
          this.qrRead
        )
        .subscribe(res => {
          console.log(res);
          //Clear storage
          this.clearStorage();

          const deviceid: string = res.Body.Row[0][0];

          // Navigate to device detail
          this.router.navigateByUrl(
            "/" +
              this.groupid +
              "/" +
              this.agentid +
              "/warehouse/" +
              this.warehouseid +
              "/device/" +
              deviceid
          );
        });
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

import { ActivatedRoute, Router } from "@angular/router";

import { UrlPathService } from "../shared/url-path.service";
import { StomWsService } from "../shared/stom-ws.service";

export interface DeviceElement {
  CID: string;
  SNID: string;
  SerialNumber: string;
  DeviceModel: string;
  DeviceAddress: string;
  SnPicRef: string;
  SnRead: string;
  TagPicRef: string;
  TagRead: string;
  AssetNo: string;
}

@Component({
  selector: "app-device-list",
  templateUrl: "./device-list.component.html",
  styleUrls: ["./device-list.component.css"]
})
export class DeviceListComponent implements OnInit {
  highlightedRows = [];
  displayedColumns: string[] = ["SerialNumber"];

  dataSource = new MatTableDataSource<DeviceElement>();
  rowCount = -1;

  agentid: string;
  groupid: string;
  warehouseid: string;

  constructor(
    private urlpath: UrlPathService,
    private actRouter: ActivatedRoute,
    private router: Router,
    private stomws: StomWsService
  ) {}

  ngOnInit() {
    this.actRouter.paramMap.subscribe(params => {
      this.warehouseid = params.get("warehouseid");

      this.groupid = params.get("groupid");
      this.agentid = params.get("agentid");

      this.LoadDeviceList(this.warehouseid);

      this.urlpath.setHeaderText("Devices");
      this.urlpath.setBackButton(true);
      this.urlpath.setPrevUrl(
        "/" + this.groupid + "/" + this.agentid + "/warehouse"
      );
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  LoadDeviceList(warehouseid: string) {
    // Start the animation
    this.urlpath.setLoadingAnimation(true);

    this.stomws.mobileSessionValidation().subscribe(val => {
      if (val === "true") {
        this.stomws.getDeviceList(warehouseid).subscribe(res => {
          let tempData: Array<DeviceElement> = [];

          res.Body.Row.forEach(item => {
            const devItem: DeviceElement = {
              CID: item[0],
              SNID: item[1],
              SerialNumber: item[2],
              DeviceModel: item[3],
              DeviceAddress: item[4],
              SnPicRef: item[5],
              SnRead: item[6],
              TagPicRef: item[7],
              TagRead: item[8],
              AssetNo: item[9]
            };

            tempData.push(devItem);
          });

          this.dataSource.data = [];
          this.dataSource.data = tempData;

          this.rowCount = tempData.length;
        });
      } else {
        this.router.navigateByUrl("/");
      }

      // Stop the animation
      this.urlpath.setLoadingAnimation(false);
    });
  }

  rowClicked(row) {
    this.highlightedRows = [];
    this.highlightedRows.push(row);

    // console.log(row);
    this.router.navigateByUrl(
      "/" +
        this.groupid +
        "/" +
        this.agentid +
        "/warehouse/" +
        row.CID +
        "/device/" +
        row.SNID
    );
  }

  newDevice() {
    // Send new device request
    this.stomws.addNewDevice(this.agentid, this.warehouseid).subscribe(resp => {
      // console.log(resp.Body.Row[0][0]);

      this.router.navigateByUrl(
        "/" +
          this.groupid +
          "/" +
          this.agentid +
          "/warehouse/" +
          this.warehouseid +
          "/device/" +
          resp.Body.Row[0][0]
      );
    });
  }

  moveDevice() {
    this.router.navigateByUrl(
      "/" +
        this.groupid +
        "/" +
        this.agentid +
        "/warehouse/" +
        this.warehouseid +
        "/move"
    );
  }
}

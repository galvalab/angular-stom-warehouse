import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

import { ActivatedRoute, Router } from "@angular/router";

import { UrlPathService } from "../shared/url-path.service";
import { StomWsService } from "../shared/stom-ws.service";

export interface WarehouseElement {
  CID: string;
  CustomerName: string;
  ContactName: string;
  ContactNo: string;
}

@Component({
  selector: "app-warehouse-list",
  templateUrl: "./warehouse-list.component.html",
  styleUrls: ["./warehouse-list.component.css"]
})
export class WarehouseListComponent implements OnInit {
  highlightedRows = [];
  displayedColumns: string[] = ["CustomerName"];

  dataSource = new MatTableDataSource<WarehouseElement>();
  rowCount = -1;

  agentid: string;
  groupid: string;

  constructor(
    private urlpath: UrlPathService,
    private actRouter: ActivatedRoute,
    private router: Router,
    private stomws: StomWsService
  ) {}

  ngOnInit() {
    this.actRouter.paramMap.subscribe(params => {
      this.LoadWarehouseList();

      this.groupid = params.get("groupid");
      this.agentid = params.get("agentid");

      this.urlpath.setHeaderText("Warehouse");
      this.urlpath.setBackButton(false);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  LoadWarehouseList() {
    // Start the animation
    this.urlpath.setLoadingAnimation(true);

    this.stomws.mobileSessionValidation().subscribe(val => {
      if (val === "true") {
        this.stomws.getWarehouseList().subscribe(res => {
          let tempData: Array<WarehouseElement> = [];

          res.Body.Row.forEach(item => {
            const whItem: WarehouseElement = {
              CID: item[0],
              CustomerName: item[1],
              ContactName: item[2],
              ContactNo: item[3]
            };

            tempData.push(whItem);
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

    // console.log(row.CID);
    this.router.navigateByUrl("/" + this.groupid + "/" + this.agentid + "/warehouse/" + row.CID);
  }
}

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginPageComponent } from "./login-page/login-page.component";
import { WarehouseListComponent } from "./warehouse-list/warehouse-list.component";
import { DeviceListComponent } from "./device-list/device-list.component";
import { DeviceDetailComponent } from "./device-detail/device-detail.component";
import { DeviceScanSnComponent } from "./device-scan-sn/device-scan-sn.component";
import { DeviceScanSnBarcodeComponent } from "./device-scan-sn-barcode/device-scan-sn-barcode.component";
import { DeviceScanSnImageComponent } from "./device-scan-sn-image/device-scan-sn-image.component";

import { DeviceScanTagComponent } from "./device-scan-tag/device-scan-tag.component";
import { DeviceScanTagQrcodeComponent } from "./device-scan-tag-qrcode/device-scan-tag-qrcode.component";
import { DeviceScanTagImageComponent } from "./device-scan-tag-image/device-scan-tag-image.component";

import { DeviceMoveComponent } from "./device-move/device-move.component";
import { DeviceMoveImageComponent } from "./device-move-image/device-move-image.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginPageComponent },

  { path: ":groupid/:agentid/warehouse", component: WarehouseListComponent },
  { path: ":groupid/:agentid/warehouse/:warehouseid", component: DeviceListComponent },

  { path: ":groupid/:agentid/warehouse/:warehouseid/device/:deviceid", component: DeviceDetailComponent },

  { path: ":groupid/:agentid/warehouse/:warehouseid/device/:deviceid/sn", component: DeviceScanSnComponent },
  { path: ":groupid/:agentid/warehouse/:warehouseid/device/:deviceid/sn/barcode", component: DeviceScanSnBarcodeComponent },
  { path: ":groupid/:agentid/warehouse/:warehouseid/device/:deviceid/sn/image", component: DeviceScanSnImageComponent },

  { path: ":groupid/:agentid/warehouse/:warehouseid/device/:deviceid/tag", component: DeviceScanTagComponent },
  { path: ":groupid/:agentid/warehouse/:warehouseid/device/:deviceid/tag/qrcode", component: DeviceScanTagQrcodeComponent },
  { path: ":groupid/:agentid/warehouse/:warehouseid/device/:deviceid/tag/image", component: DeviceScanTagImageComponent },

  { path: ":groupid/:agentid/warehouse/:warehouseid/move", component: DeviceMoveComponent },
  { path: ":groupid/:agentid/warehouse/:warehouseid/move/image", component: DeviceMoveImageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";

import { A11yModule } from "@angular/cdk/a11y";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
// import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { WebcamModule } from "ngx-webcam";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello/hello.component";
import {
  LoginPageComponent,
  WrongCredSnackbarComponent
} from "./login-page/login-page.component";
import { TopBarComponent } from "./top-bar/top-bar.component";

import { UrlPathService } from "./shared/url-path.service";
import { StomWsService } from "./shared/stom-ws.service";
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { DeviceScanSnComponent } from './device-scan-sn/device-scan-sn.component';
import { GeolocatorService } from './shared/geolocator.service';
import { DeviceScanSnBarcodeComponent } from './device-scan-sn-barcode/device-scan-sn-barcode.component';
import { CameraComponent } from './camera/camera.component';
import { DeviceScanSnImageComponent } from './device-scan-sn-image/device-scan-sn-image.component';
import { DeviceScanTagComponent } from './device-scan-tag/device-scan-tag.component';
import { DeviceScanTagQrcodeComponent } from './device-scan-tag-qrcode/device-scan-tag-qrcode.component';
import { DeviceScanTagImageComponent } from './device-scan-tag-image/device-scan-tag-image.component';
import { DeviceMoveComponent } from './device-move/device-move.component';
import { DeviceMoveImageComponent } from './device-move-image/device-move-image.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    HttpClientModule,
    
    AppRoutingModule,

    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    // MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,

    ZXingScannerModule,
    WebcamModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    LoginPageComponent,
    WrongCredSnackbarComponent,

    TopBarComponent,

    WarehouseListComponent,

    DeviceListComponent,

    DeviceDetailComponent,

    DeviceScanSnComponent,

    DeviceScanSnBarcodeComponent,

    CameraComponent,

    DeviceScanSnImageComponent,

    DeviceScanTagComponent,

    DeviceScanTagQrcodeComponent,

    DeviceScanTagImageComponent,

    DeviceMoveComponent,

    DeviceMoveImageComponent
  ],
  bootstrap: [AppComponent],
  providers: [UrlPathService, StomWsService, GeolocatorService],

  entryComponents: [WrongCredSnackbarComponent]
})
export class AppModule {}

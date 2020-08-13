import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { startWith } from "rxjs/operators";
import { Guid } from "guid-typescript";

export interface wsResponseType {
  Header: {
    Status: string;
    Description: string;
  };
  Body: {
    ColumnName: Array<string>;
    Row: Array<Array<string>>;
  };
}

@Injectable()
export class StomWsService {
  constructor(private http: HttpClient) {}

  mobileLogin(username: string, password: string) {
    const url =
      "https://dems.galva.co.id/stom/warehouse/StomWHLoginVerification.ashx";

    const formData: any = new FormData();
    formData.append("user", username);
    formData.append("pass", password);

    return this.http.post<wsResponseType>(url, formData);
  }

  mobileSessionValidation() {
    return Observable.create(param => {
      const url =
        "https://dems.galva.co.id/stom/warehouse/StomWHLoginValidation.ashx";

      const formData: any = new FormData();
      formData.append(
        "SessionCode",
        String(localStorage.getItem("sessionCode"))
      );

      this.http.post<wsResponseType>(url, formData).subscribe(isValid => {
        param.next(String(isValid.Body.Row[0][0]).toLowerCase());

        param.complete();
      });
    });
  }

  mobileLogout() {
    const url = "https://dems.galva.co.id/stom/warehouse/StomWHLogout.ashx";

    const sessionCode = localStorage.getItem("sessionCode");

    const formData: any = new FormData();
    formData.append("SessionCode", sessionCode);

    return this.http.post<wsResponseType>(url, formData);
  }

  /////////////////////////////////////////////
  getWarehouseList() {
    const url =
      "https://dems.galva.co.id/stom/warehouse/StomWHGetWarehouseList.ashx";

    const sessionCode = localStorage.getItem("sessionCode");

    const formData: any = new FormData();
    formData.append("SessionCode", sessionCode);

    return this.http.post<wsResponseType>(url, formData);
  }

  /////////////////////////////////////////////
  getDeviceList(cid: string) {
    const url =
      "https://dems.galva.co.id/stom/warehouse/StomWHGetWHDeviceList.ashx";

    const sessionCode = localStorage.getItem("sessionCode");

    const formData: any = new FormData();
    formData.append("SessionCode", sessionCode);
    formData.append("cid", cid);

    return this.http.post<wsResponseType>(url, formData);
  }

  /////////////////////////////////////////////
  getDeviceDetail(cid: string, snid: string) {
    const url =
      "https://dems.galva.co.id/stom/warehouse/StomWHGetWHDeviceList.ashx";

    const sessionCode = localStorage.getItem("sessionCode");

    const formData: any = new FormData();
    formData.append("SessionCode", sessionCode);
    formData.append("cid", cid);
    formData.append("snid", snid);

    return this.http.post<wsResponseType>(url, formData);
  }

  ////////////////////////////#######################////////////////////////////
  // IMAGE
  getImage(storef: string) {
    return this.http.get<wsResponseType>(
      "https://dems.galva.co.id/stom/mobile/GetStomImage.ashx?storef=" + storef
    );
  }

  ////////////////////////////
  updateDevice(agentid: string, snid: string, snData: Array<string>) {
    const url =
      "https://dems.galva.co.id/stom/warehouse/StomWHUpdateDevice.ashx";

    const sessionCode = localStorage.getItem("sessionCode");

    const formData: any = new FormData();
    formData.append("SessionCode", sessionCode);

    formData.append("agentid", agentid);
    formData.append("snid", snid);

    formData.append("devaddr", snData[0]);
    formData.append("devmodel", snData[1]);
    formData.append("devowner", snData[2]);
    formData.append("isfinished", snData[3]);
    formData.append("snacc", snData[4]);
    formData.append("snlat", snData[5]);
    formData.append("snlong", snData[6]);
    formData.append("sntime", snData[7]);
    formData.append("snpicref", snData[8]);
    formData.append("snread", snData[9]);
    formData.append("tagacc", snData[10]);
    formData.append("taglat", snData[11]);
    formData.append("taglong", snData[12]);
    formData.append("tagtime", snData[13]);
    formData.append("tagpicref", snData[14]);
    formData.append("tagread", snData[15]);
    formData.append("sn", snData[16]);

    return this.http.post<wsResponseType>(url, formData);
  }

  ////////////////////////////#######################////////////////////////////
  addBarcodeImage(storef: string, ext: string, data_url: string) {
    return this.http.post<wsResponseType>(
      "https://dems.galva.co.id/stom/mobile/AddStomBarcodeImage.ashx?" +
        "storef=" +
        storef +
        "&ext=" +
        ext,
      data_url
    );
  }

  ////////////////////////////#######################////////////////////////////
  addQrcodeImage(snid: string, storef: string, ext: string, data_url: string) {
    return this.http.post<wsResponseType>(
      "https://dems.galva.co.id/stom/mobile/AddStomQrcodeImage.ashx?snid=" +
        snid +
        "&storef=" +
        storef +
        "&ext=" +
        ext,
      data_url
    );
  }

  ////////////////////////////////////////////////////////////////////////////////////
  addNewDevice(agentid: string, warehouseid: string) {
    const url =
      "https://dems.galva.co.id/stom/warehouse/StomWHAddNewDevice.ashx";

    const sessionCode = localStorage.getItem("sessionCode");

    const formData: any = new FormData();
    formData.append("SessionCode", sessionCode);
    formData.append("agentid", agentid);
    formData.append("cid", warehouseid);

    return this.http.post<wsResponseType>(url, formData);
  }

  ////////////////////////////#######################////////////////////////////
  deleteDevice(agentid: string, snid: string) {
    return this.http.get<wsResponseType>(
      "https://dems.galva.co.id/stom/mobile/DeleteStomDevice.ashx?agentid=" +
        agentid +
        "&snid=" +
        snid
    );
  }

  ////////////////////////////////////////////////////////////////////////////////////
  checkQrCode(qrcode: string) {
    const url =
      "https://dems.galva.co.id/stom/warehouse/StomWHCheckQrCode.ashx";

    const sessionCode = localStorage.getItem("sessionCode");

    const formData: any = new FormData();
    formData.append("SessionCode", sessionCode);
    formData.append("qrcode", qrcode);

    return this.http.post<wsResponseType>(url, formData);
  }

  ////////////////////////////////////////////////////////////////////////////////////
  moveDevice(
    warehouseid: string,
    agentid: string,
    geoAcc: string,
    geoLat: string,
    geoLong: string,
    geoTms: string,
    picRef: string,
    tagRead: string
  ) {
    const url =
      "https://dems.galva.co.id/stom/warehouse/StomWHMoveToWarehouse.ashx";

    const sessionCode = localStorage.getItem("sessionCode");

    const formData: any = new FormData();
    formData.append("SessionCode", sessionCode);
    formData.append("warehouseid", warehouseid);
    formData.append("agentid", agentid);
    formData.append("geoAcc", geoAcc);
    formData.append("geoLat", geoLat);
    formData.append("geoLong", geoLong);
    formData.append("geoTms", geoTms);
    formData.append("picRef", picRef);
    formData.append("tagRead", tagRead);

    return this.http.post<wsResponseType>(url, formData);
  }
}

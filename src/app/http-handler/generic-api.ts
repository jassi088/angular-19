import {
  IApi,
  ServerDataModel,
  ServerPageInput,
  ServerPageModel,
} from './contracts/api';
import * as _ from 'lodash';
import { IGetParams } from './contracts/api/get-params.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Subscription } from 'rxjs';
declare let Reflect: any;

export class GenericApi<TModel> implements IApi<TModel> {
  private rootUrl: string;

  get(id: string): Promise<TModel> {
    return this.http
      .get<ServerDataModel<TModel>>(`${this.rootUrl}/${this.key}/${id}`)
      .toPromise()
      .then((response) => {
        if (!response?.isSuccess) {
          return this.handleError(
            response?.error || response?.message || response?.code || 'failed'
          );
        }
        return response.data;
      })
      .catch(this.handleError);
  }

  simpleGet(input?: IGetParams): Promise<TModel> {
    let url: string = `${this.rootUrl}/${this.key}`;
    let parms: HttpParams | null = null;

    if (input) {
      parms = input.serverPageInput
        ? this.getQueryParams(input.serverPageInput)
        : null;
      url = input.id ? `${url}/${input.id}` : url;
      url = input.path ? `${url}/${input.path}` : url;
      if (input.api) url = input.api;
    }
    return this.http
      .get<ServerDataModel<TModel>>(url, { params: parms as any })
      .toPromise()
      .then((response) => {
        if (!response?.isSuccess) {
          return this.handleError(
            response?.error || response?.message || response?.code || 'failed'
          );
        }
        return response.data;
      })
      .catch(this.handleError);
  }
  search(
    input: ServerPageInput,
    subscriptionCallBack: (s: Subscription) => any
  ): Promise<ServerPageModel<TModel>> {
    let parms: HttpParams = this.getQueryParams(input);
    const observable = this.http.get<ServerPageModel<TModel>>(
      `${this.rootUrl}/${this.key}`,
      { params: parms }
    );
    return new Promise((res, rej) => {
      const subscription = observable.subscribe(
        (response) => {
          if (!response.isSuccess) {
            return this.handleError(
              response.message || response.code || response.error || 'failed'
            ).catch(rej);
          }
          return res(response);
        },
        async (err) => {
          this.handleError(err).catch(rej);
        }
      );
      subscriptionCallBack(subscription);
    });
  }

  create(model: TModel, path?: string, api?: string): Promise<TModel> {
    let url: string = `${this.rootUrl}/${this.key}`;
    url = path ? `${url}/${path}` : url;
    if (api) {
      url = `${this.rootUrl}/${api}`;
    }

    return this.http
      .post<ServerDataModel<TModel>>(url, model)
      .toPromise()
      .then((response) => {
        if (!response?.isSuccess) {
          return this.handleError(
            response?.error || response?.message || response?.code || 'failed'
          );
        }
        return response.data;
      })
      .catch(this.handleError);
  }

  exportReport(
    input: ServerPageInput,
    path: string | null = null,
    reportName: string = 'downloaded_file'
  ): Promise<any> {
    let parms: HttpParams = this.getQueryParams(input);
    let apiPath: string = path
      ? `${this.rootUrl}/${path}`
      : `${this.rootUrl}/${this.key}`;

    return this.http
      .get<Blob>(apiPath, { params: parms, responseType: 'blob' as 'json' })
      .toPromise()
      .then((resposne) => {
        // const url = window.URL.createObjectURL(resposne);

        // const link = this.downloadZipLink.nativeElement;
        // link.href = url;
        // link.download = 'archive.zip';
        // link.click();

        // window.URL.revokeObjectURL(url);
        // let contentType = resposne.headers.get("content-type") || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

        // // get the headers' content disposition
        // let cd = resposne.headers.get("content-disposition") || resposne.headers.get("Content-Disposition");

        // // get the file name with regex
        // let regex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        // let match = regex.exec(cd);

        // // is there a fiel name?
        // let fileName = match && match[1] || "report";
        // if (reportName)
        //   fileName = reportName;

        // // replace leading and trailing slashes that C# added to your file name
        // fileName = fileName.replace(/\"/g, "");

        // let blob = new Blob([resposne['_body']], { type: contentType });
        let blob: any = resposne;
        // if (navigator.msSaveBlob) {
        //   navigator.msSaveBlob(blob, reportName);
        // }
        //  else {
        let objectUrl = window.URL.createObjectURL(blob);
        // window.open(objectUrl);
        let a = document.createElement('a');
        a.href = objectUrl;
        a.download = reportName;
        a.click();
        URL.revokeObjectURL(objectUrl);
        document.body.appendChild(a);
        document.body.removeChild(a);
        // }

        return true;
      })
      .catch(this.handleError);
  }

  simpePost(model: any): Promise<any> {
    return this.http
      .post<ServerDataModel<any>>(`${this.rootUrl}/${this.key}`, model)
      .toPromise()
      .then((response) => {
        if (!response?.isSuccess) {
          return this.handleError(
            response?.error || response?.message || response?.code || 'failed'
          );
        }
        return response.data;
      })
      .catch(this.handleError);
  }

  update(
    id: string,
    model: TModel,
    input?: ServerPageInput,
    path?: string,
    api?: string
  ): Promise<TModel> {
    let parms: HttpParams | any;
    if (input) {
      parms = this.getQueryParams(input);
    }
    let url = path
      ? `${this.rootUrl}/${this.key}/${path}`
      : `${this.rootUrl}/${this.key}/${id}`;
    if (api) {
      url = `${this.rootUrl}/${api}`;
    }
    return this.http
      .put<ServerDataModel<TModel>>(url, model, { params: parms })
      .toPromise()
      .then((response) => {
        if (!response?.isSuccess) {
          return this.handleError(
            response?.error || response?.message || response?.code || 'failed'
          );
        }
        return response.data;
      })
      .catch(this.handleError);
  }

  remove(id: string): Promise<TModel> {
    return this.http
      .delete<ServerDataModel<TModel>>(`${this.rootUrl}/${this.key}/${id}`)
      .toPromise()
      .then((response) => {
        if (!response?.isSuccess) {
          return this.handleError(
            response?.error || response?.message || response?.code || 'failed'
          );
        }
        return response.data;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    if (error.status === 0) {
      return Promise.reject<string>('There is no internet connection');
    }
    if (error.status) {
      if (error.status === 403) {
        localStorage.clear();
        window.location.href = '/';
        // return null;
        return Promise.reject<string>('Your are logged Out');
      }
      return Promise.reject<string>(error.statusText);
    }
    if (
      (error.message && error.message == 'No user found with your token') ||
      error == 'No user found with your token'
    ) {
      localStorage.clear();
      window.location.href = '/';
    }
    return Promise.reject<string>(error.message || error);
  }

  private getQueryParams(input: ServerPageInput | null = null): HttpParams {
    let params: HttpParams = new HttpParams();
    if (input) {
      _.each(input, (value: any, key: string, obj: Object) => {
        if (key === 'query') {
          _.each(value, (keyVal: any, keyKey: string) => {
            if (keyVal) {
              params = params.set(keyKey, keyVal);
            }
          });
        } else {
          params = params.set(key, value);
        }
      });
    }
    return params;
  }

  constructor(
    private key: string,
    private http: HttpClient,
    private token?: string
  ) {
    this.rootUrl = `${environment.apiUrls.api}/api`;
  }
}

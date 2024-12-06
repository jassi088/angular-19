/* eslint-disable @typescript-eslint/no-explicit-any */
import { firstValueFrom } from 'rxjs';
import {
  IApi,
  ServerDataModel,
  ServerPageInput,
  ServerPageModel,
} from './contracts/api';
import _ from 'lodash';
import { IGetParams } from './contracts/api/get-params.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Subscription } from 'rxjs';

export class GenericApi<TModel> implements IApi<TModel> {
  private rootUrl: string;

  async get(id: string): Promise<TModel> {
    return firstValueFrom(
      this.http.get<ServerDataModel<TModel>>(`${this.rootUrl}/${this.key}/${id}`)
    )
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

  async simpleGet(input?: IGetParams): Promise<TModel> {
    let url = `${this.rootUrl}/${this.key}`;
    let parms: HttpParams | null = null;

    if (input) {
      parms = input.serverPageInput
        ? this.getQueryParams(input.serverPageInput)
        : null;
      url = input.id ? `${url}/${input.id}` : url;
      url = input.path ? `${url}/${input.path}` : url;
      if (input.api) url = input.api;
    }
    return firstValueFrom(
      this.http.get<ServerDataModel<TModel>>(url, { params: parms as any })
    )
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
    const parms: HttpParams = this.getQueryParams(input);
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

  async create(model: TModel, path?: string, api?: string): Promise<TModel> {
    let url = `${this.rootUrl}/${this.key}`;
    url = path ? `${url}/${path}` : url;
    if (api) {
      url = `${this.rootUrl}/${api}`;
    }

    return firstValueFrom(
      this.http.post<ServerDataModel<TModel>>(url, model)
    )
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

  async exportReport(
    input: ServerPageInput,
    path: string | null = null,
    reportName = 'downloaded_file'
  ): Promise<any> {
    const parms: HttpParams = this.getQueryParams(input);
    const apiPath: string = path
      ? `${this.rootUrl}/${path}`
      : `${this.rootUrl}/${this.key}`;

    return firstValueFrom(
      this.http.get<Blob>(apiPath, { params: parms, responseType: 'blob' as 'json' })
    )
      .then((resposne) => {
        const blob: any = resposne;
        const objectUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = objectUrl;
        a.download = reportName;
        a.click();
        URL.revokeObjectURL(objectUrl);
        document.body.appendChild(a);
        document.body.removeChild(a);
        return true;
      })
      .catch(this.handleError);
  }

  async simplePost(model: any): Promise<any> {
    return firstValueFrom(
      this.http.post<ServerDataModel<any>>(`${this.rootUrl}/${this.key}`, model)
    )
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

  async update(
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
    return firstValueFrom(
      this.http.put<ServerDataModel<TModel>>(url, model, { params: parms })
    )
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

  async remove(id: string): Promise<TModel> {
    return firstValueFrom(
      this.http.delete<ServerDataModel<TModel>>(`${this.rootUrl}/${this.key}/${id}`)
    )
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
        return Promise.reject<string>('You are logged out');
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
      _.each(input, (value: any, key: string) => {
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

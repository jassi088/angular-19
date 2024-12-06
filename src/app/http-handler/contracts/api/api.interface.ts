import { ServerPageInput } from './page-input';
import { ServerPageModel } from './server-page-model';
import { IGetParams } from './get-params.interface';
import { Subscription } from 'rxjs';

export interface IApi<TModel> {
  get(id: string): Promise<TModel>;
  simpleGet(input?: IGetParams): Promise<TModel>;
  simplePost(model: TModel): Promise<TModel>;
  create(model: TModel, path?: string, api?: string): Promise<TModel>;
  search(input: ServerPageInput, subscriptionCallBack: (s: Subscription) => void): Promise<ServerPageModel<TModel>>;
  update(id: string, model: TModel, input?: ServerPageInput, path?: string, api?: string): Promise<TModel>;
  remove(id: string): Promise<TModel>;
  exportReport(input: ServerPageInput, path?: string, reportName?: string): Promise<TModel>;
}

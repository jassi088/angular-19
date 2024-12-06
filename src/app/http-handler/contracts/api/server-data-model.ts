import { IRemoteData } from './remote-data.interface';

export class ServerDataModel<TModel> implements IRemoteData {
  isSuccess = false;
  code = '';
  message = '';
  error = '';
  items = [];
  data: TModel | null = null;
}

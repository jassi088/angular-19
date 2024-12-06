import { IRemoteData } from './remote-data.interface';

export class ServerPageModel<TModel> implements IRemoteData {
    isSuccess = false;
    code = '';
    error = '';
    message = '';
    pageNo = 1;
    pageSize = 0;
    total = 0;
    totalPage = 0;
    totalRecords = 0;
    data: TModel[] = [];
    items: TModel[] = [];
    stats: unknown;
}

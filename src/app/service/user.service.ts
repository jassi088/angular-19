import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IApi } from '../http-handler/contracts/api';
import { GenericApi } from '../http-handler/generic-api';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: IApi<User>;
  constructor(public http: HttpClient) {
    this.users = new GenericApi<User>('users', http);
  }

  async updateLocalUser() {
    try {
      const id = '';
      const d = await this.users.get(id);
      console.log(d);
    } catch (err) {
      console.log(err);
    }
  }
}

export class User {
  id!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  password!: string;
  token!: string;
  imgUrl!: string;
  phone!: number;
  status!: string;
  name!: string;
  deviceId?: string;
  deviceType?: string;
  countryCode?: string;
  role?: Role;
}

export class Role {
  id!: number;
  name!: string;
}
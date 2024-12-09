export class User {
  id!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  password!: string;
  imgUrl!: string;
  phone!: number;
  status!: string;
  name!: string;
  role?: Role;
}

export class Role {
  id!: number;
  name!: string;
  code!: string;
}
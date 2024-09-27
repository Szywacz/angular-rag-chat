export enum Role {
  'admin',
  'editor',
  'user',
}

export default interface User {
  accountName: string;
  role: Role;
}

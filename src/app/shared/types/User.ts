export enum Role {
  'admin',
  'editor',
  'user',
}

export default interface User {
  userId: string;
  accountName: string;
  role: Role;
}

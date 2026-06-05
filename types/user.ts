export type User = {
  _id: string;
  email: string;
  nickname: string;
  role: 'admin' | 'user';
  isApproved: boolean;
};

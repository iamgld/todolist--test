import { User } from './user';

export interface Todo {
  id: string;
  content: string;
  check: boolean;
  edit: boolean;
  date: number;
  minletter: number;
  alertMessage: {
    show: boolean;
    message: string;
  };
  owner: User;
}

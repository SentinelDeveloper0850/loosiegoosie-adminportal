export interface IMessage {
  _id: string;
  message: string;
  from: ISimpleUser;
  chat_id: string;
  created_at: string;
  __v?: 0;
}

export interface ISimpleUser {
  id: string;
  user_name: string;
  email_address: string;
}

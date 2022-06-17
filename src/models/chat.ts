export interface IChat {
  _id: string;
  name: string;
  type: string;
  client_id: string;
  attached_to_task: boolean;
  members: IMember[];
  created_at: string;
  __v: number;
}

export interface IMember {
  id: string;
  user_name: string;
  email_address: string;
}
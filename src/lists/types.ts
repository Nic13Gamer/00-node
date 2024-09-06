export interface List {
  id: string;
  name: string;
  description: string;
  inserted_at: string;
  updated_at: string;
}

export interface UpdateListParams {
  name?: string;
  description?: string;
}

export interface AddContactParams {
  contact_id: string;
}

export interface ListContact {
  id: string;
  list_id: string;
  contact_id: string;
  subscription_token: string;
  inserted_at: string;
  updated_at: string;
}

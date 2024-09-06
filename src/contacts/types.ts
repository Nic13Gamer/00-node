export interface Contact {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  inserted_at: string;
  updated_at: string;
}

export interface UpdateContactParams {
  email?: string;
  first_name?: string;
  last_name?: string;
}

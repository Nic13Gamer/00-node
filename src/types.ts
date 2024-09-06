export type GetOptions = {
  query?: { [key: string]: any };
};

export type PostOptions = {
  query?: { [key: string]: any };
};

export type PatchOptions = {
  query?: { [key: string]: any };
};

export type PutOptions = {
  query?: { [key: string]: any };
};

export interface ListMeta {
  current_page: number;
  page_size: number;
  previous_page: number | null;
  total_count: number;
  total_pages: number;
}

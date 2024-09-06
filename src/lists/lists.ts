import { DoubleZero } from '../core';
import { ListMeta } from '../types';
import { AddContactParams, List, ListContact, UpdateListParams } from './types';

export class Lists {
  constructor(private readonly doublezero: DoubleZero) {}

  async list(): Promise<{ data: List[]; meta?: ListMeta }> {
    const data = await this.doublezero.get<List[]>('/lists');

    return {
      data: data,
    };
  }

  async get(id: string): Promise<List> {
    const data = await this.doublezero.get<List>(`/lists/${id}`);

    return data;
  }

  async update(id: string, params: UpdateListParams): Promise<List> {
    const data = await this.doublezero.patch<List>(`/lists/${id}`, params);

    return data;
  }

  async delete(id: string): Promise<void> {
    await this.doublezero.delete(`/lists/${id}`);
  }

  async addContact(
    listId: string,
    params: AddContactParams
  ): Promise<ListContact> {
    const data = await this.doublezero.post<ListContact>(
      `/lists/${listId}/contacts`,
      params
    );

    return data;
  }

  async removeContact(
    listId: string,
    { contact_id }: { contact_id: string }
  ): Promise<void> {
    await this.doublezero.delete(`/lists/${listId}/contacts/${contact_id}`);
  }
}

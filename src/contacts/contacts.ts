import { DoubleZero } from '../core';
import { ListMeta } from '../types';
import { Contact, UpdateContactParams } from './types';

export class Contacts {
  constructor(private readonly doublezero: DoubleZero) {}

  async list(): Promise<{ data: Contact[]; meta: ListMeta }> {
    const data = await this.doublezero.get<{ data: Contact[]; meta: ListMeta }>(
      '/contacts'
    );

    return data;
  }

  async get(id: string): Promise<Contact> {
    const data = await this.doublezero.get<{ data: Contact }>(
      `/contacts/${id}`
    );

    return data.data;
  }

  async update(id: string, params: UpdateContactParams): Promise<Contact> {
    const data = await this.doublezero.patch<{ data: Contact }>(
      `/contacts/${id}`,
      params
    );

    return data.data;
  }

  async delete(id: string): Promise<void> {
    await this.doublezero.delete(`/contacts/${id}`);
  }
}

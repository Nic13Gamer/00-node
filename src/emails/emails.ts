import { DoubleZero } from '../core';
import {
  CreateBroadcastParams,
  CreateEmailParams,
  Email,
  EmailMessage,
} from './types';

export class Emails {
  constructor(private readonly doublezero: DoubleZero) {}

  async send(params: CreateEmailParams): Promise<{ id: string }> {
    const data = await this.doublezero.post<{ id: string }>('/emails', params);

    return data;
  }

  async broadcast(params: CreateBroadcastParams): Promise<{ id: string }> {
    const data = await this.doublezero.post<{ id: string }>(
      '/emails/broadcasts',
      params
    );

    return data;
  }

  async get(id: string): Promise<Email> {
    const data = await this.doublezero.get<{ data: Email }>(`/emails/${id}`);

    return data.data;
  }

  async getMessages(emailId: string): Promise<EmailMessage[]> {
    const data = await this.doublezero.get<{ data: EmailMessage[] }>(
      `/emails/${emailId}/messages`
    );

    return data.data;
  }
}

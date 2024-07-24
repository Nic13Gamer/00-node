import { DoubleZero } from '../core';
import { CreateBroadcastParams, CreateEmailParams } from './types';

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
}

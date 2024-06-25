import { DoubleZero } from '../core';
import { CreateEmailParams } from './types';

export class Emails {
  constructor(private readonly doublezero: DoubleZero) {}

  async send(params: CreateEmailParams): Promise<{ id: string }> {
    const data = await this.doublezero.post<{ id: string }>('/emails', params);

    return data;
  }
}

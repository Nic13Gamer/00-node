import { version } from '../package.json';
import { Contacts } from './contacts/contacts';
import { Emails } from './emails/emails';
import { DoubleZeroError } from './error';
import { Lists } from './lists/lists';
import { GetOptions, PatchOptions, PostOptions, PutOptions } from './types';

const defaultUserAgent = `00-node:${version}`;
const userAgent =
  typeof process !== 'undefined' && process.env
    ? process.env.DOUBLEZERO_USER_AGENT || defaultUserAgent
    : defaultUserAgent;

export class DoubleZero {
  private readonly headers: Headers;

  readonly emails = new Emails(this);
  readonly contacts = new Contacts(this);
  readonly lists = new Lists(this);

  constructor(readonly params: { baseUrl: string; token?: string }) {
    if (!params.token) {
      if (typeof process !== 'undefined' && process.env) {
        this.params.token = process.env.DOUBLEZERO_TOKEN;
      }
    }

    if (!this.params.token) {
      throw new Error(
        'Missing DoubleZero API token. Pass it to the constructor `new DoubleZero({ baseUrl: "https://example.com", token: "your_api_token" })`'
      );
    }

    this.headers = new Headers({
      Authorization: `Bearer ${this.params.token}`,
      'User-Agent': userAgent,
      'Content-Type': 'application/json',
    });
  }

  async fetchRequest<T>(path: string, options = {}): Promise<T> {
    const response = await fetch(`${this.params.baseUrl}/api${path}`, options);

    if (!response.ok) {
      throw new DoubleZeroError(`DoubleZero API error: ${response.statusText}`);
    }

    if (response.headers.get('content-length') === '0') {
      return {} as T;
    }

    const data = await response.json();

    if (data.error) {
      throw new DoubleZeroError(data.error);
    }

    return data;
  }

  async post<T>(path: string, payload?: unknown, options: PostOptions = {}) {
    const requestOptions = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(payload),
      ...options,
    };

    return await this.fetchRequest<T>(path, requestOptions);
  }

  async get<T>(path: string, options: GetOptions = {}) {
    const requestOptions = {
      method: 'GET',
      headers: this.headers,
      ...options,
    };

    return await this.fetchRequest<T>(path, requestOptions);
  }

  async put<T>(path: string, payload: any, options: PutOptions = {}) {
    const requestOptions = {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(payload),
      ...options,
    };

    return await this.fetchRequest<T>(path, requestOptions);
  }

  async patch<T>(path: string, payload: any, options: PatchOptions = {}) {
    const requestOptions = {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(payload),
      ...options,
    };

    return await this.fetchRequest<T>(path, requestOptions);
  }

  async delete<T>(path: string, query?: unknown) {
    const requestOptions = {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(query),
    };

    return await this.fetchRequest<T>(path, requestOptions);
  }
}

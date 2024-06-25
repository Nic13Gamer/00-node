import { version } from '../package.json';
import { DoubleZeroError } from './error';

const defaultUserAgent = `00-node:${version}`;
const userAgent =
  typeof process !== 'undefined' && process.env
    ? process.env.DOUBLEZERO_USER_AGENT || defaultUserAgent
    : defaultUserAgent;

export class DoubleZero {
  private readonly headers: Headers;

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
    const response = await fetch(`${this.params.baseUrl}${path}`, options);

    if (!response.ok) {
      throw new DoubleZeroError(`DoubleZero API error: ${response.statusText}`);
    }

    const data = (await response.json()).data;
    return data;
  }
}

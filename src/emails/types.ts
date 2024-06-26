export interface CreateEmailParams {
  from: string;
  to: string | string[];
  subject: string;
  reply_to?: string;

  bcc?: string | string[];
  cc?: string | string[];

  markdown?: string;
  html?: string;

  headers?: Record<string, string>;

  provider_options?: object;

  attachments?: {
    filename: string;
    content: string;
    content_type: string;
  }[];
}

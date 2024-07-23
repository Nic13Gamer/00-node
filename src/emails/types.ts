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

type Recipient =
  | string
  | ({
      type: 'list';
    } & ({ name: string } | { id: string }))
  | {
      type: 'email';
      email: string;
      [key: string]: any;
    };

export interface CreateBroadcastParams {
  from: string;
  recipients: Recipient[];
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

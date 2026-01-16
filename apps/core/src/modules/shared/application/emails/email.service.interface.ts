export interface IEmailSendOptions {
  to: string;
  subject: string;
  html: string;
}

export interface IEmailService {
  sendEmail(options: IEmailSendOptions): Promise<void>;
}

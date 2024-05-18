import { MailerOptions } from '@nestjs-modules/mailer';

export const mailerConfig: MailerOptions = {
  transport: {
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false,
    requireTLS: true,
    service: 'Gmail',
    auth: {
      user: '***@gmail.com',
      pass: '***',
    },
  },
  defaults: {
    from: '"No Reply" <no-reply@example.com>',
  },
};

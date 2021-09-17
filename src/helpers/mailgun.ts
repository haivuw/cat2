const mailgunSdk = require('mailgun-js');
const apiKey = process.env.MAILGUN_API_KEY;
const domain = `mail.${process.env.DOMAIN}`;
const mailgun = mailgunSdk({ apiKey, domain });

export async function sendMail(to, from, subject, html) {
  return await mailgun.messages().send({
    to,
    from,
    subject,
    html,
  });
}

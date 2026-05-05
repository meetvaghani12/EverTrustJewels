import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_APP_PASSWORD,
  },
});

export async function sendMail({
  subject,
  html,
}: {
  subject: string;
  html: string;
}) {
  return transporter.sendMail({
    from: `"EverTrust Jewels" <${process.env.SMTP_EMAIL}>`,
    to: process.env.SMTP_EMAIL,
    subject,
    html,
  });
}

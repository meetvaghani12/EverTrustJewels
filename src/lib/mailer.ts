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
  customerEmail,
  customerHtml,
  replyTo,
}: {
  subject: string;
  html: string;
  customerEmail?: string;
  customerHtml?: string;
  replyTo?: string;
}) {
  const from = `"EverTrust Jewels" <${process.env.SMTP_EMAIL}>`;

  // Send to business
  await transporter.sendMail({
    from,
    to: process.env.SMTP_EMAIL,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });

  // Send confirmation to customer
  if (customerEmail && customerHtml) {
    await transporter.sendMail({
      from,
      to: customerEmail,
      subject: "We've received your inquiry — EverTrust Jewels",
      html: customerHtml,
    });
  }
}

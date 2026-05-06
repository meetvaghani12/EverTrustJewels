import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, diamondId, message } =
      await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    await sendMail({
      subject: `New Contact Inquiry — ${subject || "General"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${phone || "—"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Subject</td><td style="padding:8px;">${subject || "—"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Diamond ID</td><td style="padding:8px;">${diamondId || "—"}</td></tr>
        </table>
        <h3>Message</h3>
        <p style="white-space:pre-wrap;">${message}</p>
      `,
      customerEmail: email,
      customerHtml: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="text-align:center;padding:20px 0;">
            <img src="https://evertrustjewels.com/images/brand/email-logo.png" alt="EverTrust Jewels" style="height:80px;" />
          </div>
          <h2 style="color:#333;">Thank you, ${name}!</h2>
          <p>We've received your inquiry and our diamond experts will get back to you within 24 hours.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
          <p style="color:#666;font-size:14px;"><strong>Your message:</strong></p>
          <p style="color:#666;font-size:14px;white-space:pre-wrap;">${message}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
          <p style="color:#999;font-size:12px;">EverTrust Jewels — Timeless Brilliance, Trusted Forever</p>
          <p style="color:#999;font-size:12px;">Phone: +91 82381 65370 | Email: evertrustjewels@gmail.com</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

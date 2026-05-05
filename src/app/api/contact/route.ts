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

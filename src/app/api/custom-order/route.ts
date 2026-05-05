import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const {
      name, email, phone,
      shape, caratRange, cut, color, clarity, budget,
      requests,
    } = await request.json();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    await sendMail({
      subject: `New Custom Order — ${name}`,
      html: `
        <h2>New Custom Order Request</h2>
        <h3>Customer Details</h3>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${phone}</td></tr>
        </table>
        <h3>Diamond Preferences</h3>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;font-weight:bold;">Shape</td><td style="padding:8px;">${shape || "Any"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Carat Range</td><td style="padding:8px;">${caratRange || "—"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Cut</td><td style="padding:8px;">${cut || "Any"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Color</td><td style="padding:8px;">${color || "Any"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Clarity</td><td style="padding:8px;">${clarity || "Any"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Budget</td><td style="padding:8px;">${budget || "—"}</td></tr>
        </table>
        ${requests ? `<h3>Special Requests</h3><p style="white-space:pre-wrap;">${requests}</p>` : ""}
      `,
      customerEmail: email,
      customerHtml: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#333;">Thank you, ${name}!</h2>
          <p>We've received your custom order request. Our diamond experts will review your preferences and reach out within 24 hours.</p>
          <h3 style="color:#555;font-size:14px;">Your Order Summary</h3>
          <table style="border-collapse:collapse;width:100%;font-size:14px;color:#666;">
            <tr><td style="padding:6px 8px;font-weight:bold;">Shape</td><td style="padding:6px 8px;">${shape || "Any"}</td></tr>
            <tr><td style="padding:6px 8px;font-weight:bold;">Carat Range</td><td style="padding:6px 8px;">${caratRange || "—"}</td></tr>
            <tr><td style="padding:6px 8px;font-weight:bold;">Cut</td><td style="padding:6px 8px;">${cut || "Any"}</td></tr>
            <tr><td style="padding:6px 8px;font-weight:bold;">Color</td><td style="padding:6px 8px;">${color || "Any"}</td></tr>
            <tr><td style="padding:6px 8px;font-weight:bold;">Clarity</td><td style="padding:6px 8px;">${clarity || "Any"}</td></tr>
            <tr><td style="padding:6px 8px;font-weight:bold;">Budget</td><td style="padding:6px 8px;">${budget || "—"}</td></tr>
          </table>
          ${requests ? `<p style="color:#666;font-size:14px;margin-top:16px;"><strong>Special Requests:</strong><br/>${requests}</p>` : ""}
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
          <p style="color:#999;font-size:12px;">EverTrust Jewels — Timeless Brilliance, Trusted Forever</p>
          <p style="color:#999;font-size:12px;">Phone: +91 82381 65370 | Email: evertrustjewels@gmail.com</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Custom order error:", error);
    return NextResponse.json(
      { error: "Failed to send order" },
      { status: 500 }
    );
  }
}

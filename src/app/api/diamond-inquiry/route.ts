import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      phone,
      diamondName,
      type,
      shape,
      shapeOther,
      carat,
      color,
      fancyColor,
      clarity,
      cut,
      lab,
      fluorescence,
      extra,
    } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const shapeValue = shape === "Other" ? shapeOther || "Other" : shape;
    const colour =
      color === "Fancy Colour" ? fancyColor || "Fancy Colour" : color;

    const specs: [string, string][] = [
      ["Diamond", diamondName],
      ["Type", type],
      ["Shape", shapeValue],
      ["Carat", carat ? `${carat} ct` : ""],
      ["Colour", colour],
      ["Clarity", clarity],
      ["Cut / Polish / Symmetry", cut],
      ["Lab", lab],
      ["Fluorescence", fluorescence],
    ];
    const specRows = specs
      .map(
        ([k, v]) =>
          `<tr><td style="padding:8px;font-weight:bold;">${k}</td><td style="padding:8px;">${
            v || "—"
          }</td></tr>`
      )
      .join("");

    await sendMail({
      subject: `New Diamond Inquiry — ${name}`,
      replyTo: email,
      html: `
        <h2>New Diamond Configuration Inquiry</h2>
        <h3>Customer Details</h3>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${phone || "—"}</td></tr>
        </table>
        <h3>Requested Configuration</h3>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">${specRows}</table>
        ${extra ? `<h3>Extra Details</h3><p style="white-space:pre-wrap;">${extra}</p>` : ""}
      `,
      customerEmail: email,
      customerHtml: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="text-align:center;padding:20px 0;">
            <img src="https://evertrustjewels.com/images/brand/email-logo.png" alt="EverTrust Jewels" style="height:80px;" />
          </div>
          <h2 style="color:#333;">Thank you, ${name}!</h2>
          <p>We've received your diamond inquiry. Our diamond experts will review your requested configuration and reach out within 24 hours.</p>
          <h3 style="color:#555;font-size:14px;">Your Requested Configuration</h3>
          <table style="border-collapse:collapse;width:100%;font-size:14px;color:#666;">${specRows}</table>
          ${extra ? `<p style="color:#666;font-size:14px;margin-top:16px;"><strong>Extra Details:</strong><br/>${extra}</p>` : ""}
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
          <p style="color:#999;font-size:12px;">EverTrust Jewels — Timeless Brilliance, Trusted Forever</p>
          <p style="color:#999;font-size:12px;">Phone: +91 82381 65370 | Email: evertrustjewels@gmail.com</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Diamond inquiry error:", error);
    return NextResponse.json(
      { error: "Failed to send inquiry" },
      { status: 500 }
    );
  }
}

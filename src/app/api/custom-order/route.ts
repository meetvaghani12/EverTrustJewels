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

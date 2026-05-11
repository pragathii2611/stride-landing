import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pains, industry, teamSize, email, name, whatsapp, company } = body;

    // Basic validation
    if (!email || !name) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const painList = Array.isArray(pains) ? pains.join(", ") : pains || "N/A";

    const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Inter, system-ui, sans-serif; background: #f4f6fa; margin: 0; padding: 20px; }
    .card { background: #fff; border-radius: 12px; padding: 32px; max-width: 560px; margin: 0 auto; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .logo { font-size: 22px; font-weight: 800; color: #060E24; margin-bottom: 24px; }
    .logo span { color: #3b7ef8; }
    h2 { font-size: 18px; font-weight: 700; color: #020611; margin: 0 0 20px; }
    .row { display: flex; gap: 8px; margin-bottom: 12px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #7a84a8; min-width: 100px; padding-top: 2px; }
    .value { font-size: 14px; color: #060E24; flex: 1; }
    .divider { height: 1px; background: #e8eaf0; margin: 20px 0; }
    .footer { font-size: 12px; color: #7a84a8; margin-top: 24px; }
    .tag { display: inline-block; background: #EEF2FF; color: #3b7ef8; font-size: 12px; padding: 3px 10px; border-radius: 20px; margin: 2px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo"><span>S</span>TRIDE</div>
    <h2>New Demo Request 🎯</h2>
    <div class="row"><span class="label">Name</span><span class="value">${name}</span></div>
    <div class="row"><span class="label">Email</span><span class="value">${email}</span></div>
    <div class="row"><span class="label">WhatsApp</span><span class="value">${whatsapp || "Not provided"}</span></div>
    <div class="row"><span class="label">Company</span><span class="value">${company || "Not provided"}</span></div>
    <div class="divider"></div>
    <div class="row"><span class="label">Industry</span><span class="value">${industry || "Not provided"}</span></div>
    <div class="row"><span class="label">Team Size</span><span class="value">${teamSize || "Not provided"}</span></div>
    <div class="divider"></div>
    <div class="row">
      <span class="label">Pain Points</span>
      <span class="value">${painList.split(", ").map((p: string) => `<span class="tag">${p}</span>`).join(" ")}</span>
    </div>
    <div class="footer">Submitted via stride.aceai.sg · ${new Date().toLocaleString("en-SG", { timeZone: "Asia/Singapore" })} SGT</div>
  </div>
</body>
</html>`;

    await transporter.sendMail({
      from: `"Stride Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO || "contact@aceai.sg",
      subject: `New Demo Request — ${name} (${company || email})`,
      html,
      text: `New demo request from ${name}\nEmail: ${email}\nWhatsApp: ${whatsapp}\nCompany: ${company}\nIndustry: ${industry}\nTeam Size: ${teamSize}\nPain Points: ${painList}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

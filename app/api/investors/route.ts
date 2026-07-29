import { NextRequest, NextResponse } from "next/server";

type InvestorRequestBody = {
  name?: string;
  firm?: string;
  email?: string;
  chequeSize?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: InvestorRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { name, firm, email, chequeSize, message } = body;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "Please provide your name." }, { status: 400 });
  }
  if (!firm || typeof firm !== "string" || firm.trim().length < 2) {
    return NextResponse.json({ error: "Please provide your firm." }, { status: 400 });
  }
  if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }
  if (!chequeSize || typeof chequeSize !== "string") {
    return NextResponse.json({ error: "Please provide a typical cheque size." }, { status: 400 });
  }

  // TODO: wire this up to a real data room / CRM (e.g. an email service or
  // Notion/Airtable webhook) once one is chosen. For now we just log the
  // request server-side and acknowledge receipt.
  console.log("[investors] data room request received", {
    name,
    firm,
    email,
    chequeSize,
    message: message ?? null,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { rsvpSchema } from "@/lib/rsvp-schema";

/**
 * Receives an RSVP and forwards it to a Google Apps Script web app that appends a row
 * to the family's Google Sheet. The webhook URL stays on the server (never sent to the browser).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = rsvpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  // Honeypot filled in: pretend success so bots learn nothing.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const webhook = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhook) {
    console.error("GOOGLE_SHEET_WEBHOOK_URL is not set; RSVP was not saved.");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const { name, attending, guests, message } = parsed.data;
  try {
    const res = await fetch(webhook, {
      method: "POST",
      // Apps Script web apps accept text/plain without a CORS preflight
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        name,
        attending: attending === "yes" ? "Yes" : "No",
        guests: attending === "yes" ? guests : 0,
        message,
        secret: process.env.GOOGLE_SHEET_SECRET ?? "",
      }),
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("RSVP forward failed:", err);
    return NextResponse.json({ ok: false, error: "upstream_failed" }, { status: 502 });
  }
}

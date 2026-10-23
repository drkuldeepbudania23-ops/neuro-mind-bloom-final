import { verifyRxToken } from "../../../../lib/rx/link";
import { rateLimitByIp, tooMany } from "../../../../lib/server/rateLimit";
import { isAdminConfigured } from "../../../../lib/server/firebaseAdmin";
import { isSigned, loadPrescription, pdfFileName, prescriptionPdf, rxSecret } from "../../../../lib/server/prescriptions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PRIVATE_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Robots-Tag": "noindex, nofollow",
  "Referrer-Policy": "no-referrer",
};

function notFound() {
  return new Response("This prescription link is invalid or has expired. Please contact the clinic on WhatsApp +91 93763 15331.", {
    status: 404,
    headers: { ...PRIVATE_HEADERS, "Content-Type": "text/plain; charset=utf-8" },
  });
}

/**
 * Patient-facing download of an e-signed prescription.
 * The token is an HMAC-signed, expiring reference (lib/rx/link.ts) — the record
 * id alone cannot be used, and links stop working after 30 days.
 */
export async function GET(request: Request, context: { params: Promise<{ token: string }> }) {
  try {
    const limit = await rateLimitByIp(request, "rx-download", 60, 10 * 60);
    if (!limit.allowed) return tooMany(limit.retryAfterSec);
    const { token } = await context.params;
    const recordId = verifyRxToken(decodeURIComponent(token || ""), rxSecret());
    if (!recordId || !isAdminConfigured()) return notFound();

    const record = await loadPrescription(recordId);
    if (!record || !isSigned(record)) return notFound();

    const pdf = await prescriptionPdf(record);
    return new Response(Buffer.from(pdf), {
      status: 200,
      headers: {
        ...PRIVATE_HEADERS,
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${pdfFileName(record)}"`,
      },
    });
  } catch (error) {
    console.error("rx/download", error);
    return notFound();
  }
}

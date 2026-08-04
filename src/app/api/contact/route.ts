import { NextResponse } from "next/server";
import { formSubmissionSchema } from "@/lib/forms/schema";
import { submitForm } from "@/lib/forms/adapters";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const parsed = formSubmissionSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Some fields need attention.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  // Honeypot tripped — behave as if it succeeded so bots get no signal,
  // but never actually deliver the submission.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const result = await submitForm(parsed.data);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

import { revalidatePath } from "next/cache";

/**
 * On-demand ISR. Point a Supabase Database Webhook (INSERT/UPDATE/DELETE on any content table) at
 *   POST https://your-site.vercel.app/api/revalidate
 * with header  x-revalidate-secret: <REVALIDATE_SECRET>
 */
export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret") ?? new URL(request.url).searchParams.get("secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ ok: false, error: "Invalid secret" }, { status: 401 });
  }
  revalidatePath("/", "layout");
  return Response.json({ ok: true, revalidated: true, now: Date.now() });
}

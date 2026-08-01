import { createHmac, timingSafeEqual } from "crypto"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

function isValidSignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET
  if (!secret || !signature) return false

  const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest("base64")
  const expectedBuffer = Buffer.from(expected)
  const signatureBuffer = Buffer.from(signature)

  if (expectedBuffer.length !== signatureBuffer.length) return false
  return timingSafeEqual(expectedBuffer, signatureBuffer)
}

export async function POST(request: Request) {
  const rawBody = await request.text()
  const signature = request.headers.get("x-shopify-hmac-sha256")

  if (!isValidSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
  }

  const topic = request.headers.get("x-shopify-topic") ?? ""

  let payload: { handle?: string } = {}
  try {
    payload = JSON.parse(rawBody)
  } catch {
    payload = {}
  }

  revalidatePath("/productos")

  if (topic.startsWith("products/") && payload.handle) {
    revalidatePath(`/productos/${payload.handle}`)
  }

  if (topic.startsWith("collections/") && payload.handle) {
    revalidatePath(`/productos/categoria/${payload.handle}`)
  }

  return NextResponse.json({ revalidated: true, topic })
}

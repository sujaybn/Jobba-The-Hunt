import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(_: Request, { params }: { params: { id: string }}) {
  const app = await prisma.application.findUnique({ where: { id: params.id }});
  return app ? NextResponse.json(app) : NextResponse.json({ error: "Not found" }, { status: 404 });
}
export async function PATCH(req: Request, { params }: { params: { id: string }}) {
  const body = await req.json();
  const app = await prisma.application.update({
    where: { id: params.id },
    data: { company: body.company, role: body.role, status: body.status, notes: body.notes }
  });
  return NextResponse.json(app);
}
export async function DELETE(_: Request, { params }: { params: { id: string }}) {
  await prisma.application.delete({ where: { id: params.id }});
  return NextResponse.json({ ok: true });
}

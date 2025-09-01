import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const apps = await prisma.application.findMany({ orderBy: { updatedAt: "desc" }});
  return NextResponse.json(apps);
}
export async function POST(req: Request) {
  const body = await req.json();
  const app = await prisma.application.create({
    data: { userId: "demo-user", company: body.company, role: body.role, status: body.status ?? "APPLIED", notes: body.notes ?? "" }
  });
  return NextResponse.json(app, { status: 201 });
}

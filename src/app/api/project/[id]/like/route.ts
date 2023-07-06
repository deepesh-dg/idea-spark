import Service from "@/appwrite/serverConfig";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params: { id } }: { params: { id: string } }) {
    const { userId } = await req.json();
    return NextResponse.json({ userId, id });
}

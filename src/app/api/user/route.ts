import Service from "@/appwrite/serverConfig";
import { User } from "@/types";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json(null);

    const service = new Service();

    const user = await service.getUser(id);

    const res: User | null = user
        ? {
              name: user.name,
              id: user.$id,
              email: user.email,
              username: user.email.split("@")[0],
          }
        : null;

    return NextResponse.json(res);
}

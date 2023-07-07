import Service from "@/appwrite/serverConfig";
import { Project } from "@/types";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params: { id: projectId } }: { params: { id: string } }) {
    const { userId } = await req.json();

    if (!userId) return NextResponse.json(null);

    const service = new Service();

    const project = await service.getProject(projectId);

    if (!project) return NextResponse.json(null);

    if (!project.views.includes(userId)) {
        project.views.push(userId);
    }

    const newProject: Project = {
        name: project.name,
        userId: project.userId,
        description: project.description,
        thumbnail: project.thumbnail,
        category: project.category,
        likes: project.likes,
        websiteUrl: project.websiteUrl,
        github: project.github,
        views: project.views,
    };

    const updatedProject = await service.updateProject(projectId, newProject);

    return NextResponse.json(updatedProject);
}

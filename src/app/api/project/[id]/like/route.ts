import Service from "@/appwrite/serverConfig";
import { Project } from "@/types";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params: { id: projectId } }: { params: { id: string } }) {
    const { userId } = await req.json();

    if (!userId) return NextResponse.json(false);

    const service = new Service();

    const project = await service.getProject(projectId);

    if (!project) return NextResponse.json(false);

    if (project.likes.includes(userId)) {
        const index = project.likes.indexOf(userId);
        project.likes.splice(index, 1);
    } else {
        project.likes.push(userId);
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
    };

    const updatedProject = await service.updateProject(projectId, newProject);

    return NextResponse.json(updatedProject);
}

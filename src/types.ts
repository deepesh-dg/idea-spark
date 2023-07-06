import { Models } from "appwrite";

export type Project = {
    name: string;
    userId: string;
    description?: string;
    thumbnail: string;
    category: string;
    likes: string[];
    websiteUrl?: string;
    github: string;
};

export type User = {
    id: string;
    name: string;
    username: string;
    email: string;
};

export type Projects = Project[];

export type ProjectDocument = Models.Document & Project;
export type ProjectDocuments = Models.DocumentList<ProjectDocument>;

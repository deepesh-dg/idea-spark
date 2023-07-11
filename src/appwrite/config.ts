import conf from "@/conf/conf";
import { Project, ProjectDocument, User } from "@/types";
import { Client, ID, Databases, Storage } from "appwrite";
import axios from "axios";

export class Service {
    client = new Client();
    axios = axios.create({
        baseURL: "/api",
    });
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async getProjectList(queries?: string[]) {
        try {
            return await this.databases.listDocuments<ProjectDocument>(
                conf.appwriteDatabaseId,
                conf.appwriteCollectoinId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getProjectList() :: " + error);
            return null;
        }
    }

    async getProject(id: string) {
        try {
            return await this.databases.getDocument<ProjectDocument>(
                conf.appwriteDatabaseId,
                conf.appwriteCollectoinId,
                id
            );
        } catch (error) {
            console.log("Appwrite service :: getProject() :: " + error);
            return null;
        }
    }

    async getUser(id: string) {
        try {
            const response = await this.axios.get<User | null>("/user", {
                params: {
                    id,
                },
            });

            return response.data;
        } catch (error) {
            console.log("Appwrite service :: getUser() :: " + error);
        }

        return null;
    }

    async createProject(project: Project) {
        try {
            return await this.databases.createDocument<ProjectDocument>(
                conf.appwriteDatabaseId,
                conf.appwriteCollectoinId,
                ID.unique(),
                project
            );
        } catch (error) {
            console.log("Appwrite service :: createProject() :: " + error);
            return null;
        }
    }

    async updateProject(projectId: string, project: Partial<Project>) {
        try {
            return await this.databases.updateDocument<ProjectDocument>(
                conf.appwriteDatabaseId,
                conf.appwriteCollectoinId,
                projectId,
                project
            );
        } catch (error) {
            console.log("Appwrite service :: updateProject() :: " + error);
            return null;
        }
    }

    async deleteProject(id: string) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectoinId, id);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteProject() :: " + error);
            return false;
        }
    }

    async toggleLike(projectId: string, userId: string) {
        try {
            const res = await this.axios.patch<ProjectDocument | null>(`/project/${projectId}/like`, { userId });

            return res.data;
        } catch (error) {
            console.log("Appwrite service :: toggleLike() :: " + error);
            return null;
        }
    }

    async views(projectId: string, userId: string) {
        try {
            const res = await this.axios.patch<ProjectDocument | null>(`/project/${projectId}/view`, { userId });

            return res.data;
        } catch (error) {
            console.log("Appwrite service :: views() :: " + error);
            return null;
        }
    }

    async uploadFile(file: File) {
        try {
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
        } catch (error) {
            console.log("Appwrite service :: uploadFile() :: " + error);
            return false;
        }
    }

    async deleteFile(fileId: string) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile() :: " + error);
            return false;
        }
    }

    getFilePreview(fileId: string) {
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId).href;
    }
}

const service = new Service();

export default service;

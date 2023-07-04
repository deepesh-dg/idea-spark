import conf from "@/conf/conf";
import { Project, ProjectDocument } from "@/types";
import { Client, Account, ID, Databases, Storage } from "appwrite";
import axios from "axios";
import { deleteCookie, setCookie } from "cookies-next";

type CreateUserAccount = {
    email: string;
    password: string;
    name: string;
};
type LoginUserAccount = {
    email: string;
    password: string;
};

export class Service {
    client = new Client();
    axios = axios.create({
        baseURL: "/api",
    });
    account;
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // create a new record of user inside appwrite
    async createAccount({ email, password, name }: CreateUserAccount) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // create login feature
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }: LoginUserAccount) {
        try {
            const session = await this.account.createEmailSession(email, password);

            const { jwt } = await this.account.createJWT();
            setCookie("token", jwt);

            return session;
        } catch (error) {
            throw error;
        }
    }

    async isLoggedIn(): Promise<boolean> {
        try {
            const data = await this.getCurrentUser();
            return Boolean(data);
        } catch (error) {}

        return false;
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser() :: " + error);
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            deleteCookie("token");
        } catch (error) {
            console.log("Appwrite service :: logout() :: " + error);
        }
    }

    async getProjectList() {
        try {
            return await this.databases.listDocuments<ProjectDocument>(
                conf.appwriteDatabaseId,
                conf.appwriteCollectoinId
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

    async deleteProject(id: string) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectoinId, id);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteProject() :: " + error);
            return false;
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

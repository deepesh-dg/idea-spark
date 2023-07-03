import conf from "@/conf/conf";
import { Project, ProjectDocument } from "@/types";
import { Client, Account, ID, Databases, Storage } from "appwrite";

type CreateUserAccount = {
    email: string;
    password: string;
    name: string;
};
type LoginUserAccount = {
    email: string;
    password: string;
};

const appwriteClient = new Client();

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(appwriteClient);
export const databases = new Databases(appwriteClient);
export const bucket = new Storage(appwriteClient);

export class AppwriteService {
    // create a new record of user inside appwrite
    async createAccount({ email, password, name }: CreateUserAccount) {
        try {
            const userAccount = await account.create(ID.unique(), email, password, name);
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
            return await account.createEmailSession(email, password);
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
            return await account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser() :: " + error);
        }

        return null;
    }

    async logout() {
        try {
            await account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout() :: " + error);
        }
    }

    async getProjectList() {
        try {
            return await databases.listDocuments<ProjectDocument>(
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
            return await databases.getDocument<ProjectDocument>(
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
            return await databases.createDocument<ProjectDocument>(
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
            await databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectoinId, id);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteProject() :: " + error);
            return false;
        }
    }

    async uploadFile(file: File) {
        try {
            return await bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
        } catch (error) {
            console.log("Appwrite service :: uploadFile() :: " + error);
            return false;
        }
    }

    async deleteFile(fileId: string) {
        try {
            await bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile() :: " + error);
            return false;
        }
    }

    getFilePreview(fileId: string) {
        return bucket.getFilePreview(conf.appwriteBucketId, fileId).href;
    }
}

const appwriteService = new AppwriteService();

export default appwriteService;

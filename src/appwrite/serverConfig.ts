import conf from "@/conf/conf";
import { Account, Client, Databases, Users } from "node-appwrite";
import axios from "axios";
import { Project, ProjectDocument } from "@/types";

export class Service {
    client = new Client();
    axios = axios.create({
        baseURL: "/api",
    });
    account;
    users;
    databases;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId).setKey(conf.appwriteKey);
        this.account = new Account(this.client);
        this.users = new Users(this.client);
        this.databases = new Databases(this.client);
    }

    async getUser(id: string) {
        try {
            return await this.users.get(id);
        } catch (error) {
            console.log("Appwrite service :: getUser() :: " + error);
        }

        return null;
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

    async updateProject(id: string, project: Project) {
        try {
            return await this.databases.updateDocument<ProjectDocument>(
                conf.appwriteDatabaseId,
                conf.appwriteCollectoinId,
                id,
                project
            );
        } catch (error) {
            console.log("Appwrite service :: updateProject() :: " + error);
            return null;
        }
    }
}

export default Service;

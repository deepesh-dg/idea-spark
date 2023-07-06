import conf from "@/conf/conf";
import { Account, Client, Databases, Users } from "node-appwrite";
import axios from "axios";

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
}

export default Service;

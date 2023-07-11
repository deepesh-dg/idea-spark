import conf from "@/conf/conf";
import { Client, Account, ID } from "appwrite";

type CreateUserAccount = {
    email: string;
    password: string;
    name: string;
};
type LoginUserAccount = {
    email: string;
    password: string;
};

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
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
            return await this.account.createEmailSession(email, password);
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

    loginWithGoogle() {
        this.account.createOAuth2Session(
            "google",
            new URL("/login", window.location.href).href,
            new URL("/login", window.location.href).href
        );
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser() :: " + error);
        }

        return null;
    }

    async getToken() {
        try {
            const { jwt } = await this.account.createJWT();
            return jwt;
        } catch (error) {
            console.log("Appwrite service :: getToken() :: " + error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout() :: " + error);
        }
    }
}

const authService = new AuthService();

export default authService;

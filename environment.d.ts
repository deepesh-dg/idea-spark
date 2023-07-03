declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_APPWRITE_URL: string;
            NEXT_PUBLIC_APPWRITE_PROJECT_ID: string;
            NEXT_PUBLIC_APPWRITE_DATABASE_ID: string;
            NEXT_PUBLIC_APPWRITE_COLLECTION_ID: string;
            NEXT_PUBLIC_APPWRITE_BUCKET_ID: string;
            APPWRITE_API_KEY: string;
            NODE_ENV: "development" | "production";
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};

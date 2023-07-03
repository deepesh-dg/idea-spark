import appwriteService from "@/appwrite/config";

export default async function Home() {
    const data = await appwriteService.getProjectList();

    console.log(data);

    return <>{data?.total}</>;
}

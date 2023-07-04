import service from "@/appwrite/config";
import { ProjectFormSlide } from "@/components";

export default async function Home() {
    const data = await service.getProjectList();

    console.log(data);

    return (
        <>
            {data?.total}
            <ProjectFormSlide />
        </>
    );
}

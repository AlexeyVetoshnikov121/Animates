import FloatingImage from "@/components/ui/FloatingImage";
import ProjectGallery from "@/components/ui/project/ProjectGallery";
import Text from "@/components/ui/Text";

export default function Home() {
    return (
        <div className="realtive overflow-x-hidden bg-white">
            <Text />
            <div className="h-[100vh] flex justify-center items-center">
                <ProjectGallery />
            </div>  
            <div className="bg-black h-screen">
                <FloatingImage />
            </div>
        </div>
    )
}
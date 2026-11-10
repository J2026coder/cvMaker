import { api } from "@/api";
import { Button } from "../ui/button";
import { BotMessageSquare, Minus, Square, X } from "lucide-react";
import { toast } from "sonner";
import { useUiStore } from "@/store/ui";
import { cn } from "@/lib/utils";

const TitleBar = () => {
    const { aiAvailable, setAiAvailable } = useUiStore();
    const closeWindow = () => {
        const electronApi = window.api;
        electronApi.close();
    }

    const minimizeWindow = () => {
        const electronApi = window.api;
        electronApi.minimize();
    }

    const maximizeWindow = () => {
        const electronApi = window.api;
        electronApi.maximize();
    }

    const handleAICheck = async () => {
        const isAIAvailable = await api.checkAIAvailability();
        if (isAIAvailable) {
            toast.success("本地 AI 已就绪，正在启用智能功能…");
            setAiAvailable(true);
        } else {
            toast.error("未检测到本地 AI。", { description: "请先安装 Ollama 并下载一个模型，或改用其他方式手动填写。" });
            setAiAvailable(false);
        }
    }

    return (
        <>
        <div className="w-full titlebar flex flex-row items-center justify-between p-1 bg-gray-800 text-white m-0 border-b-2 border-b-primary/20">
            <div className="w-full flex flex-row items-center">
                {/* logo (later) */}
                <span className="ml-2 text-lg font-bold">求职舱</span>
                {/* buttons */}
            </div>
            <div className="flex flex-row gap-1">
                {/* close button/others */}
                <Button className="button bg-transparent hover:bg-accent hover:text-accent-foreground cursor-pointer" onClick={handleAICheck}>
                    <BotMessageSquare className={cn(aiAvailable ? "text-green-500": "")} />
                </Button>
                <Button className="button bg-transparent hover:bg-accent hover:text-accent-foreground cursor-pointer" onClick={minimizeWindow}>
                    <Minus />
                </Button>
                <Button className="button bg-transparent hover:bg-accent hover:text-accent-foreground cursor-pointer" onClick={maximizeWindow}>
                    <Square />
                </Button>
                <Button className="button bg-transparent hover:bg-accent hover:text-accent-foreground cursor-pointer" onClick={closeWindow}>
                    <X />
                </Button>
            </div>
        </div>
        {/* {
            showSubMenu === "File" && <Files x={subMenuPosition.x} y={subMenuPosition.y} />
        } */}
        </>
    )
}

export default TitleBar;
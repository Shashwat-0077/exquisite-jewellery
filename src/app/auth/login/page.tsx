import Socials from "@/components/Socials";
import { ToastProvider } from "@/components/ui/toast";

export default function Login() {
    return (
        <ToastProvider>
            <div className="grid min-h-[calc(100svh-88px)] place-content-center">
                <Socials />
            </div>
        </ToastProvider>
    );
}

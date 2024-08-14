import { Suspense } from "react";

import Socials from "@/components/Socials";
import { Skeleton } from "@/components/ui/skeleton";
import { ToastProvider } from "@/components/ui/toast";

export default function Login() {
    return (
        <ToastProvider>
            <div className="grid min-h-[calc(100svh-88px)] place-content-center">
                <Suspense
                    fallback={<Skeleton className="h-[20px] w-[100px]" />}
                >
                    <Socials />
                </Suspense>
            </div>
        </ToastProvider>
    );
}

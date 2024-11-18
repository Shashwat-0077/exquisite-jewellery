import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import UserButton from "@/features/auth/components/userButton";

export default async function Home() {
    const user = await getCurrent();

    if (!user) {
        redirect("/sign-in");
    }

    // FIXME : page is getting reloaded and the "/me" route is getting hit thrice, once with above getCurrent() and then with the UserButton and then with the UserButton again, so we need to fix this.
    return <UserButton />;
}

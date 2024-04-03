import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";

const Member = async () => {
    const session = await getServerSession(options);
    // if (!session) {
    //     redirect("/api/auth/signin?callbackUrl=/Member")
    // }
    return (
        <div>
            <h1>Member Server Session</h1>
            <p>{session?.user?.name}</p>
            <p>{session?.user?.email}</p>
        </div>
    )
}

export default Member;
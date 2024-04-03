'use client';

import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Member = () => {
    const { data: session } = useSession(
        // {
        //     required: true,
        //     onUnauthenticated() {
        //         redirect('/api/auth/signin?callbackUrl=/ClientMember')
        //     }
        // }
    )
    return (
        <div>
            <h1>Client Member Session</h1>
            <p>
                {session?.user?.name}
            </p><p>
                {session?.user?.email}
            </p>
        </div>
    )
}

export default Member;
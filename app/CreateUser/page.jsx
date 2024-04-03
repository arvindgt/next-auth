import React from "react";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import UserForm from "../components/UserForm";

const Member = async () => {
    const session = await getServerSession(options);
    return (
        <div>
            <h1>create user page</h1>
            <p>{session?.user?.name}</p>
            <p>{session?.user?.role}</p>
            <UserForm />
        </div>
    )
}

export default Member;
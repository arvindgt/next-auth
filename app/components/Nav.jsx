import Link from "next/link";
import React from "react";
import { getServerSession } from 'next-auth';
import { options } from "../api/auth/[...nextauth]/options";

const Nav = async () => {
    // const  session =  "";
    const session = await getServerSession(options);
    // console.log('this is session: ', session)
    return (
        <header className="bg-gray-600 text-gray-100">
            <nav className="flex justify-between items-center w-full px-10 py-4">
                <div>My Sitè</div>
                <div className="flex gap-10">
                    <Link href="/">Home</Link>
                    <Link href="/CreateUser">Create User (admin only)</Link>
                    <Link href="/ClientMember">Client Member</Link>
                    <Link href="/Member">Member</Link>
                    <Link href="/Public">Public</Link>
                    {session ? (
                        <Link href="/api/auth/signout?callbackUrl=/">({session.user.name })Logout</Link>
                    ) : (
                        <Link href="/api/auth/signin">Login</Link>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Nav;
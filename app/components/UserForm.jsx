"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";


const UserForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({name: "", email: "", password: ""});
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/Users", {
            method: "POST",
            body: JSON.stringify({ formData }),
            "content-type": "application/json"
        });

        if (!res.ok) {
            const response = await res.json();
            setErrorMessage(response.message)
        } else {
            router.refresh();
            router.push("/");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} method="post" className="flex flex-col gap-3 w-1/2">
                <h1>Create New User</h1>
                <label>Full Name</label>
                <input type="text" id="name" name="name" onChange={handleChange} value={formData.name}
                    className="m2 bg-slate-400 rounded"
                    required />

                <label>Email</label>
                <input type="email" id="email" name="email" onChange={handleChange} value={formData.email}
                    className="m2 bg-slate-400 rounded"
                    required />

                <label>Password</label>
                <input type="password" id="password" name="password" onChange={handleChange} value={formData.password}
                    className="m2 bg-slate-400 rounded"
                    required />

                <input type="submit" value="Create User" className="bg-blue-300 hover:bg-blue-100" />
            </form>

            <p>{errorMessage}</p>
        </>
    )
}

export default UserForm;
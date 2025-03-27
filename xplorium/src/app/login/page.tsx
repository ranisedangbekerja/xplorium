import React from "react";
import LoginPage from "@/components/LoginPage"; // Ensure path is correct
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Login() {
    // Checks if the user has seesion
    const session = await auth();

    // If user has session redirect them to chatroom
    if (session) {
        redirect("/chatroom");
    }

    return <LoginPage />;
}

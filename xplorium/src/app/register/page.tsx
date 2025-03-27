import React from "react";
import SignUpPage from "@/components/SignUpPage"; // Ensure path is correct
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
    // Checks if the user has session
    const session = await auth()

    // If user has session redirect them to chatroom
    if (session) {
        redirect("/chatroom")
    }

    return <SignUpPage />;
}

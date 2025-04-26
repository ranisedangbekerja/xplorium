import React from "react";
import HistoryPage from "@/components/History"; // Pastikan path ini bener ya
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function HistoryRoutePage() {
    // Cek apakah user sudah login
    const session = await auth();

    // Kalau belum login, mungkin mau redirect ke login, tapi ini opsional
    if (!session) {
        redirect("/login"); // opsional, kalau kamu mau
    }

    // Kalau sudah login, tampilkan halaman History
    return <HistoryPage />;
}

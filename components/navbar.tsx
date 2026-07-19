"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const { token, logout } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    function handleLogout() {
        logout();
        router.push("/login");
    }

    if (!mounted) return null;

    const isLoggedIn = token || localStorage.getItem("access_token");
    if (!isLoggedIn) return null;

    const links = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/clients", label: "Clients" },
        { href: "/invoices", label: "Factures" },
    ];

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-8">
                        <Link href="/dashboard" className="text-xl font-bold text-blue-600">
                            FacturePro
                        </Link>

                        <div className="flex items-center gap-1">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                        pathname === link.href
                                            ? "bg-blue-50 text-blue-700"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="text-sm text-gray-500 hover:text-red-600 font-medium transition"
                    >
                        Déconnexion
                    </button>
                </div>
            </div>
        </nav>
    );
}

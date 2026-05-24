"use client";

import Link from "next/link";

export default function Navbar() {

    return (
        <nav className="border-b p-5 flex gap-5">

            <Link href="/dashboard">
                Dashboard
            </Link>

            <Link href="/clients">
                Clients
            </Link>

            <Link href="/invoices">
                Factures
            </Link>

        </nav>
    );
}
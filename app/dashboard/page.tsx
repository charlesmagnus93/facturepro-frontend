"use client";

import { useEffect, useState } from "react";

import { api } from "@/services/api";

export default function DashboardPage() {

    const [data, setData] = useState<any>();

    useEffect(() => {

        async function fetchDashboard() {

            const response = await api.get(
                "/dashboard"
            );

            setData(response.data);
        }

        fetchDashboard();

    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-10">

            <h1 className="text-3xl font-bold mb-10">
                Dashboard
            </h1>

            <div className="grid grid-cols-2 gap-5">

                <div className="border p-5">
                    Clients: {data.clients}
                </div>

                <div className="border p-5">
                    Factures: {data.invoices}
                </div>

                <div className="border p-5">
                    Total Facturé:
                    {data.total_invoiced}
                </div>

                <div className="border p-5">
                    Total Payé:
                    {data.total_paid}
                </div>

            </div>

        </div>
    );
}
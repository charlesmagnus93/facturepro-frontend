"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api";

import { useAuth } from "@/hooks/use-auth";

import RevenueChart from "@/components/revenue-chart";

export default function DashboardPage() {

    useAuth();

    const { data, isLoading, error } = useQuery({
        queryKey: ["dashboard"],
        queryFn: async () => {
            const response = await api.get("/dashboard");
            return response.data;
        },
    });

    if (isLoading) {
        return <div className="p-10">Chargement...</div>;
    }

    if (error) {
        return <div className="p-10 text-red-600">Impossible de charger le dashboard</div>;
    }

    return (
        <div className="p-10">

            <h1 className="text-3xl font-bold mb-10">
                Dashboard
            </h1>

            <div className="grid grid-cols-2 gap-5">

                <div className="bg-white border rounded-xl p-6 shadow-sm">
                    <span className="text-gray-500 text-sm">Clients</span>
                    <p className="text-2xl font-bold">{data.clients}</p>
                </div>

                <div className="bg-white border rounded-xl p-6 shadow-sm">
                    <span className="text-gray-500 text-sm">Factures</span>
                    <p className="text-2xl font-bold">{data.invoices}</p>
                </div>

                <div className="bg-white border rounded-xl p-6 shadow-sm">
                    <span className="text-gray-500 text-sm">Total Facturé</span>
                    <p className="text-2xl font-bold">{data.total_invoiced?.toLocaleString()} FCFA</p>
                </div>

                <div className="bg-white border rounded-xl p-6 shadow-sm">
                    <span className="text-gray-500 text-sm">Total Payé</span>
                    <p className="text-2xl font-bold">{data.total_paid?.toLocaleString()} FCFA</p>
                </div>

            </div>

            <div className="mt-10">
                <RevenueChart data={data.monthly_revenue} />
            </div>

        </div>
    );
}
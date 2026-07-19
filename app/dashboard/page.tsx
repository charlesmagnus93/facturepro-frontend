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
        return (
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-gray-200 rounded w-48"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-28 bg-gray-200 rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
                    Impossible de charger le dashboard
                </div>
            </div>
        );
    }

    const kpis = [
        { label: "Clients", value: data.clients, color: "bg-blue-50 text-blue-700" },
        { label: "Factures", value: data.invoices, color: "bg-purple-50 text-purple-700" },
        { label: "Total Facturé", value: `${data.total_invoiced?.toLocaleString()} FCFA`, color: "bg-amber-50 text-amber-700" },
        { label: "Total Payé", value: `${data.total_paid?.toLocaleString()} FCFA`, color: "bg-green-50 text-green-700" },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {kpis.map((kpi) => (
                    <div
                        key={kpi.label}
                        className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
                    >
                        <p className="text-sm font-medium text-gray-500 mb-1">{kpi.label}</p>
                        <p className={`text-2xl font-bold ${kpi.color.split(" ")[1]}`}>
                            {kpi.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <RevenueChart data={data.monthly_revenue} />
            </div>
        </div>
    );
}

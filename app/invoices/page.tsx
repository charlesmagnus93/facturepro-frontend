"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Invoice } from "@/types/invoice";
import { useAuth } from "@/hooks/use-auth";
import InvoiceCard from "@/components/invoice-card";
import InvoiceForm from "@/components/invoice-form";

export default function InvoicesPage() {
    useAuth();

    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState(false);

    const { data: invoices = [], isLoading } = useQuery<Invoice[]>({
        queryKey: ["invoices"],
        queryFn: async () => {
            const response = await api.get("/invoices");
            return response.data;
        },
    });

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Factures</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
                >
                    {showForm ? "Fermer" : "+ Nouvelle Facture"}
                </button>
            </div>

            {showForm && (
                <InvoiceForm
                    onCreated={() => {
                        queryClient.invalidateQueries({ queryKey: ["invoices"] });
                        setShowForm(false);
                    }}
                />
            )}

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-48 bg-gray-100 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            ) : invoices.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                    Aucune facture pour le moment
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {invoices.map((invoice) => (
                        <InvoiceCard key={invoice.id} invoice={invoice} />
                    ))}
                </div>
            )}
        </div>
    );
}

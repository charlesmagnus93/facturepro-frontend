"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services/api";

import { Invoice } from "@/types/invoice";

import { useAuth } from "@/hooks/use-auth";

import InvoiceCard from "@/components/invoice-card";

import InvoiceForm from "@/components/invoice-form";

export default function InvoicesPage() {

    useAuth();

    const queryClient = useQueryClient();

    const { data: invoices = [] } = useQuery<Invoice[]>({
        queryKey: ["invoices"],
        queryFn: async () => {
            const response = await api.get("/invoices");
            return response.data;
        },
    });

    return (
        <div className="p-10">

            <h1 className="text-4xl font-bold mb-10">
                Factures
            </h1>

            <InvoiceForm
                onCreated={() => queryClient.invalidateQueries({ queryKey: ["invoices"] })}
            />

            <div className="grid grid-cols-3 gap-5">

                {invoices.map((invoice) => (

                    <InvoiceCard
                        key={invoice.id}
                        invoice={invoice}
                    />

                ))}

            </div>

        </div>
    );
}
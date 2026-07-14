"use client";

import { useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services/api";

import { Client } from "@/types/client";

import { useAuth } from "@/hooks/use-auth";

import ClientCard from "@/components/client-card";

import ClientForm from "@/components/client-form";

export default function ClientsPage() {

    useAuth();

    const queryClient = useQueryClient();

    const [search, setSearch] = useState("");

    const { data: clients = [] } = useQuery<Client[]>({
        queryKey: ["clients"],
        queryFn: async () => {
            const response = await api.get("/clients");
            return response.data;
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => api.delete(`/clients/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] });
        },
    });

    const filteredClients = clients.filter((client) =>
        client.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-10">

            <h1 className="text-4xl font-bold mb-10">
                Clients
            </h1>

            <ClientForm
                onCreated={() => queryClient.invalidateQueries({ queryKey: ["clients"] })}
            />

            <input
                className="border p-3 w-full mb-8 rounded"
                placeholder="Recherche client..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <div className="grid grid-cols-3 gap-5">

                {filteredClients.map((client) => (

                    <ClientCard
                        key={client.id}
                        client={client}
                        onDelete={(id) => deleteMutation.mutate(id)}
                    />

                ))}

            </div>

        </div>
    );
}
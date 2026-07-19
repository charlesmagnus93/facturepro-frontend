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
    const [showForm, setShowForm] = useState(false);

    const { data: clients = [], isLoading } = useQuery<Client[]>({
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
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
                >
                    {showForm ? "Fermer" : "+ Nouveau Client"}
                </button>
            </div>

            {showForm && (
                <ClientForm
                    onCreated={() => {
                        queryClient.invalidateQueries({ queryKey: ["clients"] });
                        setShowForm(false);
                    }}
                />
            )}

            <div className="mb-6">
                <input
                    className="w-full max-w-sm px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="Rechercher un client..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            ) : filteredClients.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                    {search ? "Aucun client trouvé" : "Aucun client pour le moment"}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredClients.map((client) => (
                        <ClientCard
                            key={client.id}
                            client={client}
                            onDelete={(id) => deleteMutation.mutate(id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

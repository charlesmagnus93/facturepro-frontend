"use client";

import { useEffect, useState } from "react";

import { api } from "@/services/api";

import { Client } from "@/types/client";

import ClientCard from "@/components/client-card";

import ClientForm from "@/components/client-form";

export default function ClientsPage() {

    const [clients, setClients] = useState<
        Client[]
    >([]);

    const [search, setSearch] =
        useState("");

    async function fetchClients() {

        const response = await api.get(
            "/clients"
        );

        setClients(response.data);
    }

    async function deleteClient(
        id: number
    ) {

        await api.delete(`/clients/${id}`);

        fetchClients();
    }

    useEffect(() => {
        fetchClients();
    }, []);

    const filteredClients =
        clients.filter((client) =>
            client.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    return (
        <div className="p-10">

            <h1 className="text-4xl font-bold mb-10">
                Clients
            </h1>

            <ClientForm
                onCreated={fetchClients}
            />

            <input
                className="border p-3 w-full mb-8"
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
                        onDelete={deleteClient}
                    />

                ))}

            </div>

        </div>
    );
}
"use client";

import { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api";

import InvoiceItemRow from "./invoice-item-row";

type Client = {
    id: number;
    name: string;
};

type Props = {
    onCreated: () => void;
};

export default function InvoiceForm({ onCreated }: Props) {

    const { data: clients = [] } = useQuery<Client[]>({
        queryKey: ["clients"],
        queryFn: async () => {
            const response = await api.get("/clients");
            return response.data;
        },
    });

    const [clientId, setClientId] = useState<number>();

    const [items, setItems] = useState([
        { description: "", quantity: 1, unit_price: 0 }
    ]);

    const [error, setError] = useState("");

    const [submitting, setSubmitting] = useState(false);

    function addItem() {
        setItems([...items, { description: "", quantity: 1, unit_price: 0 }]);
    }

    function removeItem(index: number) {
        setItems(items.filter((_, i) => i !== index));
    }

    function updateItem(index: number, field: string, value: any) {
        const updated = [...items];
        updated[index] = { ...updated[index], [field]: value };
        setItems(updated);
    }

    const total = useMemo(() => {
        return items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);
    }, [items]);

    async function createInvoice() {
        setError("");

        if (!clientId) {
            setError("Veuillez sélectionner un client");
            return;
        }

        const hasEmptyItem = items.some(
            (item) => !item.description || item.quantity <= 0 || item.unit_price <= 0
        );

        if (hasEmptyItem) {
            setError("Chaque ligne doit avoir une description, quantité > 0 et prix > 0");
            return;
        }

        setSubmitting(true);

        try {
            await api.post("/invoices", { client_id: clientId, items });
            setItems([{ description: "", quantity: 1, unit_price: 0 }]);
            setClientId(undefined);
            onCreated();
        } catch {
            setError("Erreur lors de la création de la facture");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="border rounded-xl p-6 mb-10">

            <h2 className="text-2xl font-bold mb-5">
                Nouvelle Facture
            </h2>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
                    {error}
                </div>
            )}

            <select
                className="border p-3 w-full mb-5 rounded"
                value={clientId ?? ""}
                onChange={(e) => setClientId(Number(e.target.value) || undefined)}
            >
                <option value="">Choisir un client</option>
                {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                        {client.name}
                    </option>
                ))}
            </select>

            {items.map((item, index) => (
                <InvoiceItemRow
                    key={index}
                    item={item}
                    index={index}
                    onChange={updateItem}
                    onRemove={removeItem}
                />
            ))}

            <button
                onClick={addItem}
                className="bg-gray-200 px-4 py-2 rounded mt-3"
            >
                Ajouter Ligne
            </button>

            <div className="text-2xl font-bold mt-8">
                Total: {total.toLocaleString()} FCFA
            </div>

            <button
                onClick={createInvoice}
                disabled={submitting}
                className="bg-black text-white px-6 py-3 rounded mt-5 disabled:opacity-50"
            >
                {submitting ? "Création..." : "Créer Facture"}
            </button>

        </div>
    );
}
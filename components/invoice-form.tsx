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
    const [items, setItems] = useState([{ description: "", quantity: 1, unit_price: 0 }]);
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
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Nouvelle Facture</h2>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm">
                    {error}
                </div>
            )}

            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">Client *</label>
                <select
                    className="w-full max-w-sm px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
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
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Lignes de facturation</label>
                <div className="space-y-3">
                    {items.map((item, index) => (
                        <InvoiceItemRow
                            key={index}
                            item={item}
                            index={index}
                            onChange={updateItem}
                            onRemove={removeItem}
                        />
                    ))}
                </div>
            </div>

            <button
                onClick={addItem}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium mb-6"
            >
                + Ajouter une ligne
            </button>

            <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                <p className="text-xl font-bold text-gray-900">
                    Total: {total.toLocaleString()} <span className="text-sm font-normal text-gray-500">FCFA</span>
                </p>

                <button
                    onClick={createInvoice}
                    disabled={submitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-50"
                >
                    {submitting ? "Création..." : "Créer la facture"}
                </button>
            </div>
        </div>
    );
}

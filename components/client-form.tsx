"use client";

import { useState } from "react";

import { api } from "@/services/api";

type Props = {
    onCreated: () => void;
};

export default function ClientForm({
    onCreated
}: Props) {

    const [name, setName] = useState("");

    const [phone, setPhone] = useState("");

    const [email, setEmail] = useState("");

    const [address, setAddress] =
        useState("");

    async function handleSubmit() {

        await api.post("/clients", {
            name,
            phone,
            email,
            address
        });

        setName("");
        setPhone("");
        setEmail("");
        setAddress("");

        onCreated();
    }

    return (
        <div className="border rounded-lg p-5 mb-10">

            <h2 className="text-2xl font-bold mb-5">
                Nouveau Client
            </h2>

            <div className="space-y-3">

                <input
                    className="border p-3 w-full"
                    placeholder="Nom"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <input
                    className="border p-3 w-full"
                    placeholder="Téléphone"
                    value={phone}
                    onChange={(e) =>
                        setPhone(e.target.value)
                    }
                />

                <input
                    className="border p-3 w-full"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    className="border p-3 w-full"
                    placeholder="Adresse"
                    value={address}
                    onChange={(e) =>
                        setAddress(e.target.value)
                    }
                />

                <button
                    onClick={handleSubmit}
                    className="bg-black text-white px-5 py-3 rounded"
                >
                    Ajouter
                </button>

            </div>

        </div>
    );
}
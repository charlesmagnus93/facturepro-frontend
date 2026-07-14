"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { api } from "@/services/api";

const clientSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    phone: z.string().optional(),
    email: z.email("Email invalide").optional().or(z.literal("")),
    address: z.string().optional(),
});

type ClientFormData = z.infer<typeof clientSchema>;

type Props = {
    onCreated: () => void;
};

export default function ClientForm({ onCreated }: Props) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ClientFormData>({
        resolver: zodResolver(clientSchema),
    });

    async function onSubmit(data: ClientFormData) {
        await api.post("/clients", data);
        reset();
        onCreated();
    }

    return (
        <div className="border rounded-lg p-5 mb-10">

            <h2 className="text-2xl font-bold mb-5">
                Nouveau Client
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

                <div>
                    <input
                        className="border p-3 w-full rounded"
                        placeholder="Nom *"
                        {...register("name")}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                <input
                    className="border p-3 w-full rounded"
                    placeholder="Téléphone"
                    {...register("phone")}
                />

                <div>
                    <input
                        className="border p-3 w-full rounded"
                        placeholder="Email"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <input
                    className="border p-3 w-full rounded"
                    placeholder="Adresse"
                    {...register("address")}
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white px-5 py-3 rounded disabled:opacity-50"
                >
                    {isSubmitting ? "Ajout..." : "Ajouter"}
                </button>

            </form>

        </div>
    );
}
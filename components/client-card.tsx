import { Client } from "@/types/client";

type Props = {
    client: Client;

    onDelete: (id: number) => void;
};

export default function ClientCard({
    client,
    onDelete
}: Props) {

    return (
        <div className="border rounded-lg p-5">

            <h2 className="text-xl font-semibold">
                {client.name}
            </h2>

            <p>{client.phone}</p>

            <p>{client.email}</p>

            <p>{client.address}</p>

            <button
                onClick={() => onDelete(client.id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
                Supprimer
            </button>

        </div>
    );
}
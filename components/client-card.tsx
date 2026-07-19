import { Client } from "@/types/client";

type Props = {
    client: Client;
    onDelete: (id: number) => void;
};

export default function ClientCard({ client, onDelete }: Props) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="font-semibold text-gray-900">{client.name}</h3>
                    {client.phone && (
                        <p className="text-sm text-gray-500 mt-1">{client.phone}</p>
                    )}
                    {client.email && (
                        <p className="text-sm text-gray-500">{client.email}</p>
                    )}
                    {client.address && (
                        <p className="text-sm text-gray-400 mt-1">{client.address}</p>
                    )}
                </div>

                <button
                    onClick={() => onDelete(client.id)}
                    className="text-gray-400 hover:text-red-500 transition text-sm"
                    title="Supprimer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

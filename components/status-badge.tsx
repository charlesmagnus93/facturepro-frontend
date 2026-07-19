type Props = {
    status: string;
};

const statusConfig: Record<string, { label: string; style: string }> = {
    paid: { label: "Payée", style: "bg-green-50 text-green-700 border-green-200" },
    partially_paid: { label: "Partielle", style: "bg-amber-50 text-amber-700 border-amber-200" },
    pending: { label: "En attente", style: "bg-red-50 text-red-700 border-red-200" },
};

export default function StatusBadge({ status }: Props) {
    const config = statusConfig[status] ?? { label: status, style: "bg-gray-50 text-gray-700 border-gray-200" };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.style}`}>
            {config.label}
        </span>
    );
}

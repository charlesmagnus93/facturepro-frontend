type Props = {
    item: {
        description: string;
        quantity: number;
        unit_price: number;
    };
    index: number;
    onChange: (index: number, field: string, value: any) => void;
    onRemove: (index: number) => void;
};

export default function InvoiceItemRow({ item, index, onChange, onRemove }: Props) {
    return (
        <div className="grid grid-cols-12 gap-3 items-center">
            <input
                className="col-span-5 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Description"
                value={item.description}
                onChange={(e) => onChange(index, "description", e.target.value)}
            />

            <input
                type="number"
                className="col-span-2 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Qté"
                value={item.quantity}
                onChange={(e) => onChange(index, "quantity", Number(e.target.value))}
            />

            <input
                type="number"
                className="col-span-3 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Prix unitaire"
                value={item.unit_price}
                onChange={(e) => onChange(index, "unit_price", Number(e.target.value))}
            />

            <div className="col-span-2 flex justify-end">
                <button
                    onClick={() => onRemove(index)}
                    className="text-gray-400 hover:text-red-500 transition p-1"
                    title="Supprimer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

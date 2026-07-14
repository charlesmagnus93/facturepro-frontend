type Props = {
    item: {
        description: string;
        quantity: number;
        unit_price: number;
    };

    index: number;

    onChange: (
        index: number,
        field: string,
        value: any
    ) => void;

    onRemove: (index: number) => void;
};

export default function InvoiceItemRow({
    item,
    index,
    onChange,
    onRemove
}: Props) {

    return (
        <div className="grid grid-cols-4 gap-3 mb-3">

            <input
                className="border p-3"
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                    onChange(
                        index,
                        "description",
                        e.target.value
                    )
                }
            />

            <input
                type="number"
                className="border p-3"
                placeholder="Qté"
                value={item.quantity}
                onChange={(e) =>
                    onChange(
                        index,
                        "quantity",
                        Number(e.target.value)
                    )
                }
            />

            <input
                type="number"
                className="border p-3"
                placeholder="Prix"
                value={item.unit_price}
                onChange={(e) =>
                    onChange(
                        index,
                        "unit_price",
                        Number(e.target.value)
                    )
                }
            />

            <button
                onClick={() => onRemove(index)}
                className="bg-red-500 text-white rounded"
            >
                Supprimer
            </button>

        </div>
    );
}
type Props = {
    status: string;
};

export default function StatusBadge({
    status
}: Props) {

    let style =
        "bg-gray-200 text-black";

    if (status === "paid") {
        style =
            "bg-green-100 text-green-700";
    }

    if (
        status === "partially_paid"
    ) {
        style =
            "bg-yellow-100 text-yellow-700";
    }

    if (status === "pending") {
        style =
            "bg-red-100 text-red-700";
    }

    return (
        <span
            className={`px-3 py-1 rounded-full text-sm ${style}`}
        >
            {status}
        </span>
    );
}
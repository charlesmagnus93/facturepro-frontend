import { Invoice } from "@/types/invoice";
import StatusBadge from "./status-badge";
import { api, baseUrl } from "@/services/api";

type Props = {
    invoice: Invoice;
};

export default function InvoiceCard({
    invoice
}: Props) {

    async function markAsPaid() {

        const remaining =
            invoice.total_amount -
            (invoice.amount_paid || 0);

        await api.post(
            `/invoices/${invoice.id}/pay`,
            {
                amount: remaining
            }
        );

        window.location.reload();
    }

    function downloadPdf() {

        window.open(
            `${baseUrl}/invoices/${invoice.id}/pdf`,
            "_blank"
        );
    }

    return (
        <div className="border rounded-xl p-5">

            <h2 className="text-xl font-bold">
                {invoice.invoice_number}
            </h2>

            <div className="mt-2">
                <StatusBadge
                    status={invoice.status}
                />
            </div>

            <p>
                Total: {invoice.total_amount} FCFA
            </p>

            <button
                onClick={downloadPdf}
                className="bg-black text-white px-4 py-2 rounded mt-5"
            >
                Télécharger PDF
            </button>

            {
                invoice.status !== "paid" && (

                    <button
                        onClick={markAsPaid}
                        className="bg-green-600 text-white px-4 py-2 rounded mt-3"
                    >
                        Marquer Payée
                    </button>

                )
            }

        </div>
    );

}

import { Invoice } from "@/types/invoice";
import StatusBadge from "./status-badge";
import { api } from "@/services/api";

type Props = {
    invoice: Invoice;
};

export default function InvoiceCard({ invoice }: Props) {
    async function markAsPaid() {
        const remaining = invoice.total_amount - (invoice.amount_paid || 0);
        await api.post(`/invoices/${invoice.id}/pay`, { amount: remaining });
        window.location.reload();
    }

    async function downloadPdf() {
        const response = await api.get(`/invoices/${invoice.id}/pdf`, {
            responseType: "blob",
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.download = `${invoice.invoice_number}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
    }

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{invoice.invoice_number}</h3>
                <StatusBadge status={invoice.status} />
            </div>

            <p className="text-2xl font-bold text-gray-900 mb-1">
                {invoice.total_amount?.toLocaleString()} <span className="text-sm font-normal text-gray-500">FCFA</span>
            </p>

            {(invoice.amount_paid ?? 0) > 0 && invoice.status !== "paid" && (
                <p className="text-xs text-gray-500">
                    Payé: {invoice.amount_paid?.toLocaleString()} FCFA
                </p>
            )}

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50">
                <button
                    onClick={downloadPdf}
                    className="flex-1 text-center text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 py-2 rounded-lg transition"
                >
                    PDF
                </button>

                {invoice.status !== "paid" && (
                    <button
                        onClick={markAsPaid}
                        className="flex-1 text-center text-sm font-medium text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 py-2 rounded-lg transition"
                    >
                        Marquer Payée
                    </button>
                )}
            </div>
        </div>
    );
}

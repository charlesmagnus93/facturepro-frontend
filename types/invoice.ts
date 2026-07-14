export type InvoiceItem = {
    description: string;

    quantity: number;

    unit_price: number;
};

export type Invoice = {
    id: number;

    invoice_number: string;

    total_amount: number;

    amount_paid?: number;

    status: string;
};
"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

type Props = {
    data: any[];
};

export default function RevenueChart({ data }: Props) {
    const formatted = data.map((item) => ({
        month: `M${item[0]}`,
        revenue: item[1],
    }));

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Revenus Mensuels
            </h2>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={formatted}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                        contentStyle={{
                            borderRadius: "8px",
                            border: "1px solid #e2e8f0",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ fill: "#2563eb", r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

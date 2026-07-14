"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

type Props = {
    data: any[];
};

export default function RevenueChart({
    data
}: Props) {

    const formatted = data.map(
        (item) => ({
            month: `M${item[0]}`,
            revenue: item[1]
        })
    );

    return (
        <div className="bg-white border rounded-xl p-5">

            <h2 className="text-2xl font-bold mb-5">
                Revenus Mensuels
            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <LineChart data={formatted}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="revenue"
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
}
"use client";

import { ResponsiveBar } from "@nivo/bar";

interface BarChartProps {
    data: {
        name: string;
        count: number;
    }[];
    [key: string]: any;
}

export default function BarChart({ data, ...props }: BarChartProps) {
    const totalCount = data.reduce((sum, item) => sum + item.count, 0);
    const percentageData = data.map(item => ({
        ...item,
        count: (item.count / totalCount) * 100,
    }));

    return (
        <div {...props}>
            <ResponsiveBar
                data={percentageData}
                keys={["count"]}
                indexBy="name"
                margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
                padding={0.3}
                colors={["#840024"]}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 16,
                }}
                axisLeft={{
                    tickSize: 0,
                    tickValues: 4,
                    tickPadding: 16,
                    format: value => `${value}%`,
                }}
                gridYValues={4}
                theme={{
                    tooltip: {
                        chip: {
                            borderRadius: "9999px",
                        },
                        container: {
                            fontSize: "12px",
                            textTransform: "capitalize",
                            borderRadius: "6px",
                        },
                    },
                    grid: {
                        line: {
                            stroke: "#f3f4f6",
                        },
                    },
                }}
                tooltip={({ id, value, color }) => (
                    <div className="p-3 text-black bg-[#f6f6ef] rounded-md capitalize">
                        {value.toFixed(1)}%
                    </div>
                )}
                enableLabel={false}
                role="application"
                ariaLabel="A bar chart showing instructor grade distributions"
            />
        </div>
    );
}
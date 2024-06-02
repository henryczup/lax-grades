"use client";
import { ResponsiveBar } from "@nivo/bar";

interface BarChartProps {
    data: {
        grade: string;
        percentage: number;
    }[];
}

export default function DepartmentBarChart({ data }: BarChartProps) {
    return (
        <ResponsiveBar
            data={data}
            keys={["percentage"]}
            indexBy="grade"
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
                format: (value) => `${value}%`,
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
            tooltip={({ id, value }) => (
                <div className="p-3 text-black bg-[#f6f6ef] rounded-md capitalize">
                    <strong>{id}</strong>
                    <br />
                    {value.toFixed(1)}%
                </div>
            )}
            enableLabel={false}
            role="application"
            ariaLabel="A bar chart showing department grade distributions"
        />
    );
}
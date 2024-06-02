"use client";
import { ResponsiveBar } from "@nivo/bar";

interface BarChartProps {
    data: {
        grade: string;
        Cumulative: number;
        [key: string]: string | number;
    }[];
    [key: string]: any;
}

export default function ClassBarChart({ data, ...props }: BarChartProps) {
    const keys = Object.keys(data[0]).filter(key => key !== 'grade');
    const colors = ['#840024', '#78797a', '#000000'];

    return (
        <div {...props}>
            <ResponsiveBar
                data={data}
                keys={keys}
                indexBy="grade"
                margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
                padding={0.2}
                groupMode="grouped"
                colors={colors}
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
                    <div className="p-3 text-black bg-[#f6f6ef] rounded-md capitalize" >
                        <strong>
                            {id === 'Cumulative' ? 'Cumulative' : id}
                        </strong>
                        <br />
                        {id === 'Cumulative' ? `${value.toFixed(1)}%` : `${value.toFixed(1)}%`}
                    </div>
                )}
                enableLabel={false}
                role="application"
                ariaLabel="A bar chart showing class grade distributions"
            />
        </div>
    );
}
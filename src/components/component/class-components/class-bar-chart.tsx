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
    return (
        <div {...props}>
            <ResponsiveBar
                data={data}
                keys={Object.keys(data[0]).filter(key => key !== 'grade')}
                indexBy="grade"
                margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
                padding={0.2}
                groupMode="grouped"
                colors={['#840024', '#78797a']}
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
                tooltipLabel={({ indexValue }) => `${indexValue}`}
                enableLabel={false}
                role="application"
                ariaLabel="A bar chart showing class grade distributions"
            />
        </div>
    );
}
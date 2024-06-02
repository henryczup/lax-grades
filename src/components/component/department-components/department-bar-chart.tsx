"use client";
import { ResponsiveBar } from "@nivo/bar";

export default function DepartmentBarChart({ data, ...props }: { data: any[], [key: string]: any }) {
    return (
        <div {...props}>
            <ResponsiveBar
                data={data}
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
                ariaLabel="A bar chart showing department grade distributions"
            />
        </div>
    );
}
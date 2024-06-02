"use client";
import { BarDatum, ResponsiveBar } from "@nivo/bar";

interface ClassBarChartProps {
    data: BarDatum[];
    [key: string]: any;
    selectedInstructor: null | string;
    selectedSemester: null | string;
}

export default function ClassBarChart({ data, selectedInstructor, selectedSemester, ...props }: ClassBarChartProps) {
    let keys: string[] = [];
    let colors: string[] = [];

    if (selectedInstructor || selectedSemester) {
        keys = ['cumulative', selectedInstructor ? 'instructor' : 'semester'];
        colors = ['#840024', '#78797a'];
    } else {
        keys = ['cumulative'];
        colors = ['#840024'];
    }

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
                            {id === 'cumulative' ? 'Cumulative' : (
                                selectedInstructor ? selectedInstructor : selectedSemester
                            )}
                        </strong>
                        <br />
                        {`${value.toFixed(1)}%`}
                    </div>
                )}
                enableLabel={false}
                role="application"
                ariaLabel="A bar chart showing class grade distributions"
            />
        </div>
    );
}
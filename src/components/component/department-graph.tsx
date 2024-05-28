"use client";
import { ResponsiveBar } from "@nivo/bar";
import { HoverEffect } from "../ui/card-hover-effect";
import { calculateAverageGPA, calculatePercentageA } from "@/lib/utils";
import { DepartmentGraphProps } from "@/lib/types";
import Search from "./search";

export default function DepartmentGraph({ department, departmentGrades, departmentClasses, departmentInstructors }: DepartmentGraphProps) {
    if (!department) {
        return <div>Department not found</div>;
    }
    console.log(departmentInstructors)


    const aggregateDistribution = departmentGrades.reduce((acc: { [key: string]: number }, grade: { grade: string; count: number }) => {
        acc[grade.grade] = (acc[grade.grade] || 0) + grade.count;
        return acc;
    }, {});

    const chartData: any = Object.entries(aggregateDistribution).map(([grade, count]) => ({
        name: grade,
        count,
    }));

    // Round the total students to the ones place
    const totalStudents = Object.values(aggregateDistribution).reduce((a: any, b: any) => a + b, 0);
    const averageGPA = calculateAverageGPA(aggregateDistribution);
    const percentageA = calculatePercentageA(aggregateDistribution);

    return (
        <div className="bg-white">
            <div className="p-8">
                <Search placeholder="Search for classes, instructors, or departments" />
                <div className="border-b border-red-800 pb-4 pt-6">
                    <h1 className="text-4xl font-bold text-gray-900">{department.name}</h1>
                    <p className="text-xl text-gray-600">{department.code}</p>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                    <div className="col-span-2">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Overall Grades in Department</h2>
                        <BarChart className="w-full h-[300px]" data={chartData} />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
                        <div className="bg-[#f6f6ef] p-4 rounded-lg">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Total Students</h3>
                            <p className="text-2xl sm:text-3xl font-bold text-red-800">{totalStudents.toFixed(0)}</p>
                        </div>
                        <div className="bg-[#f6f6ef] p-4 rounded-lg">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Average GPA</h3>
                            <p className="text-2xl sm:text-3xl font-bold text-red-800">{averageGPA}</p>
                        </div>
                        <div className="bg-[#f6f6ef] p-4 rounded-lg">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Percentage A</h3>
                            <p className="text-2xl sm:text-3xl font-bold text-red-800">{percentageA}%</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-6">
                <h3 className="text-2xl font-semibold text-gray-900 px-2">Classes</h3>
                <HoverEffect items={departmentClasses.map(classData => ({
                    title: classData.name,
                    description: classData.code,
                    link: `/class/${classData.code}`,
                }))} />
            </div>
            <div className="px-6 mt-8">
                <h3 className="text-2xl font-semibold text-gray-900 px-2">Instructors</h3>
                <HoverEffect items={departmentInstructors.map((instructor: { id: number; name: string; department: string }) => ({
                    title: instructor.name,
                    description: instructor.department,
                    link: `/instructor/${instructor.id}`,
                }))} />
            </div>
        </div>
    );
}

function BarChart({ data, ...props }: { data: any[], [key: string]: any }) {
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
                tooltipLabel={({ id }) => `${id}`}
                enableLabel={false}
                role="application"
                ariaLabel="A bar chart showing data"
            />
        </div>
    );
}